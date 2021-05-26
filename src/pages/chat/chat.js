import Templator from '../../utils/Templator.js';
import getElementFromString from "../../utils/getElementFromString";
import Main from '../../components/layouts/Main/Main.js'
import MessageCardList from  '../../components/blocks/MessageCardList/MessageCardList.js'
import '../../assets/styles/global.scss';
import './chat.scss';

function ChatPage () {
  ChatPage.context = {
    className: 'chat-page',
    Main,
    MessageCardList,
    messageCards: [
      {
        id: '1',
        name: 'Стас Басов',
        isGroup: false,
        lastMessage: 'Привет! Ты куда пропал-то?',
        ownerLastMessage: 'Стас Басов',
        counterUnreadMessages: 1,
        avatar: null,
        updatedAt: '2021-05-26T19:18:15.563Z'
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
    ]
  }

  return /*html*/ `
    <div class="{{ className }}">
      <Main>
        <MessageCardList messageCards="{{ messageCards }}" />
      </Main>
    </div>
  `
}

const html = new Templator().compile(ChatPage);
const pageElement = getElementFromString(html)
const root = document.body;
root.append(pageElement);
