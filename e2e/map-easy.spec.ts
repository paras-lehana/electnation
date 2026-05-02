import { expect, test } from '@playwright/test';
import {
  collectConsoleErrors,
  expectNoCriticalConsoleErrors,
  expectNoHorizontalOverflow,
} from './helpers';

test.describe('Map and Easy Mode validation', () => {
  test('renders map fallback or map panel with official lookup cards', async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page);
    await page.goto('/map');

    await expect(page.getByRole('heading', { name: /map your booth/i })).toBeVisible();
    await expect(page.getByTestId('facility-booth-card')).toContainText(/polling booth/i);
    await expect(page.getByTestId('facility-ero-card')).toContainText(/ero office/i);
    await expect(page.getByRole('link', { name: /voters\.eci\.gov\.in/i }).first()).toBeVisible();

    await expectNoHorizontalOverflow(page);
    expectNoCriticalConsoleErrors(consoleErrors);
  });

  test('renders Easy Mode action tiles and read-aloud controls', async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page);
    await page.goto('/easy-mode');

    await expect(page.getByText(/easy mode/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /listen/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /forward check karo/i })).toBeVisible();

    await expectNoHorizontalOverflow(page);
    expectNoCriticalConsoleErrors(consoleErrors);
  });
});
