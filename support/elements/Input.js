import { expect } from '@playwright/test';
import BaseElement from './BaseElement';

export default class Input extends BaseElement {
  get errorContainer() {
    return this.locator.locator('xpath=following-sibling::div');
  }

  async shouldBeInvalid() {
    await expect(this.locator).toHaveClass(/is-invalid/);
  }

  async shouldHaveErrorText(text) {
    await this.shouldBeInvalid();
    await expect(this.errorContainer).toContainText(text);
  }
}