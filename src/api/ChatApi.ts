import BaseApi from './BaseApi';
import { IChatApi } from '../interfaces/IChatApi';

class ChatApi extends BaseApi {
  constructor() {
    super({ path: '/chats' });
  }

  public create(data?: IChatApi) {
    return this.post('/', {
      withCredentials: true,
      data,
    });
  }

  public request() {
    return this.get('/', {
      withCredentials: true,
    });
  }
}

export default ChatApi;
