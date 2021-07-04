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

  public checkAuth() {
    return this.get('/user', {
      withCredentials: true,
    });
  }

  public signOut() {
    return this.post('/logout', {
      withCredentials: true,
    });
  }
}

export default AuthApi;
