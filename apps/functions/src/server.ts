/**
 * Election Yatra API server.
 * Same handlers are exported so the app can also run on Cloud Run or as a
 * 2nd-gen Cloud Function (functions-framework) without rewrite.
 */

import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { loadConfig } from './config.js';
import { logger } from './middleware/logger.js';
import { createRateLimiter } from './middleware/rateLimit.js';
import { healthRouter } from './routes/health.js';
import { chatRouter } from './routes/chat.js';

export const buildApp = (config = loadConfig()): Express => {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (config.allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('origin not allowed'));
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '256kb' }));

  const limiter = createRateLimiter(config.rateLimit);
  app.use('/api/', limiter);

  app.use('/api', healthRouter(config));
  app.use('/api', chatRouter(config));

  app.get('/', (_req, res) => {
    res.json({
      service: 'election-yatra-api',
      version: '0.1.0',
      docs: '/api/health',
    });
  });

  app.use((req, res) => {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: `No route for ${req.path}` } });
  });

  return app;
};

// Start the server unless explicitly disabled (e.g. by tests via supertest).
// On Windows, comparing import.meta.url to process.argv[1] is brittle under
// tsx watch, so we invert the default: start unless FUNCTIONS_NO_START=1.
if (process.env.FUNCTIONS_NO_START !== '1') {
  const config = loadConfig();
  const app = buildApp(config);
  app.listen(config.port, () => {
    logger.info('api.listening', { port: config.port, env: config.nodeEnv });
  });
}
