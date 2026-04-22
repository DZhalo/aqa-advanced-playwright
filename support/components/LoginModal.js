import { expect } from '@playwright/test';
import BaseComponent from './BaseComponent';
import Input from '../elements/Input';
import Button from '../elements/Button';

export default class LoginModal extends BaseComponent {
  constructor(page) {
    super(page, page.locator('app-signin-modal'));

    this.title = this.root.getByRole('heading', { name: 'Log in' });

    this.emailInput = new Input(this.root.locator('#signinEmail'));
    this.passwordInput = new Input(this.root.locator('#signinPassword'));

    this.loginButton = new Button(
      this.root.getByRole('button', { name: 'Login' })
    );
  }

  async shouldBeOpen() {
    await expect(this.title).toBeVisible();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}