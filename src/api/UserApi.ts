import BaseApi from './BaseApi';
import { IUserApiSearch } from '../interfaces/IUserApi';

class UserApi extends BaseApi {
  constructor() {
    super({ path: '/user' });
  }

  public search(data: IUserApiSearch) {
    return this.post('/search', {
      withCredentials: true,
      data,
    });
  }
}

export default UserApi;
