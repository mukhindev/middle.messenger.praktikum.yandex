import './Message.scss'
import defaultAvatar from '../../../assets/images/default-avatar.png'
import formatDate from '../../../utils/formatDate.js'

function Message ({ messages, index }) {
  Message.context = {
    className: 'message',
    message: messages[index],
    avatar: messages[index].avatar ?? defaultAvatar,
    date: formatDate(messages[index].date)
  }

  const OutgoingMessageTemplate = `
    <div class="{{ className }} {{ className }}_outgoing-message">
      <img
        class="{{ className }}__avatar"
        src="{{ avatar }}"
        alt="Аватар пользователя {{ message.name }}"
      />
      <p class="{{ className }}__text">
        {{ message.text }}
        <span class="{{ className }}__date {{ className }}__date_outgoing-message" >{{ date }}</span>
      </p>
    </div>
  `

  const IncomingMessageTemplate = `
    <div class="{{ className }}">
      <img
        class="{{ className }}__avatar"
        src="{{ avatar }}"
        alt="Аватар пользователя {{ message.name }}"
      />
      <p class="{{ className }}__text">
        {{ message.text }}
        <span class="{{ className }}__date">{{ date }}</span>
      </p>
    </div>
  `

  const messageTempale = messages[index].owner === 'Сергей Мухин'
    ? OutgoingMessageTemplate
    : IncomingMessageTemplate

  return `
    ${messageTempale}
  `
}

export default Message;
