import { Router } from 'express';
import { ForwardAnalysisRequestSchema, GoogleRecaptchaEnterpriseClient } from '@yatra/core';
import type { AppConfig } from '../config.js';
import { logger } from '../middleware/logger.js';
import { analyzeForwardMessage } from '../services/forwardAnalysisService.js';

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

    const result = await analyzeForwardMessage({
      text: parsed.data.text,
      locale: parsed.data.locale ?? 'en',
      config,
    });

    if (result.fallbackCause) {
      logger.warn('forward.llm_service_fallback', { cause: result.fallbackCause });
    }

    logger.info('forward.analysis_complete', {
      mode: result.mode,
      category: result.analysis.category,
      riskLevel: result.analysis.riskLevel,
      inputLength: parsed.data.text.length,
      latencyMs: Date.now() - startedAt,
      recaptchaBypass: config.recaptcha.bypass,
    });

    res.json({
      ...result.analysis,
      mode: result.mode,
      recommendedAction: result.recommendedAction,
      recaptcha: { bypassed: config.recaptcha.bypass },
    });
  });

  return router;
};
