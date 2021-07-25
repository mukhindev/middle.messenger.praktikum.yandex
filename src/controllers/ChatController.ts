import chatApi from '../api/ChatApi';
import { IChatApiAddUser, IChatApiCreate } from '../interfaces/IChatApi';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { showToast } from '../utils/toast';
import { store } from '../store';
import { router } from '../router';

class ChatController {
  public create(data: IChatApiCreate) {
    showPreloader();
    return chatApi.create(data)
      .then((chat) => {
        showToast('Чат создан', 'success');
        return chat.id;
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public request() {
    showPreloader();
    return chatApi.request()
      .then((chats) => {
        store.setState({
          chats,
        });
        if (!store.state.chatId) {
          store.setState({
            chatId: chats[0]?.id || null,
          });
        }
        return chats;
      })
      .catch((error) => {
        router.go('/sign-in');
        handleError(error);
      })
      .finally(() => {
        hidePreloader();
      });
  }

  public removeChat() {
    return chatApi.removeChat(store.state.chatId)
      .then(() => {
        showToast('Чат удалён', 'success');
        this.request();
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
      .then((auth) => {
        return auth;
      })
      .catch(handleError);
  }

  public requestChatUsers(chatId: number) {
    return chatApi.requestChatUsers(chatId)
      .then((users) => {
        return users;
      })
      .catch(handleError);
  }
}

export default new ChatController();
