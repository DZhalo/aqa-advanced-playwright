import BasePage from './BasePage';
import Button from '../elements/Button';
import RegistrationModal from '../components/RegistrationModal';
import LoginModal from '../components/LoginModal';

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page);

    this.signUpButton = new Button(
      page.getByRole('button', { name: 'Sign up' })
    );

    this.signInButton = new Button(
      page.getByRole('button', { name: 'Sign In' })
    );

    this.registrationModal = new RegistrationModal(page);
    this.loginModal = new LoginModal(page);
  }

  async open() {
    await super.open('/');
  }

  async openRegistrationModal() {
    await this.signUpButton.click();
    await this.registrationModal.shouldBeOpen();
  }

  async openLoginModal() {
    await this.signInButton.click();
    await this.loginModal.shouldBeOpen();
  }
}