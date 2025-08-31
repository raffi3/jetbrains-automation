import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "allure-playwright", 
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
      }
    ]
  ],
  use: {
    baseURL: 'https://www.jetbrains.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'UI-Tests-Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'UI-Tests-Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'UI-Tests-Webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});
