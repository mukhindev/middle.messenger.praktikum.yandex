import Block from '../../classes/Block';
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import ChatHeader from '../../components/blocks/ChatHeader/ChatHeader';
import MessageList from '../../components/blocks/MessageList/MessageList';
import MessageInput from '../../components/blocks/MessageInput/MessageInput';
import { compile } from '../../utils/templator';
import { template } from './ChatPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import createChatIcon from '../../assets/images/create-chat.svg';
import settingIcon from '../../assets/images/settings.svg';
import { contacts, messages } from '../../utils/mockData';
import { router } from '../../router';
import Popup from '../../components/ui/Popup/Popup';
import NewChatForm from '../../components/forms/NewChatForm/NewChatForm';
import './ChatPage.scss';
import { chatController } from '../../controllers';
import { chatStore } from '../../stores/chatStore';

const bem = new BemHandler('chat-page');

class ChatPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      chats: chatStore.state.chats,
      SearchInput: new Input({
        label: 'Поиск',
        type: 'search',
        onInput: (value) => console.log('Поле поиска:', value),
      }),
      ContactCardList: new ContactCardList({
        classMix: bem.get('contact-card-list'),
        contacts,
      }),
      ChatHeader: new ChatHeader({
        onAddContact: () => {
          this.props.AddContactPopup.show();
        },
        onRemoveContact: () => console.log('Кнопка удаления контакта'),
      }),
      MessageList: new MessageList({
        classMix: bem.get('message-list'),
        messages,
      }),
      MessageInput: new MessageInput({
        onMessageInput: (value) => console.log('Ввод нового сообщения', value),
        onMessageSend: (formData) => console.log(formData),
        onAttachmentFile: () => console.log('Кнопка прикрепления файла'),
        onAttachmentMedia: () => console.log('Кнопка прикрепления фото или видео'),
        onAttachmentLocation: () => console.log('Кнопка прикрепления локации'),
      }),
      NewChatPopup: new Popup({
        classMix: bem.get('new-chat-popup'),
        title: 'Создать чат',
      }),
      NewChatButton: new Button({
        label: 'Новый чат',
        icon: createChatIcon,
        light: true,
        onClick: () => this.props.NewChatPopup.show(),
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
      AddContactPopup: new Popup({
        classMix: bem.get('add-contact-popup'),
        title: 'Добавить пользователя в чат',
      }),
      AddContactInput: new Input({
        label: 'Логин',
        onInput: (value) => console.log('Поле логина:', value),
      }),
      AddContactSubmitButton: new Button({
        label: 'Добавить',
        color: 'primary',
        classMix: bem.get('add-contact-submit-button'),
        onClick: () => console.log('Субмит добавления пользователя'),
      }),
      AddContactInviteButton: new Button({
        label: 'Пригласить в чат',
        light: true,
        classMix: bem.get('add-contact-invite-button'),
        onClick: () => console.log('Кнопка пригласить в чат'),
      }),
    });
  }

  componentDidMount() {
    chatController.request();
    chatStore.subscribe((state) => {
      this.props.ContactCardList.setProps({
        contacts: state.chats,
      });
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ChatPage;
