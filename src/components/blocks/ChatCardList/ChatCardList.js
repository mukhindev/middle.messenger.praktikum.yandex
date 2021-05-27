import ChatCard from "../ChatCard/ChatCard.js";
import './ChatCardList.scss'

function ChatCardList ({ messageCards }) {
  ChatCardList.context = {
    className: 'chat-card-list',
    ChatCard,
    messageCards,
  }

  return /*html*/ `
    <ul class="{{ className }}">
      ${messageCards.map((_, index) => (
        `
          <li class="{{ className }}__item">
            <ChatCard messageCards="{{ messageCards }}" index="${index}" />
          </li>
        `
      )).join('')}
    </ul>
  `
}

export default ChatCardList;
