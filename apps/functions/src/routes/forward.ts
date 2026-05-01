import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import {
  ForwardAnalysisRequestSchema,
  ForwardAnalysisSchema,
  GoogleRecaptchaEnterpriseClient,
} from '@yatra/core';
import type { AppConfig } from '../config.js';
import { logger } from '../middleware/logger.js';
import { LlmServiceClient } from '../services/llmServiceClient.js';

type AnalysisMode = 'llm-service' | 'demo' | 'fallback';

const OFFICIAL_SOURCES = ['https://eci.gov.in', 'https://voters.eci.gov.in'];

const extractJson = (value: string): unknown => {
  const cleaned = value.trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) throw new Error('No JSON object found');
  return JSON.parse(cleaned.slice(start, end + 1));
};

const localAnalysis = (text: string, locale = 'en') => {
  const lower = text.toLowerCase();
  const base = {
    id: randomUUID(),
    inputText: text,
    detectedLocale: locale,
    analyzedAt: new Date().toISOString(),
    eciSources: OFFICIAL_SOURCES,
  };

  if (/evm|bluetooth|hack|programmed|rigged/.test(lower)) {
    return {
      ...base,
      category: 'fake-news',
      riskLevel: 5,
      explanation: {
        en: 'This looks like a high-risk EVM rumor. ECI repeatedly states that EVMs are standalone machines and voters should verify such claims only from official channels.',
        hi: 'Yeh high-risk EVM afwah lagti hai. Aise daave sirf ECI/NVSP ke official channels se verify karein.',
      },
      verificationSteps: [
        { en: 'Do not forward the message until it is verified.' },
        { en: 'Check the latest advisory on eci.gov.in or voters.eci.gov.in.' },
        { en: 'If it asks people not to vote, treat it as voter-suppression risk.' },
      ],
    };
  }

  if (/cash|money|rs\.?\s?\d+|gift|liquor|free|bribe|daaru|paise/.test(lower)) {
    return {
      ...base,
      category: 'misleading-context',
      riskLevel: 4,
      explanation: {
        en: 'This appears related to vote inducement or bribery. Accepting gifts or money for votes is illegal and harms community accountability.',
        hi: 'Yeh vote inducement/bribery se juda lagta hai. Vote ke badle paisa ya gift lena gair-kanuni hai.',
      },
      verificationSteps: [
        { en: 'Do not accept or share inducement offers.' },
        { en: 'Report suspected Model Code of Conduct violations through official complaint channels such as cVIGIL.' },
      ],
    };
  }

  if (/holiday|date|polling day|booth changed|voting cancelled/.test(lower)) {
    return {
      ...base,
      category: 'unverified-rumor',
      riskLevel: 3,
      explanation: {
        en: 'This may be a polling-date or booth-change rumor. Election dates and booth details should be confirmed from official ECI/NVSP sources.',
        hi: 'Yeh polling date ya booth-change afwah ho sakti hai. Official ECI/NVSP source se confirm karein.',
      },
      verificationSteps: [
        { en: 'Search your EPIC or constituency details on voters.eci.gov.in.' },
        { en: 'Cross-check any date or booth change with the official district election office.' },
      ],
    };
  }

  return {
    ...base,
    category: 'benign',
    riskLevel: 2,
    explanation: {
      en: 'No obvious high-risk election misinformation pattern was found, but the claim should still be cross-checked before sharing.',
      hi: 'Koi obvious high-risk election misinformation pattern nahi mila, phir bhi share karne se pehle verify karein.',
    },
    verificationSteps: [
      { en: 'Look for a direct official source, not screenshots or forwarded images.' },
      { en: 'If the message creates fear or urgency, pause before forwarding.' },
    ],
  };
};

const recommendedAction = (riskLevel: number): string => {
  if (riskLevel >= 4) return 'Do not forward it. Verify with ECI/NVSP and report if it suppresses voting or offers inducements.';
  if (riskLevel === 3) return 'Treat it as unverified. Check official sources before sharing.';
  return 'Share only with official source links and avoid adding claims not present in the source.';
};

export const forwardRouter = (config: AppConfig): Router => {
  const router = Router();

  router.post('/analysis', async (req, res) => {
    const startedAt = Date.now();
    const parsed = ForwardAnalysisRequestSchema.safeParse({
      ...req.body,
      recaptchaToken: req.body?.recaptchaToken ?? (config.recaptcha.bypass ? 'demo-bypass-token' : undefined),
    });

    if (!parsed.success) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Invalid forward-analysis request.',
          issues: parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message })),
        },
      });
      return;
    }

    if (!config.recaptcha.bypass) {
      const recaptcha = new GoogleRecaptchaEnterpriseClient(config.recaptcha);
      const assessment = await recaptcha.verify({
        token: parsed.data.recaptchaToken,
        expectedAction: 'forward_analysis',
        userIpAddress: req.ip,
        userAgent: req.get('user-agent'),
      });
      if (!assessment.ok || !assessment.value.valid) {
        logger.warn('forward.recaptcha_failed', {
          ok: assessment.ok,
          score: assessment.ok ? assessment.value.score : undefined,
          reasons: assessment.ok ? assessment.value.reasons : [assessment.error.code],
        });
        res.status(400).json({ error: { code: 'RECAPTCHA_FAILED', message: 'Captcha verification failed.' } });
        return;
      }
    }

    let analysis: unknown;
    let mode: AnalysisMode = 'demo';

    if (!config.demoMode && config.llmService.enabled) {
      try {
        const llm = new LlmServiceClient(config.llmService);
        const result = await llm.generate({
          temperature: 0.1,
          maxTokens: 900,
          jsonMode: true,
          systemPrompt:
            'You are a non-partisan Indian election misinformation analyst. Return only JSON. Never endorse or attack political parties or candidates.',
          messages: [
            {
              role: 'user',
              content:
                'Analyze this election-related message. Return JSON with category exactly one of fake-news, unverified-rumor, misleading-context, exaggerated-true, benign, hate-speech; riskLevel as integer 1-5; explanation as {en:string,hi?:string}; verificationSteps as array of {en:string}; eciSources as official URLs. Message: ' +
                parsed.data.text,
            },
          ],
        });

        const modelJson = extractJson(result.content) as Record<string, unknown>;
        const candidate = {
          id: randomUUID(),
          inputText: parsed.data.text,
          detectedLocale: parsed.data.locale ?? 'en',
          analyzedAt: new Date().toISOString(),
          eciSources: OFFICIAL_SOURCES,
          ...modelJson,
        };
        const checked = ForwardAnalysisSchema.safeParse(candidate);
        if (checked.success) {
          analysis = checked.data;
          mode = 'llm-service';
        } else {
          analysis = localAnalysis(parsed.data.text, parsed.data.locale ?? 'en');
          mode = 'fallback';
        }
      } catch (cause) {
        logger.warn('forward.llm_service_fallback', { cause: String(cause).slice(0, 160) });
        analysis = localAnalysis(parsed.data.text, parsed.data.locale ?? 'en');
        mode = 'fallback';
      }
    } else {
      analysis = localAnalysis(parsed.data.text, parsed.data.locale ?? 'en');
    }

    const checked = ForwardAnalysisSchema.parse(analysis);
    logger.info('forward.analysis_complete', {
      mode,
      category: checked.category,
      riskLevel: checked.riskLevel,
      inputLength: parsed.data.text.length,
      latencyMs: Date.now() - startedAt,
      recaptchaBypass: config.recaptcha.bypass,
    });

    res.json({
      ...checked,
      mode,
      recommendedAction: recommendedAction(checked.riskLevel),
      recaptcha: { bypassed: config.recaptcha.bypass },
    });
  });

  return router;
};
