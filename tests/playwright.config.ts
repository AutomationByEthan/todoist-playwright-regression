import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',           // ← Tells VS Code where tests are
  timeout: 30_000,
  use: {
    headless: false,            // ← Shows browser
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10_000,
  },
  reporter: 'html',
});