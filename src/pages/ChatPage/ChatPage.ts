import Block from '../../classes/Block';
import ChatCardList from '../../components/blocks/ChatCardList/ChatCardList';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import MessageHeader from '../../components/blocks/MessageHeader/MessageHeader';
import MessageList from '../../components/blocks/MessageList/MessageList';
import MessageInput from '../../components/blocks/MessageInput/MessageInput';
import { compile } from '../../utils/templator';
import { template } from './ChatPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import createChatIcon from '../../assets/images/create-chat.svg';
import settingIcon from '../../assets/images/settings.svg';
import { router } from '../../router';
import Popup from '../../components/ui/Popup/Popup';
import NewChatForm from '../../components/forms/NewChatForm/NewChatForm';
import AddChatUserForm from '../../components/forms/AddChatUserForm/AddChatUserForm';
import UserList from '../../components/blocks/UserList/UserList';
import { chatController, messageController, userController } from '../../controllers';
import { store } from '../../store';
import './ChatPage.scss';

const bem = new BemHandler('chat-page');

class ChatPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      chats: store.state.chats,
      SearchInput: new Input({
        label: 'Поиск',
        type: 'search',
        onInput: () => {},
      }),
      ChatCardList: new ChatCardList({
        classMix: bem.get('contact-card-list'),
        chats: store.state.chats,
        onSelect: (chatId) => {
          store.setState({ messages: [] });
          messageController.leave();
          store.setState({ chatId });
          localStorage.setItem('last-select-chat-id', `${chatId}`);
          this.requestChat(chatId);
        },
      }),
      MessageHeader: new MessageHeader({
        onAddContact: () => {
          this.props.AddChatUserPopup.show();
        },
        onRemoveContact: () => {
          this.props.DeleteChatUserPopup.show();
        },
        onRemoveChat: () => {
          chatController.removeChat();
        },
      }),
      MessageList: new MessageList({
        classMix: bem.get('message-list'),
        messages: [],
        onEndList: (length) => {
          if (length && (length % 20 === 0)) {
            messageController.getMessages({ offset: length });
          }
        },
      }),
      MessageInput: new MessageInput({
        onMessageSend: ({ message }) => {
          messageController.sendMessage(message);
          this.props.MessageList.scrollToLastMessage();
        },
        onAttachmentFile: () => {},
        onAttachmentMedia: () => {},
        onAttachmentLocation: () => {},
      }),
      NewChatButton: new Button({
        label: 'Новый чат',
        icon: createChatIcon,
        light: true,
        onClick: () => this.props.NewChatPopup.show(),
      }),
      NewChatPopup: new Popup({
        classMix: bem.get('new-chat-popup'),
        title: 'Создать чат',
      }),
      NewChatForm: new NewChatForm({
        onSubmit: (formData) => {
          chatController.create({
            title: formData.title,
          })
            .then((chatId) => {
              this.props.NewChatPopup.hide();
              this.requestChatList();
              store.state.chatId = chatId;
            });
        },
      }),
      SettingsButton: new Button({
        label: 'Настройки',
        icon: settingIcon,
        light: true,
        onClick: () => {
          router.go('/profile');
        },
      }),
      AddChatUserPopup: new Popup({
        classMix: bem.get('add-contact-popup'),
        title: 'Добавить пользователей в чат',
        onOpen: () => {
          this.props.AddUserList.setProps({ users: [], selectedUsers: [] });
        },
      }),
      AddChatUserForm: new AddChatUserForm({
        onSubmit: (formData) => {
          userController.search({
            login: formData.login,
          })
            .then((users) => {
              this.props.AddUserList.setProps({
                users,
              });
            });
        },
      }),
      AddUserList: new UserList({
        className: bem.get('user-list'),
        users: [],
        onApply: (usersId) => {
          if (!this.props.AddUserList.props.users.length) {
            return;
          }
          chatController.addUserChat({
            users: usersId,
            chatId: store.state.chatId,
          });
        },
      }),
      DeleteChatUserPopup: new Popup({
        classMix: bem.get('delete-contact-popup'),
        title: 'Удалить пользователей из чата',
        onOpen: () => {
          this.props.DeleteUserList.setProps({ users: [], selectedUsers: [] });
          chatController.requestChatUsers(store.state.chatId)
            .then((users) => {
              const usersToDelete = users.filter((user: any) => {
                return user.id !== store.state.currentUser.id;
              });
              this.props.DeleteUserList.setProps({
                users: usersToDelete,
              });
            });
        },
      }),
      DeleteUserList: new UserList({
        className: bem.get('user-list'),
        users: [],
        onApply: (usersId) => {
          if (!this.props.DeleteUserList.props.users.length) {
            return;
          }
          chatController.deleteUserChat({
            users: usersId,
            chatId: store.state.chatId,
          });
          this.props.DeleteChatUserPopup.hide();
        },
      }),
    });
  }

  requestMessages(token: string = store.state.token) {
    messageController.connect({
      userId: store.state.currentUser.id,
      chatId: store.state.chatId,
      token,
    });
  }

  requestChat(chatId: number) {
    if (!chatId) {
      return;
    }
    chatController.requestMessageToken(chatId)
      .then(({ token }) => {
        store.setState({ token });
        this.requestMessages(token);
      });
  }

  requestChatList() {
    chatController.request()
      .then(() => {
        this.requestChat(store.state.chatId);
      });
  }

  componentDidMount() {
    const lastChatId = localStorage.getItem('last-select-chat-id');

    if (lastChatId) {
      store.setState({
        chatId: +lastChatId,
      });
    }

    this.requestChatList();

    store.subscribe((state) => {
      this.props.ChatCardList.setProps({
        chats: state.chats,
      });
    });

    store.subscribe((state) => {
      this.props.MessageList.setProps({
        messages: state.messages,
      });
    });
  }

  render() {
    return compile(template, this.props);
  }

  onDestroy() {
    if (store.state.chats.length) {
      messageController.leave();
    }
    store.setState({
      chats: [],
      messages: [],
    });
  }
}

export default ChatPage;
