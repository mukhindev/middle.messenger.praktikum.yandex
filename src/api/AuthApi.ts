import BaseApi from './BaseApi';
import { IAuthApiSignIn, IAuthApiSignUp } from '../interfaces/IAuthApi';

class AuthApi extends BaseApi {
  constructor() {
    super({ path: '/auth' });
  }

  public signIn(data: IAuthApiSignIn) {
    return this.post('/signin', {
      withCredentials: true,
      data,
    });
  }

  public signUp(data: IAuthApiSignUp) {
    return this.post('/signup', {
      data,
    });
  }
}

export default AuthApi;
