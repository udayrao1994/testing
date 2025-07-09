// tests/setup/global-test.ts
import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const test = base.extend({});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotDir = path.join('screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }

    const safeTitle = testInfo.title.replace(/[^\w\d-_]/g, '_');
    const screenshotPath = path.join(screenshotDir, `${safeTitle}.png`);

    await page.screenshot({ path: screenshotPath, fullPage: true });

    testInfo.attachments.push({
      name: 'screenshot',
      path: screenshotPath,
      contentType: 'image/png',
    });
  }
});

export { test, expect };
