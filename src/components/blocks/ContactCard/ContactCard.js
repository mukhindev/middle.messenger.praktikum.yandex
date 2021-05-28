import './ContactCard.scss'
import defaultAvatar from '../../../assets/images/default-avatar.png'
import formatDate from '../../../utils/formatDate.js'

function ContactCard ({ contacts, index }) {
  ContactCard.context = {
    className: 'contact-card',
    contact: contacts[index],
    avatar: contacts[index].avatar ?? defaultAvatar,
    updatedAt: formatDate(contacts[index].updatedAt)
  }

  const groupMarkerTemplate = contacts[index].isGroup
    ? '<div class="{{ className }}__group-marker"></div>'
    : ''

  const counterUnreadMessagesTemplate = contacts[index].counterUnreadMessages
    ? `<span class="{{ className }}__counter-unread-messages">
        {{ contact.counterUnreadMessages }}
      </span>`
    : ''

  return /*html*/ `
    <div class="{{ className }}">
      <img
        class="{{ className }}__avatar"
        src="{{ avatar }}"
        alt="Аватар пользователя {{ contact.name }}"
      />
      <div class="{{ className }}__name-wrapper">
        ${groupMarkerTemplate}
        <p class="{{ className }}__name">{{ contact.name }}</p>
      </div>
      <p class="{{ className }}__last-message">{{ contact.lastMessage }}</p>
      ${counterUnreadMessagesTemplate}
      <span class="{{ className }}__updated-at">{{ updatedAt }}</span>
    </div>
  `
}

export default ContactCard;
