import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class ProfilePage extends BasePage {
  constructor(page) {
    super(page);

    this.profileTitle = page.getByRole('heading', { name: 'Profile' });
    this.profileName = page.locator('.profile_name');
  }

  async open() {
    await this.page.goto('/panel/profile');
  }

  async shouldBeOpen() {
    await expect(this.page).toHaveURL(/\/panel\/profile/);
    await expect(this.profileTitle).toBeVisible();
  }

  async shouldHaveProfileName(fullName) {
    await expect(this.profileName).toHaveText(fullName);
  }
}