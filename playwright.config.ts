import { defineConfig } from '@playwright/test'

/**
 * End-to-end suite for the Nuxt frontend.
 *
 * Prerequisites:
 *   - Laravel API running on http://127.0.0.1:8000 (php artisan serve)
 *   - A production build in .output (npm run build)
 *
 * `npm run test:e2e` builds automatically. The API and demo data are expected
 * to be seeded (php artisan db:seed && php artisan db:seed --class=IctCourseSeeder).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    { name: 'public', testMatch: /public\.spec\.ts/ },
    {
      name: 'customer',
      testMatch: /customer\.spec\.ts/,
      dependencies: ['setup'],
      use: { storageState: 'tests/.auth/customer.json' },
    },
    {
      name: 'admin',
      testMatch: /admin\.spec\.ts/,
      dependencies: ['setup'],
      use: { storageState: 'tests/.auth/admin.json' },
    },
  ],
  webServer: {
    command: 'node .output/server/index.mjs',
    port: 3100,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { PORT: '3100', NITRO_PORT: '3100' },
  },
})
