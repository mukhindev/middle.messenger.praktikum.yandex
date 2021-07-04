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
          messageController.leave();
          store.setState({ chatId });
          this.requestChat(chatId);
        },
      }),
      MessageHeader: new MessageHeader({
        onAddContact: () => {
          this.props.AddChatUserPopup.show();
        },
        onRemoveContact: () => {},
      }),
      MessageList: new MessageList({
        classMix: bem.get('message-list'),
        messages: [],
      }),
      MessageInput: new MessageInput({
        onMessageSend: ({ message }) => {
          messageController.sendMessage(message);
        },
        onAttachmentFile: () => console.log('Кнопка прикрепления файла'),
        onAttachmentMedia: () => console.log('Кнопка прикрепления фото или видео'),
        onAttachmentLocation: () => console.log('Кнопка прикрепления локации'),
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
            .then(() => {
              this.props.NewChatPopup.hide();
            });
          console.log(formData);
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
        title: 'Добавить пользователя в чат',
        onOpen: () => {
          this.props.UserList.setProps({
            users: [],
          });
        },
      }),
      AddChatUserForm: new AddChatUserForm({
        onSubmit: (formData) => {
          userController.search({
            login: formData.login,
          })
            .then((res) => {
              console.log(res);
              this.props.UserList.setProps({
                users: res,
              });
            });
          console.log(formData);
        },
      }),
      InviteChatUserButton: new Button({
        label: 'Пригласить в чат',
        light: true,
        classMix: bem.get('add-contact-invite-button'),
        onClick: () => console.log('Кнопка пригласить в чат'),
      }),
      selectedUsers: [],
      UserList: new UserList({
        className: bem.get('user-list'),
        users: [],
        onAdd: (usersId) => {
          chatController.addUserChat({
            users: usersId,
            chatId: store.state.chatId,
          });
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
    chatController.requestMessageToken(chatId)
      .then(({ token }) => {
        store.setState({ token });
        this.requestMessages(token);
      });
  }

  componentDidMount() {
    chatController.request()
      .then(() => {
        this.requestChat(store.state.chatId);
      });

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
}

export default ChatPage;
