import { describe, expect, it } from 'vitest';
import type { AppConfig } from '../config.js';
import { analyzeForwardMessage, normalizeForwardAnalysisJson } from './forwardAnalysisService.js';

const fixedDependencies = {
  idGenerator: () => 'analysis-test-id',
  now: () => new Date('2026-05-02T00:00:00.000Z'),
};

const baseConfig: AppConfig = {
  nodeEnv: 'test',
  port: 8080,
  apiBaseUrl: 'http://localhost:8080',
  webBaseUrl: 'http://localhost:3000',
  allowedOrigins: ['http://localhost:3000'],
  demoMode: false,
  google: { apiKey: '', cloudProject: 'election-yatra', cloudLocation: 'asia-south1' },
  gemini: { apiKey: '', chatModel: 'gemini-flash-latest', analysisModel: 'gemini-pro-latest' },
  llmService: {
    enabled: true,
    baseUrl: 'https://llm.lehana.in',
    endpointName: 'antigravity-manager',
    model: 'gemini-3-flash',
    provider: 'custom',
    providerBaseUrl: 'https://antigravity.aidhunik.com/v1',
    apiKey: '',
    internalKey: 'test-key',
    useByok: false,
    timeoutMs: 90_000,
  },
  maps: { apiKey: '', mapId: 'election_yatra_map' },
  recaptcha: { projectId: 'election-yatra', siteKey: '', apiKey: '', minScore: 0.5, bypass: true },
  youtube: { apiKey: '', sveepPlaylistId: '' },
  calendar: { oauthClientId: '', oauthClientSecret: '', oauthRedirectUri: 'http://localhost:3000/callback' },
  firebase: { projectId: 'election-yatra' },
  rateLimit: { windowMs: 60_000, max: 60 },
};

describe('Forward Clinic analysis service', () => {
  it('accepts useful llm-service JSON with common shape drift', () => {
    const result = normalizeForwardAnalysisJson(
      {
        category: 'Fake News',
        risk_level: '5',
        explanation: 'This is an EVM rumor that should be checked against official ECI sources.',
        verification_steps: ['Do not forward it.', 'Check eci.gov.in before taking action.'],
        official_sources: ['https://eci.gov.in', 'not-a-url'],
      },
      'Forward says EVM bluetooth can be hacked and voting is cancelled tomorrow.',
      'en',
      fixedDependencies,
    );

    expect(result.category).toBe('fake-news');
    expect(result.riskLevel).toBe(5);
    expect(result.explanation.en).toContain('EVM rumor');
    expect(result.verificationSteps).toEqual([{ en: 'Do not forward it.' }, { en: 'Check eci.gov.in before taking action.' }]);
    expect(result.eciSources).toEqual(['https://eci.gov.in']);
  });

  it('returns llm-service mode when the injected client responds with valid JSON', async () => {
    const result = await analyzeForwardMessage({
      text: 'Forward says EVM bluetooth can be hacked and voting is cancelled tomorrow.',
      locale: 'en',
      config: baseConfig,
      dependencies: {
        ...fixedDependencies,
        llmClient: {
          generate: async () => ({
            content: JSON.stringify({
              category: 'fake-news',
              riskLevel: 5,
              explanation: { en: 'Official sources do not support the Bluetooth EVM claim.' },
              verificationSteps: [{ en: 'Check eci.gov.in before forwarding.' }],
              eciSources: ['https://eci.gov.in'],
            }),
            mode: 'smk',
            model: 'gemini-3-flash',
            endpoint: 'antigravity-manager',
          }),
        },
      },
    });

    expect(result.mode).toBe('llm-service');
    expect(result.analysis.id).toBe('analysis-test-id');
    expect(result.analysis.category).toBe('fake-news');
    expect(result.recommendedAction).toContain('Do not forward it');
  });

  it('falls back to deterministic local guidance when llm-service fails', async () => {
    const result = await analyzeForwardMessage({
      text: 'Forward says voting is cancelled tomorrow because the booth changed.',
      locale: 'en',
      config: baseConfig,
      dependencies: {
        ...fixedDependencies,
        llmClient: {
          generate: async () => {
            throw new Error('upstream timeout');
          },
        },
      },
    });

    expect(result.mode).toBe('fallback');
    expect(result.fallbackCause).toContain('upstream timeout');
    expect(result.analysis.category).toBe('unverified-rumor');
    expect(result.recommendedAction).toContain('official sources');
  });
});
