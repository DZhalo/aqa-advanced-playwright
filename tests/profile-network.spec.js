import { test, expect } from '../support/fixtures/userGaragePage.fixture';
import ProfilePage from '../support/pages/ProfilePage';

test('Profile page should display mocked user profile data', async ({ userGaragePage }) => {
  const page = userGaragePage.page;
  const profilePage = new ProfilePage(page);

  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 351079,
          photoFilename: 'default-user.png',
          name: 'Jinny',
          lastName: 'Doe',
        },
      }),
    });
  });

  await profilePage.open();

  await profilePage.shouldBeOpen();
  await profilePage.shouldHaveProfileName('Jinny Doe');

  await expect(page.locator('.profile_name')).not.toHaveText('Daria Zhaloba');
});