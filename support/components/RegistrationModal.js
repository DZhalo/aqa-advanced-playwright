import { expect } from '@playwright/test';
import BaseComponent from './BaseComponent';
import Input from '../elements/Input';
import Button from '../elements/Button';

export default class RegistrationModal extends BaseComponent {
  constructor(page) {
    super(page, page.locator('app-signup-modal'));

    this.title = this.root.getByRole('heading', { name: 'Registration' });

    this.nameInput = new Input(this.root.locator('#signupName'));
    this.lastNameInput = new Input(this.root.locator('#signupLastName'));
    this.emailInput = new Input(this.root.locator('#signupEmail'));
    this.passwordInput = new Input(this.root.locator('#signupPassword'));
    this.repeatPasswordInput = new Input(this.root.locator('#signupRepeatPassword'));

    this.registerButton = new Button(
      this.root.getByRole('button', { name: 'Register' })
    );
  }

  async shouldBeOpen() {
    await expect(this.title).toBeVisible();
  }

  async fillName(value) {
    await this.nameInput.fill(value);
  }

  async fillLastName(value) {
    await this.lastNameInput.fill(value);
  }

  async fillEmail(value) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value) {
    await this.passwordInput.fill(value);
  }

  async fillRepeatPassword(value) {
    await this.repeatPasswordInput.fill(value);
  }

  async register(user) {
    await this.fillName(user.name);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.fillRepeatPassword(user.repeatPassword);
    await this.registerButton.click();
  }
}