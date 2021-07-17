import UserApi from '../api/UserApi';
import { IUserApiSearch } from '../interfaces/IUserApi';
import { handleError } from '../utils/apiHandler';

const userApi = new UserApi();

class ChatController {
  public search(data: IUserApiSearch) {
    return userApi.search(data)
      .then((users) => {
        return users;
      })
      .catch(handleError);
  }
}

export default ChatController;
