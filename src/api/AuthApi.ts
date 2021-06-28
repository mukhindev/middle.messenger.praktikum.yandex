import BaseApi from './BaseApi';
import { IAuthSignInApi } from '../interfaces/IAuthSignInApi';
import { IAuthSignUpApi } from '../interfaces/IAuthSignUpApi';

class AuthApi extends BaseApi {
  constructor() {
    super({ path: '/auth' });
  }

  public signIn(user?: IAuthSignInApi) {
    return this.post('/signin', {
      withCredentials: true,
      data: user,
    });
  }

  public signUp(user?: IAuthSignUpApi) {
    return this.post('/signup', {
      data: user,
    });
  }
}

export default AuthApi;
