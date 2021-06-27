import HTTPTransport from '../classes/HTTPTransport';
import BaseApi from './BaseApi';
import env from '../utils/env';

const chatApi = new HTTPTransport(`${env.HOST_API}/chats`);

class ChatApi extends BaseApi {
  public create() {
    return chatApi.post('/', {
      headers: ChatApi.defaultHeaders,
      withCredentials: true,
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
