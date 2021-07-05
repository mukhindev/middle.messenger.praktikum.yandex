import ChatApi from '../api/ChatApi';
import { IChatApiAddUser, IChatApiCreate } from '../interfaces/IChatApi';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { showToast } from '../utils/toast';
import { store } from '../store';
import { router } from '../router';

const chatApi = new ChatApi();

class ChatController {
  public create(data: IChatApiCreate) {
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
        const response = JSON.parse(xhr.response);
        store.setState({
          chats: response,
        });
        if (!store.state.chatId) {
          store.setState({
            chatId: response[0]?.id || null,
          });
        }
        return response;
      })
      .catch((error) => {
        router.go('/sign-in');
        handleError(error);
      })
      .finally(() => {
        hidePreloader();
      });
  }

  public addUserChat(data: IChatApiAddUser) {
    return chatApi.addUserChat(data)
      .then(() => {
        showToast('Пользователи добавлены', 'success');
      })
      .catch(handleError);
  }

  public deleteUserChat(data: IChatApiAddUser) {
    return chatApi.deleteUserChat(data)
      .then(() => {
        showToast('Пользователи удалены', 'success');
      })
      .catch(handleError);
  }

  public requestMessageToken(chatId: number) {
    return chatApi.requestMessageToken(chatId)
      .then((xhr) => {
        return JSON.parse(xhr.response);
      })
      .catch(handleError);
  }

  public requestChatUsers(chatId: number) {
    return chatApi.requestChatUsers(chatId)
      .then((xhr) => {
        const response = JSON.parse(xhr.response);
        return response;
      })
      .catch(handleError);
  }
}

export default ChatController;
