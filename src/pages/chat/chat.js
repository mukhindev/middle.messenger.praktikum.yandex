import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import Input from '../../components/ui/Input/Input';
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList';
import Button from '../../components/ui/Button/Button';
import MessageList from '../../components/blocks/MessageList/MessageList';
import MessageInput from '../../components/blocks/MessageInput/MessageInput';
import createChatIcon from '../../assets/images/create-chat.svg';
import settingIcon from '../../assets/images/settings.svg';
import '../../assets/styles/global.scss';
import './chat.scss';
import { contacts, messages } from '../../utils/mockData';

function ChatPage() {
  ChatPage.context = {
    className: 'chat-page',
    Main,
    Input,
    ContactCardList,
    Button,
    MessageList,
    MessageInput,
    createChatIcon,
    settingIcon,
    handleSearchInput: (value) => console.log('Ввод в поиск:', value),
    handleCreateClick: () => console.log('Нажата кнопка создания чата'),
    handleOptionsClick: () => console.log('Нажата кнопка настроек'),
    handleAttachFile: () => console.log('Нажата кнопка прикрепления файла'),
    handleMessageInput: (value) => console.log('Ввод нового сообщения:', value),
    handleSend: () => console.log('Нажата кнопка отправки сообщения'),
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

  const chatWindowTemplate = `
    <Main
      parentBlock="{{ className }}"
      mix="main"
    >
      <MessageList
        parentBlock="{{ className }}"
        mix="message-list"
        messages="{{ messages }}"
      />
      <MessageInput
        onAttachFile="{{ handleAttachFile }}"
        onMessageInput="{{ handleMessageInput }}"
        onSend="{{ handleSend }}"
      />
    </Main>
  `;

  return `
    <div class="{{ className }}">
      ${sidePanelTemplate}
      ${chatWindowTemplate}
    </div>
  `;
}

const html = new Templator().compile(ChatPage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
