import Message from "../Message/Message.js";
import './MessageList.scss'

function MessageList ({ messages, parentBlock, mix }) {
  MessageList.context = {
    className: 'message-list',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    Message,
    messages,
  }

  return `
    <ul class="{{ className }}{{ mixClassName }}">
      ${messages.map((_, index) => (
        `
          <li class="{{ className }}__item">
            <Message messages="{{ messages }}" index="${index}" />
          </li>
        `
      )).join('')}
    </ul>
  `
}

export default MessageList;
