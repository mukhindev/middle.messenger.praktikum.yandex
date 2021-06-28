import BaseApi from './BaseApi';
import { IChatApiCreate } from '../interfaces/IChatApi';

class ChatApi extends BaseApi {
  constructor() {
    super({ path: '/chats' });
  }

  public create(data: IChatApiCreate) {
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
