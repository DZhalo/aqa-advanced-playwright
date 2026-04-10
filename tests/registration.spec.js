import { test } from '@playwright/test';
import WelcomePage from '../support/pages/WelcomePage';
import GaragePage from '../support/pages/GaragePage';

function generateEmail() {
  return `aqa-${Date.now()}@test.com`;
}

test.describe('Registration form with POM', () => {
  let welcomePage;
  let garagePage;

  test.beforeEach(async ({ page }) => {
    welcomePage = new WelcomePage(page);
    garagePage = new GaragePage(page);

    await welcomePage.open();
    await welcomePage.openRegistrationModal();
  });

  test('Positive: user can register with valid data', async () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
      email: generateEmail(),
      password: 'Password123',
      repeatPassword: 'Password123',
    };

    await welcomePage.registrationModal.register(user);
    await garagePage.shouldBeOpen();
  });

  test('Negative1: empty Name shows "Name required"', async () => {
    await welcomePage.registrationModal.nameInput.focus();
    await welcomePage.registrationModal.lastNameInput.click();

    await welcomePage.registrationModal.nameInput.shouldHaveErrorText('Name required');
  });

  test('Negative2: invalid Name shows validation errors', async () => {
    await welcomePage.registrationModal.fillName('Ф');
    await welcomePage.registrationModal.lastNameInput.click();

    await welcomePage.registrationModal.nameInput.shouldHaveErrorText('Name is invalid');
    await welcomePage.registrationModal.nameInput.shouldHaveErrorText(
      'Name has to be from 2 to 20 characters long'
    );
  });

  test('Negative3: invalid Email shows "Email is incorrect"', async () => {
    await welcomePage.registrationModal.fillEmail('aqa-invalid-email');
    await welcomePage.registrationModal.passwordInput.click();

    await welcomePage.registrationModal.emailInput.shouldHaveErrorText('Email is incorrect');
  });

  test('Negative4: invalid Password shows validation error', async () => {
    await welcomePage.registrationModal.fillPassword('123');
    await welcomePage.registrationModal.repeatPasswordInput.click();

    await welcomePage.registrationModal.passwordInput.shouldHaveErrorText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  test('Negative5: re-enter password mismatch shows "Passwords do not match"', async () => {
    await welcomePage.registrationModal.fillPassword('Password1');
    await welcomePage.registrationModal.fillRepeatPassword('Password2');
    await welcomePage.registrationModal.nameInput.click();

    await welcomePage.registrationModal.repeatPasswordInput.shouldHaveErrorText(
      'Passwords do not match'
    );
  });
});