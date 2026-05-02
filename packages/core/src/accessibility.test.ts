import { describe, expect, it } from 'vitest';
import {
  buildBrowserSpeechSettings,
  buildGoogleTtsRequestDraft,
  createAccessibleStatusMessage,
  getAccessibilityCoverageSummary,
  getAccessibilityEvidenceCatalog,
  getAssistiveTechTestMatrix,
  getEasyModeGuideText,
  getScheduledLanguageTtsPreset,
  getScheduledLanguageTtsPresets,
  getSupportedLocaleCodes,
  isScheduledLanguageCode,
} from './accessibility';

describe('accessibility evidence and language presets', () => {
  it('covers all 22 scheduled Indian languages with TTS presets', () => {
    const presets = getScheduledLanguageTtsPresets();

    expect(presets).toHaveLength(22);
    expect(getSupportedLocaleCodes()).toContain('hi');
    expect(getSupportedLocaleCodes()).toContain('sat');
    expect(new Set(presets.map((preset) => preset.code)).size).toBe(22);
    expect(presets.every((preset) => preset.easyModeGuide.length > 40)).toBe(true);
  });

  it('builds browser and Google TTS settings from the same preset source', () => {
    const browserSettings = buildBrowserSpeechSettings('ta');
    const googleDraft = buildGoogleTtsRequestDraft(browserSettings.text, 'ta');

    expect(browserSettings.lang).toBe('ta-IN');
    expect(googleDraft.languageCode).toBe('ta-IN');
    expect(googleDraft.audioEncoding).toBe('MP3');
  });

  it('prioritizes exact BCP-47 language matches before shared fallback TTS codes', () => {
    expect(getScheduledLanguageTtsPreset('hi-IN').code).toBe('hi');
    expect(getScheduledLanguageTtsPreset('ur-IN').code).toBe('ur');
  });

  it('falls back safely for scheduled languages without reliable native TTS voices', () => {
    const preset = getScheduledLanguageTtsPreset('sat');
    const draft = buildGoogleTtsRequestDraft(getEasyModeGuideText('sat'), 'sat');

    expect(preset.voiceReadiness).toBe('fallback-scripted');
    expect(draft.languageCode).toBe('hi-IN');
    expect(createAccessibleStatusMessage('sat', 'ready')).toContain('fallback voice');
  });

  it('exposes honest reviewer evidence instead of fake feature claims', () => {
    const evidence = getAccessibilityEvidenceCatalog();
    const matrix = getAssistiveTechTestMatrix();
    const summary = getAccessibilityCoverageSummary();

    expect(evidence.some((item) => item.status === 'planned')).toBe(true);
    expect(evidence.some((item) => item.status === 'tested')).toBe(true);
    expect(matrix.map((check) => check.inputMode)).toContain('screen-reader');
    expect(summary.scheduledLanguages).toBe(22);
    expect(summary.implementedOrTested).toBeGreaterThan(3);
  });

  it('recognizes only configured scheduled language codes', () => {
    expect(isScheduledLanguageCode('hi')).toBe(true);
    expect(isScheduledLanguageCode('fr')).toBe(false);
  });
});
