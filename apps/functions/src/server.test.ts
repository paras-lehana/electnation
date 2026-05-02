import type { Express } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import type { AppConfig } from './config.js';

process.env.FUNCTIONS_NO_START = '1';
process.env.NODE_ENV = 'test';
process.env.RECAPTCHA_BYPASS = 'true';
process.env.ALLOWED_ORIGINS = 'http://localhost:3000';
process.env.RECAPTCHA_BYPASS_ALLOWED_ORIGINS = 'http://localhost:3000';
process.env.GEMINI_API_KEY = '';
process.env.LLM_SERVICE_ENABLED = 'false';
process.env.GOOGLE_MAPS_API_KEY = '';

let app: Express;
let buildConfiguredApp!: (config?: AppConfig) => Express;
let loadedConfig!: AppConfig;

beforeAll(async () => {
  const [{ buildApp }, { loadConfig }] = await Promise.all([import('./server.js'), import('./config.js')]);
  buildConfiguredApp = buildApp;
  loadedConfig = loadConfig();
  app = buildApp(loadedConfig);
}, 30_000);

const productionConfig = (): AppConfig => ({
  ...loadedConfig,
  nodeEnv: 'production',
  allowedOrigins: ['https://web.example'],
  allowNoOriginRequests: false,
  demoMode: true,
  recaptcha: {
    ...loadedConfig.recaptcha,
    bypass: true,
    bypassAllowedOrigins: ['https://web.example'],
  },
});

describe('Election Yatra API', () => {
  it('reports health with dependency readiness', async () => {
    const response = await request(app).get('/api/health').expect(200);
    expect(response.body.status).toMatch(/healthy|degraded/);
    expect(response.body.dependencies).toHaveProperty('llmService');
  });

  it('returns schema-shaped demo forward analysis', async () => {
    const response = await request(app)
      .post('/api/forward/analysis')
      .set('Origin', 'http://localhost:3000')
      .send({ text: 'Forwarded many times: EVM bluetooth hack means voting is rigged', locale: 'en' })
      .expect(200);

    expect(response.body.mode).toBe('demo');
    expect(response.body.category).toBe('fake-news');
    expect(response.body.riskLevel).toBe(5);
    expect(response.body.eciSources[0]).toContain('eci.gov.in');
  });

  it('rejects invalid forward analysis payloads', async () => {
    const response = await request(app)
      .post('/api/forward/analysis')
      .set('Origin', 'http://localhost:3000')
      .send({ text: 'short' })
      .expect(400);
    expect(response.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('sets CORS only for configured browser origins', async () => {
    const allowed = await request(app).get('/api/health').set('Origin', 'http://localhost:3000').expect(200);
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:3000');

    const denied = await request(app).get('/api/health').set('Origin', 'https://evil.example').expect(200);
    expect(denied.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('does not expose server-only secrets in public config', async () => {
    const response = await request(app).get('/api/config/public').expect(200);
    const serialized = JSON.stringify(response.body);

    expect(response.body).toHaveProperty('mapsApiKey');
    expect(serialized).not.toContain('LLM_SERVICE_INTERNAL_KEY');
    expect(serialized).not.toContain('llmService');
    expect(serialized).not.toContain('recaptchaBypass');
  });

  it('allows production reCAPTCHA bypass only from the configured web origin', async () => {
    const productionApp = buildConfiguredApp(productionConfig());

    const allowed = await request(productionApp)
      .post('/api/forward/analysis')
      .set('Origin', 'https://web.example')
      .send({ text: 'Forwarded many times: EVM bluetooth hack means voting is rigged', locale: 'en' })
      .expect(200);
    expect(allowed.body.recaptcha.bypassed).toBe(true);

    const denied = await request(productionApp)
      .post('/api/forward/analysis')
      .set('Origin', 'https://evil.example')
      .send({ text: 'Forwarded many times: EVM bluetooth hack means voting is rigged', locale: 'en' })
      .expect(400);
    expect(denied.body.error.code).toBe('RECAPTCHA_REQUIRED');
  });

  it('serves an ICS calendar reminder file', async () => {
    const response = await request(app).get('/api/calendar/ics?source=default').expect(200);
    expect(response.text).toContain('BEGIN:VCALENDAR');
    expect(response.text).toContain('BEGIN:VEVENT');
  });

  it('serves demo YouTube SVEEP content without API keys', async () => {
    const response = await request(app).get('/api/youtube/sveep').expect(200);
    expect(response.body.mode).toBe('demo');
    expect(response.body.videos.length).toBeGreaterThan(0);
  });
});
