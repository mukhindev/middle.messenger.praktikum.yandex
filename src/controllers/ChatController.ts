import ChatApi from '../api/ChatApi';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { IChatApi } from '../interfaces/IChatApi';
import { showToast } from '../utils/toast';
import { chatStore } from '../stores/chatStore';

const chatApi = new ChatApi();

class ChatController {
  public create(data: IChatApi) {
    showPreloader();
    return chatApi.create(data)
      .then((xhr) => {
        showToast('Чат создан', 'success');
        return JSON.parse(xhr.response);
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public request() {
    showPreloader();
    return chatApi.request()
      .then((xhr) => {
        showToast('Данные чата', 'success');
        const response = JSON.parse(xhr.response);
        chatStore.setState({
          chats: response,
        });
        return JSON.parse(xhr.response);
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }
}

export default ChatController;
