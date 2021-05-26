import MessageCard from "../MessageCard/MessageCard.js";
import './MessageCardList.scss'

function MessageCardList ({ messageCards }) {
  MessageCardList.context = {
    className: 'message-card-list',
    MessageCard,
    messageCards,
  }

  return /*html*/ `
    <ul class="{{ className }}">
      ${messageCards.map((_, index) => (
        `
          <li class="{{ className }}__item">
            <MessageCard messageCards="{{ messageCards }}" index="${index}" />
          </li>
        `
      )).join('')}
    </ul>
  `
}

export default MessageCardList;
