/**
 * POST /api/chat — Streaming Gemini chat as "Chunav Saathi".
 *
 * Contract
 * - Request body validated against ChatRequestSchema.
 * - Response is Server-Sent Events: each `data: {...}\n\n` frame carries
 *   `{ delta: string }`. A final `data: [DONE]\n\n` marks completion.
 * - On config-missing (no GEMINI_API_KEY), server returns a deterministic
 *   demo stream so the frontend can still be exercised in developer mode.
 */

import { Router } from 'express';
import {
  ChatRequestSchema,
  GoogleGeminiClient,
  buildChunavSaathiPrompt,
} from '@yatra/core';
import type { AppConfig } from '../config.js';
import { logger } from '../middleware/logger.js';

const DEMO_REPLY =
  'Namaste! Main Chunav Saathi hoon. Aapke liye Election Yatra start karne ke liye tayar hoon. ' +
  'Pehle step — Voter registration. Aap kis state se hain? Main aapko wahaan ke registration ' +
  'portal aur deadlines samjha sakta hoon.\n\n' +
  '• Registration: voters.eci.gov.in par Form 6 bharna hota hai\n' +
  '• Documents: Aadhaar / Passport / Driving License\n' +
  '• Timeline: Chunaav ke 10 din pehle tak\n\n' +
  'Kya aap chahenge main aapko key dates ke liye Calendar reminder bana doon?';

const streamDemo = async (res: import('express').Response) => {
  const tokens = DEMO_REPLY.split(/(\s+)/);
  for (const t of tokens) {
    res.write(`data: ${JSON.stringify({ delta: t })}\n\n`);
    await new Promise((r) => setTimeout(r, 35));
  }
  res.write('data: [DONE]\n\n');
  res.end();
};

export const chatRouter = (config: AppConfig): Router => {
  const r = Router();

  r.post('/chat', async (req, res) => {
    const parsed = ChatRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Invalid chat request.',
          issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
        },
      });
      return;
    }

    res.setHeader('content-type', 'text/event-stream');
    res.setHeader('cache-control', 'no-cache, no-transform');
    res.setHeader('connection', 'keep-alive');
    res.setHeader('x-accel-buffering', 'no');
    res.flushHeaders?.();

    if (!config.gemini.apiKey) {
      logger.warn('chat.demo_mode', { reason: 'GEMINI_API_KEY not set' });
      await streamDemo(res);
      return;
    }

    const client = new GoogleGeminiClient({ apiKey: config.gemini.apiKey });
    const systemInstruction = buildChunavSaathiPrompt({
      locale: parsed.data.locale,
      literacyComfort: parsed.data.literacyComfort,
      stepSlug: parsed.data.stepSlug,
    });

    try {
      for await (const chunk of client.streamGenerate({
        model: config.gemini.chatModel,
        systemInstruction,
        messages: [{ role: 'user', text: parsed.data.message }],
        temperature: 0.4,
        maxOutputTokens: 1024,
      })) {
        res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (cause) {
      logger.error('chat.stream_failed', { cause: String(cause) });
      res.write(
        `data: ${JSON.stringify({ error: 'UPSTREAM_FAILURE', message: 'AI service is unavailable right now.' })}\n\n`,
      );
      res.end();
    }
  });

  return r;
};
