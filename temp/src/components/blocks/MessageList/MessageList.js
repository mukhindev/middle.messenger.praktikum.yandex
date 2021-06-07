import Message from '../Message/Message';
import join from '../../../utils/join';
import './MessageList.scss';

function MessageList({ messages, parentBlock, mix }) {
  MessageList.context = {
    className: 'message-list',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    Message,
    messages,
  };

  return `
    <ul class="{{ className }}{{ mixClassName }}">
      ${join(messages.map((_, index) => `
        <li class="{{ className }}__item">
          <Message messages="{{ messages }}" index="${index}" />
        </li>
      `))}
    </ul>
  `;
}

export default MessageList;
