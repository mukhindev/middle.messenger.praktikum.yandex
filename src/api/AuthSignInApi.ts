import HTTPTransport from '../classes/HTTPTransport';
import BaseApi from './BaseApi';
import env from '../utils/env';
import { IAuthSignInApi } from '../interfaces/IAuthSignInApi';

const authApi = new HTTPTransport(`${env.HOST_API}/auth`);

type TAuthSignInResponse = Promise<string>;

class AuthSignInApi extends BaseApi {
  public request(user?: IAuthSignInApi) {
    return authApi.post<TAuthSignInResponse>('/signin', {
      headers: AuthSignInApi.defaultHeaders,
      withCredentials: true,
      data: user,
    });
  }
}

export default AuthSignInApi;
