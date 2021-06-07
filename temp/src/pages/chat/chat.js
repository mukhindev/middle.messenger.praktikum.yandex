import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import Input from '../../components/ui/Input/Input';
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList';
import Button from '../../components/ui/Button/Button';
import Popup from '../../components/ui/Popup/Popup';
import ChatHeader from '../../components/blocks/ChatHeader/ChatHeader';
import MessageList from '../../components/blocks/MessageList/MessageList';
import MessageInput from '../../components/blocks/MessageInput/MessageInput';
import createChatIcon from '../../assets/images/create-chat.svg';
import settingIcon from '../../assets/images/settings.svg';
import addContactIcon from '../../assets/images/add-contact.svg';
import trashIcon from '../../assets/images/trash.svg';
import attachmentIcon from '../../assets/images/attachment.svg';
import pictureIcon from '../../assets/images/picture.svg';
import locationIcon from '../../assets/images/location.svg';
import '../../assets/styles/global.scss';
import './chat.scss';
import { contacts, messages } from '../../utils/mockData';

function ChatPage() {
  const handleVisibility = (targetSelector, openedClass) => {
    const list = document.querySelector(targetSelector);
    list.classList.toggle(openedClass);
    function handleOverlay(evt) {
      if (!evt.target.closest(targetSelector)) {
        list.classList.remove(openedClass);
        document.removeEventListener('mousedown', handleOverlay);
      }
    }
    if (list.classList.contains(openedClass)) {
      document.addEventListener('mousedown', handleOverlay);
    } else {
      document.removeEventListener('mousedown', handleOverlay);
    }
  };

  ChatPage.context = {
    className: 'chat-page',
    Main,
    Input,
    ContactCardList,
    Button,
    ChatHeader,
    MessageList,
    MessageInput,
    Popup,
    createChatIcon,
    settingIcon,
    handleSearchInput: (target) => console.log('Ввод в поиск:', target.value),
    handleAddContactInput: (target) => console.log('Ввод логина нового контакта:', target.value),
    handleCreateClick: () => console.log('Нажата кнопка создания чата'),
    handleOptionsClick: () => {
      window.location.href = '/profile.html';
    },
    handleMessageInput: (target) => console.log('Ввод нового сообщения:', target.value),
    handleSend: () => console.log('Нажата кнопка отправки сообщения'),
    handleMoreMenu: () => handleVisibility('.chat-header__more-menu', 'drop-down-list_opened'),
    moreMenu: {
      name: 'moreMenu',
      items: [
        {
          id: '1',
          icon: addContactIcon,
          name: 'Добавить пользователя',
          on: () => {
            ChatPage.context.handleMoreMenu();
            ChatPage.context.handleAddContactPopup();
          },
        },
        {
          id: '2',
          icon: trashIcon,
          name: 'Удалить пользователя',
          on: () => {
            console.log('Нажат пункт Удалить пользователя');
            ChatPage.context.handleMoreMenu();
          },
        },
      ],
    },
    handleAddContactPopup: () => handleVisibility('.popup', 'popup_opened'),
    handleAttachmentMenu: () => handleVisibility('.message-input__attachment-menu', 'drop-down-list_opened'),
    attachmentMenu: {
      name: 'attachmentMenu',
      items: [
        {
          id: '3',
          icon: attachmentIcon,
          name: 'Загрузить файл',
          on: () => {
            console.log('Нажат пункт Загрузить файл');
            ChatPage.context.handleAttachmentMenu();
          },
        },
        {
          id: '4',
          icon: pictureIcon,
          name: 'Загрузить фото или видео',
          on: () => {
            console.log('Нажат пункт Загрузить фото или видео');
            ChatPage.context.handleAttachmentMenu();
          },
        },
        {
          id: '5',
          icon: locationIcon,
          name: 'Поделиться локацией',
          on: () => {
            console.log('Нажат пункт Поделиться локацией');
            ChatPage.context.handleAttachmentMenu();
          },
        },
      ],
    },
    handleSelectMenuItem: (menu, id) => {
      ChatPage.context[menu].items.find((item) => item.id === id).on();
    },
    handleAddContactClose: () => ChatPage.context.handleAddContactPopup(),
    contacts,
    messages,
  };

  const sidePanelTemplate = `
    <aside class="{{ className }}__side-panel">
      <div class="{{ className }}__side-panel-header">
        <Input
          type="search"
          label="Поиск"
          placeholder="Поиск"
          onInput="{{ handleSearchInput }}"
        />
      </div>
      <ContactCardList
        parentBlock="{{ className }}"
        mix="contact-card-list"
        contacts="{{ contacts }}"
      />
      <div class="{{ className }}__side-panel-footer">
        <Button
          onClick="{{ handleCreateClick }}"
          icon="{{ createChatIcon }}"
          label="Новый чат"
          light="{{ true }}"
        />
        <Button
          onClick="{{ handleOptionsClick }}"
          icon="{{ settingIcon }}"
          label="Настройки"
          light="{{ true }}"
        />
      </div>
    </aside>
  `;

  const unselectedChatWindowTemplate = `
    <div class="{{ className }}__unselected-сhat-window">
      <p class="{{ className }}__unselected-сhat-message">Выберете чат или создайте новый</p>
    </div>
  `;

  const chatWindowTemplate = `
    <Main
      parentBlock="{{ className }}"
      mix="main"
    >
      <ChatHeader
        name="Денис Колбасов"
        moreMenu="{{ moreMenu }}"
        onMoreMenu="{{ handleMoreMenu }}"
        onSelectItem="{{ handleSelectMenuItem }}"
      />
      <MessageList
        parentBlock="{{ className }}"
        mix="message-list"
        messages="{{ messages }}"
      />
      <MessageInput
        attachmentMenu="{{ attachmentMenu }}"
        onAttachmentMenu="{{ handleAttachmentMenu }}"
        onMessageInput="{{ handleMessageInput }}"
        onSend="{{ handleSend }}"
        onSelectItem="{{ handleSelectMenuItem }}"
      />
    </Main>
  `;

  const addUserPopupTemplate = `
    <Popup
      title="Добавить пользователя в чат"
      parentBlock="{{ className }}"
      mix="popup"
      onClose="{{ handleAddContactClose }}"
    >
      <Input
        type="search"
        label="Логин"
        placeholder="Логин"
        onInput="{{ handleAddContactInput }}"
      />
      <Button
        parentBlock="{{ className }}"
        mix="button-submit-add-contact"
        onClick="{{ handleCreateClick }}"
        label="Добавить"
        color="primary"
      />
      <Button
        parentBlock="{{ className }}"
        mix="button-submit-invite-contact"
        onClick="{{ handleCreateClick }}"
        label="Пригласить в чат"
        light="{{ true }}"
      />
    </Popup>
  `;

  return `
    <div class="{{ className }}">
      ${sidePanelTemplate}
      ${unselectedChatWindowTemplate}
      ${chatWindowTemplate}
      ${addUserPopupTemplate}
    </div>
  `;
}

const html = new Templator().compile(ChatPage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
