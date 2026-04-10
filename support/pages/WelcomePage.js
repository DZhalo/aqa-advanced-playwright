import BasePage from './BasePage';
import Button from '../elements/Button';
import RegistrationModal from '../components/RegistrationModal';

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page);

    this.signUpButton = new Button(
      page.getByRole('button', { name: 'Sign up' })
    );

    this.registrationModal = new RegistrationModal(page);
  }

  async open() {
    await super.open('/');
  }

  async openRegistrationModal() {
    await this.signUpButton.click();
    await this.registrationModal.shouldBeOpen();
  }
}