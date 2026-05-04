export default class AuthController {
  constructor(request) {
    this.request = request;
  }

  async signIn(email, password) {
    return this.request.post('/api/auth/signin', {
      data: {
        email,
        password,
        remember: false,
      },
    });
  }
}