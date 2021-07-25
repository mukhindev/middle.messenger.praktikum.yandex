import userApi from '../api/UserApi';
import { IUserApiSearch, IUserApiUpdateProfile } from '../interfaces/IUserApi';
import { handleError } from '../utils/apiHandler';
import { hidePreloader, showPreloader } from '../utils/preloader';
import { showToast } from '../utils/toast';
import { store } from '../store';
import { convertKeysToCamelCase } from '../utils/keysConverter';

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
      .then((user) => {
        showToast('Профиль обновлён', 'success');
        return user;
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public updateAvatar(data: FormData) {
    showPreloader();
    return userApi.updateAvatar(data)
      .then((res) => {
        showToast('Аватар обновлён', 'success');
        const user = convertKeysToCamelCase(res);
        store.setState({
          currentUser: user,
        });
        return user;
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }
}

export default new ChatController();
