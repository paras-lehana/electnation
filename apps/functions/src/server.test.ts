import type { Express } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

process.env.FUNCTIONS_NO_START = '1';
process.env.NODE_ENV = 'test';
process.env.RECAPTCHA_BYPASS = 'true';
process.env.GEMINI_API_KEY = '';
process.env.LLM_SERVICE_ENABLED = 'false';
process.env.GOOGLE_MAPS_API_KEY = '';

let app: Express;

beforeAll(async () => {
  const [{ buildApp }, { loadConfig }] = await Promise.all([import('./server.js'), import('./config.js')]);
  app = buildApp(loadConfig());
}, 30_000);

describe('Election Yatra API', () => {
  it('reports health with dependency readiness', async () => {
    const response = await request(app).get('/api/health').expect(200);
    expect(response.body.status).toMatch(/healthy|degraded/);
    expect(response.body.dependencies).toHaveProperty('llmService');
  });

  it('returns schema-shaped demo forward analysis', async () => {
    const response = await request(app)
      .post('/api/forward/analysis')
      .send({ text: 'Forwarded many times: EVM bluetooth hack means voting is rigged', locale: 'en' })
      .expect(200);

    expect(response.body.mode).toBe('demo');
    expect(response.body.category).toBe('fake-news');
    expect(response.body.riskLevel).toBe(5);
    expect(response.body.eciSources[0]).toContain('eci.gov.in');
  });

  it('rejects invalid forward analysis payloads', async () => {
    const response = await request(app).post('/api/forward/analysis').send({ text: 'short' }).expect(400);
    expect(response.body.error.code).toBe('VALIDATION_FAILED');
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
