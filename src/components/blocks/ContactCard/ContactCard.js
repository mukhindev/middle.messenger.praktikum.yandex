import './ContactCard.scss'
import defaultAvatar from '../../../assets/images/default-avatar.png'
import formatDate from '../../../utils/formatDate.js'

function ContactCard ({ contacts, index }) {
  ContactCard.context = {
    className: 'contact-card',
    messageCard: contacts[index],
    avatar: contacts[index].avatar ?? defaultAvatar,
    updatedAt: formatDate(contacts[index].updatedAt)
  }

  const groupMarkerElement = contacts[index].isGroup
    ? '<div class="{{ className }}__group-marker"></div>'
    : ''

  const counterUnreadMessagesElement = contacts[index].counterUnreadMessages
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

export default ContactCard;
