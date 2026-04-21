import { expect } from '@playwright/test';

export default class BaseElement {
  constructor(locator) {
    this.locator = locator;
  }

  async click() {
    await this.locator.click();
  }

  async fill(value) {
    await this.locator.fill(value);
  }

  async focus() {
    await this.locator.focus();
  }

  async shouldBeVisible() {
    await expect(this.locator).toBeVisible();
  }

  async shouldBeEnabled() {
    await expect(this.locator).toBeEnabled();
  }

  async shouldBeDisabled() {
    await expect(this.locator).toBeDisabled();
  }

  async shouldHaveClass(classNameRegex) {
    await expect(this.locator).toHaveClass(classNameRegex);
  }

  async shouldContainText(text) {
    await expect(this.locator).toContainText(text);
  }
}