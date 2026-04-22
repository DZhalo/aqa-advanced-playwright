import { test, expect } from '../support/fixtures/userGaragePage.fixture';

test('logged user can open garage page using custom fixture', async ({ userGaragePage }) => {
  await userGaragePage.shouldBeOpen();
  await expect(userGaragePage.garageTitle).toBeVisible();
});