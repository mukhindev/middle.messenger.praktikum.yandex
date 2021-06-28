import HTTPTransport from '../classes/HTTPTransport';
import BaseApi from './BaseApi';
import env from '../utils/env';
import { IChatApi } from '../interfaces/IChatApi';

const chatApi = new HTTPTransport(`${env.HOST_API}/chats`);

class ChatApi extends BaseApi {
  public create(data?: IChatApi) {
    return chatApi.post('/', {
      headers: ChatApi.defaultHeaders,
      withCredentials: true,
      data,
    });
  }

  public request() {
    return chatApi.get('/', {
      headers: ChatApi.defaultHeaders,
      withCredentials: true,
    });
  }
}

export default ChatApi;
