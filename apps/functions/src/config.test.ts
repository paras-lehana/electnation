import { afterEach, describe, expect, it } from 'vitest';

const ORIGINAL_DEMO_MODE = process.env.DEMO_MODE;

afterEach(() => {
  if (ORIGINAL_DEMO_MODE === undefined) {
    delete process.env.DEMO_MODE;
    return;
  }

  process.env.DEMO_MODE = ORIGINAL_DEMO_MODE;
});

describe('loadConfig', () => {
  it('keeps demo mode opt-in', async () => {
    delete process.env.DEMO_MODE;
    const { loadConfig } = await import('./config.js');
    expect(loadConfig().demoMode).toBe(false);

    process.env.DEMO_MODE = 'true';
    expect(loadConfig().demoMode).toBe(true);
  });
});