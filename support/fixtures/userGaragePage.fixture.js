import { test as base } from '@playwright/test';
import GaragePage from '../pages/GaragePage';

const authFile = 'playwright/.auth/user.json';

export const test = base.extend({
  userGaragePage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({
      storageState: authFile,
      baseURL,
    });

    const page = await context.newPage();
    const garagePage = new GaragePage(page);

    await page.goto('/panel/garage');
    await garagePage.shouldBeOpen();

    await use(garagePage);

    await context.close();
  },
});

export { expect } from '@playwright/test';