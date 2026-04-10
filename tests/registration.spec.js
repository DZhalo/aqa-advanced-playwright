import { test, expect } from '@playwright/test';

function generateEmail() {
  return `aqa-${Date.now()}@test.com`;
}

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
  });

  test('Positive: user can register with valid data', async ({ page }) => {
    const email = generateEmail();

    await page.locator('#signupName').fill('John');
    await page.locator('#signupLastName').fill('Doe');
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill('Password123');
    await page.locator('#signupRepeatPassword').fill('Password123');

    await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL(/\/panel\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  });

  test('Negative1: empty Name shows "Name required"', async ({ page }) => {
    await page.locator('#signupName').focus();
    await page.locator('#signupLastName').click();

    await expect(page.locator('#signupName')).toHaveClass(/is-invalid/);
    await expect(page.locator('#signupName').locator('xpath=following-sibling::div')).toContainText('Name required');
  });

  test('Negative2: invalid Name shows validation errors', async ({ page }) => {
    await page.locator('#signupName').fill('Ф');
    await page.locator('#signupLastName').click();

    await expect(page.locator('#signupName')).toHaveClass(/is-invalid/);
    await expect(page.locator('#signupName').locator('xpath=following-sibling::div')).toContainText('Name is invalid');
    await expect(page.locator('#signupName').locator('xpath=following-sibling::div')).toContainText(
      'Name has to be from 2 to 20 characters long'
    );
  });

  test('Negative3: invalid Email shows "Email is incorrect"', async ({ page }) => {
    await page.locator('#signupEmail').fill('aqa-invalid-email');
    await page.locator('#signupPassword').click();

    await expect(page.locator('#signupEmail')).toHaveClass(/is-invalid/);
    await expect(page.locator('#signupEmail').locator('xpath=following-sibling::div')).toContainText('Email is incorrect');
  });

  test('Negative4: invalid Password shows validation error', async ({ page }) => {
    await page.locator('#signupPassword').fill('123');
    await page.locator('#signupRepeatPassword').click();

    await expect(page.locator('#signupPassword')).toHaveClass(/is-invalid/);
    await expect(page.locator('#signupPassword').locator('xpath=following-sibling::div')).toContainText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  test('Negative5: re-enter password mismatch shows "Passwords do not match"', async ({ page }) => {
    await page.locator('#signupPassword').fill('Password1');
    await page.locator('#signupRepeatPassword').fill('Password2');
    await page.locator('#signupName').click();

    await expect(page.locator('#signupRepeatPassword')).toHaveClass(/is-invalid/);
    await expect(page.locator('#signupRepeatPassword').locator('xpath=following-sibling::div')).toContainText(
      'Passwords do not match'
    );
  });
});