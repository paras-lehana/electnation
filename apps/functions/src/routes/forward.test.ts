import { describe, expect, it } from 'vitest';
import { normalizeForwardAnalysisJson } from './forward.js';

describe('Forward Clinic normalization', () => {
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
    );

    expect(result.category).toBe('fake-news');
    expect(result.riskLevel).toBe(5);
    expect(result.explanation.en).toContain('EVM rumor');
    expect(result.verificationSteps).toEqual([{ en: 'Do not forward it.' }, { en: 'Check eci.gov.in before taking action.' }]);
    expect(result.eciSources).toEqual(['https://eci.gov.in']);
  });
});