import BaseApi from './BaseApi';
import { IUserApiSearch, IUserApiUpdateProfile } from '../interfaces/IUserApi';

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

  public updateProfile(data: IUserApiUpdateProfile) {
    return this.put('/profile', {
      withCredentials: true,
      data,
    });
  }
}

export default UserApi;
