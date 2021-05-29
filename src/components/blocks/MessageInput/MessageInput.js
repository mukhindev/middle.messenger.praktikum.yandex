import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import attachmentIcon from '../../../assets/images/attachment.svg';
import sendIcon from '../../../assets/images/send.svg';

function MessageInput() {
  MessageInput.context = {
    Input,
    Button,
    attachmentIcon,
    sendIcon,
  };

  return `
    MessageInput!
  `;
}

export default MessageInput;
