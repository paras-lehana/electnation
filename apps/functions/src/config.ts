/**
 * Central config loader. Reads from process.env so the rest of the backend
 * can accept a typed `AppConfig` via dependency injection and stay testable.
 */

import 'dotenv/config';

export interface AppConfig {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  allowedOrigins: string[];

  gemini: {
    apiKey: string;
    chatModel: string;
    analysisModel: string;
  };

  maps: {
    apiKey: string;
  };

  firebase: {
    projectId: string;
  };

  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const require_ = (key: string, fallback?: string): string => {
  const v = process.env[key] ?? fallback;
  if (!v) {
    // We do not crash in dev so the scaffold can boot without full creds;
    // the handlers themselves return a typed CONFIG_MISSING error if called.
    return '';
  }
  return v;
};

export const loadConfig = (): AppConfig => ({
  nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) ?? 'development',
  port: Number(process.env.PORT ?? 8080),
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim()),

  gemini: {
    apiKey: require_('GEMINI_API_KEY'),
    chatModel: process.env.VERTEX_MODEL_CHAT ?? 'gemini-1.5-flash',
    analysisModel: process.env.VERTEX_MODEL_ANALYSIS ?? 'gemini-1.5-pro',
  },

  maps: {
    apiKey: require_('GOOGLE_MAPS_API_KEY'),
  },

  firebase: {
    projectId: require_('FIREBASE_PROJECT_ID', 'election-yatra'),
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
    max: Number(process.env.RATE_LIMIT_MAX ?? 60),
  },
});
