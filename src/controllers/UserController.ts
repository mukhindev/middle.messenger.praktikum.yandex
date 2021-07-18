import UserApi from '../api/UserApi';
import { IUserApiSearch, IUserApiUpdateProfile } from '../interfaces/IUserApi';
import { handleError } from '../utils/apiHandler';
import { hidePreloader, showPreloader } from '../utils/preloader';
import { showToast } from '../utils/toast';

const userApi = new UserApi();

class ChatController {
  public search(data: IUserApiSearch) {
    return userApi.search(data)
      .then((users) => {
        return users;
      })
      .catch(handleError);
  }

  public updateProfile(data: IUserApiUpdateProfile) {
    showPreloader();
    return userApi.updateProfile(data)
      .then((users) => {
        showToast('Профиль обновлён', 'success');
        return users;
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }
}

export default ChatController;
