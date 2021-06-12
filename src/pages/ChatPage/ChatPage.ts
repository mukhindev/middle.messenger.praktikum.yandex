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
import '../../assets/styles/global.scss';
import './ChatPage.scss';

const bem = new BemHandler('chat-page');

class ChatPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
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
        onAddContact: () => console.log('Кнопка добавления контакта'),
        onRemoveContact: () => console.log('Кнопка удаления контакта'),
      }),
      MessageList: new MessageList({
        classMix: bem.get('message-list'),
        messages,
      }),
      MessageInput: new MessageInput({
        onMessageInput: (value) => console.log('Ввод нового сообщения', value),
        onMessageSend: () => console.log('Кнопка отправки сообщения'),
        onAttachmentFile: () => console.log('Кнопка прикрепления файла'),
        onAttachmentMedia: () => console.log('Кнопка прикрепления фото или видео'),
        onAttachmentLocation: () => console.log('Кнопка прикрепления локации'),
      }),
      NewChatButton: new Button({
        label: 'Новый чат',
        icon: createChatIcon,
        light: true,
        onClick: () => console.log('Кнопка создания чата'),
      }),
      SettingsButton: new Button({
        label: 'Настройки',
        icon: settingIcon,
        light: true,
        onClick: () => console.log('Кнопка настроек'),
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

document.body.prepend(new ChatPage().getContent());
