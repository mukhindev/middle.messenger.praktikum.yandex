import Templator from '../../utils/Templator.js';
import getElementFromString from "../../utils/getElementFromString";
import Main from '../../components/layouts/Main/Main.js'
import Input from '../../components/ui/Input/Input.js'
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList.js'
import Button from '../../components/ui/Button/Button.js'
import MessageList from '../../components/blocks/MessageList/MessageList.js';
import '../../assets/styles/global.scss';
import './chat.scss';

function ChatPage () {
  ChatPage.context = {
    className: 'chat-page',
    Main,
    Input,
    ContactCardList,
    Button,
    MessageList,
    handleSearchInput: (value) => console.log(value),
    handleCreateClick: () => console.log('Нажата кнопка создания чата'),
    handleOptionsClick: () => console.log('Нажата кнопка настроек'),
    contacts: [
      {
        id: '1',
        name: 'Стас Басов',
        isGroup: false,
        lastMessage: 'Привет! Ты куда пропал-то?',
        ownerLastMessage: 'Стас Басов',
        counterUnreadMessages: 1,
        avatar: null,
        updatedAt: '2021-05-27T19:18:15.563Z'
      },
      {
        id: '2',
        name: 'Денис Колбасов',
        isGroup: false,
        lastMessage: 'Что за бред? 😂',
        ownerLastMessage: 'Денис Колбасов',
        counterUnreadMessages: 0,
        avatar: null,
        updatedAt: '2021-05-24T15:18:02.563Z'
      },
      {
        id: '3',
        name: 'Работа',
        isGroup: true,
        lastMessage: 'Ахахаххаха',
        ownerLastMessage: 'Макс Коровин',
        counterUnreadMessages: 0,
        avatar: null,
        updatedAt: '2021-05-23T10:21:07.563Z'
      }
    ],
    messages: [
      {
        id: '1',
        owner: 'Сергей Мухин',
        text: 'Привет! Не ожидал тебя тут увидеть',
        avatar: null,
        date: '2021-05-24T15:18:02.563Z'
      },
      {
        id: '2',
        owner: 'Денис Колбасов',
        text: 'Привет! А ты кто хоть?',
        avatar: null,
        date: '2021-05-24T15:18:02.563Z'
      },
      {
        id: '3',
        owner: 'Сергей Мухин',
        text: 'Ты только не пугайся того что я скажу',
        avatar: null,
        date: '2021-05-24T15:18:02.563Z'
      },
      {
        id: '4',
        owner: 'Сергей Мухин',
        text: 'На самом деле я тебя создал несколько дней назад, что сдать первый спринт в Яндекс.Практикум. Это такие курсы, их там много, а я на Веб-разработчика кстати',
        avatar: null,
        date: '2021-05-27T15:18:02.563Z'
      },
      {
        id: '5',
        owner: 'Денис Колбасов',
        text: 'Что за бред? 😂',
        avatar: null,
        date: '2021-05-28T15:18:02.563Z'
      }
    ]
  }

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
        <Button onClick="{{ handleCreateClick }}">Новый чат</Button>
        <Button onClick="{{ handleOptionsClick }}">Настройки</Button>
      </div>
    </aside>
  `

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
    </Main>
  `

  return /*html*/ `
    <div class="{{ className }}">
      ${sidePanelTemplate}
      ${chatWindowTemplate}
    </div>
  `
}

const html = new Templator().compile(ChatPage);
const pageElement = getElementFromString(html)
const root = document.body;
root.append(pageElement);
