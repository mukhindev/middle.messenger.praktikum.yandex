import HTTPTransport from '../classes/HTTPTransport';
import BaseApi from './BaseApi';
import env from '../utils/env';
import { IAuthSignUpApi } from '../interfaces/IAuthSignUpApi';

const authApi = new HTTPTransport(`${env.HOST_API}/auth`);

class AuthSignUpApi extends BaseApi {
  public request(user?: IAuthSignUpApi) {
    return authApi.post('/signup', {
      headers: AuthSignUpApi.defaultHeaders,
      data: user,
    });
  }
}

export default AuthSignUpApi;
