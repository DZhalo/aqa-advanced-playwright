import { test as setup } from '@playwright/test';
import WelcomePage from '../support/pages/WelcomePage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user and save storage state', async ({ page }) => {
  const welcomePage = new WelcomePage(page);

  await welcomePage.open();
  await welcomePage.openLoginModal();

  await welcomePage.loginModal.login(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD
  );

  await page.waitForURL(/\/panel\/garage/);

  await page.context().storageState({ path: authFile });
});