import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page);

    this.garageTitle = page.getByRole('heading', { name: 'Garage' });
  }

  async shouldBeOpen() {
    await expect(this.page).toHaveURL(/\/panel\/garage/);
    await expect(this.garageTitle).toBeVisible();
  }
}