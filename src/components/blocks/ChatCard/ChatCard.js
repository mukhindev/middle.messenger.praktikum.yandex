import './ChatCard.scss'
import defaultAvatar from '../../../assets/images/default-avatar.png'

function ChatCard ({ messageCards, index }) {
  ChatCard.context = {
    className: 'chat-card',
    messageCard: messageCards[index],
    avatar: messageCards[index].avatar ?? defaultAvatar,
    updatedAt: messageCards[index].updatedAt
  }

  const groupMarkerElement = messageCards[index].isGroup
    ? '<div class="{{ className }}__group-marker"></div>'
    : ''

  const counterUnreadMessagesElement = messageCards[index].counterUnreadMessages
    ? `<span class="{{ className }}__counter-unread-messages">
          {{ messageCard.counterUnreadMessages }}
      </span>`
    : ''

  return /*html*/ `
    <div class="{{ className }}">
      <img
        class="{{ className }}__avatar"
        src="{{ avatar }}"
        alt="Аватар пользователя {{ messageCard.name }}"
      />
      <div class="{{ className }}__name-wrapper">
        ${groupMarkerElement}
        <p class="{{ className }}__name">{{ messageCard.name }}</p>
      </div>
      <p class="{{ className }}__last-message">{{ messageCard.lastMessage }}</p>
      ${counterUnreadMessagesElement}
      <span class="{{ className }}__updated-at">{{ updatedAt }}</span>
    </div>
  `
}

export default ChatCard;
