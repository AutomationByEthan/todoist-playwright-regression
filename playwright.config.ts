// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: [['html'], ['list']],

  projects: [
    // DESKTOP
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },*/

    // MOBILE
    /*{
      name: 'iPhone 13',
      use: {
        ...devices['iPhone 13'],
        locale: 'en-US',
        timezoneId: 'America/Chicago',
        geolocation: { latitude: 41.8781, longitude: -87.6298 }, // Chicago
        permissions: ['geolocation'],
      },
    },
    {
      name: 'Pixel 5',
      use: {
        ...devices['Pixel 5'],
        locale: 'en-US',
        timezoneId: 'America/Chicago',
      },
    },*/
  ],
});