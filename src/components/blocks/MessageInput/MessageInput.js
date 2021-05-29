import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import attachmentIcon from '../../../assets/images/attachment.svg';
import sendIcon from '../../../assets/images/send.svg';
import './MessageInput.scss';

function MessageInput({ onAttachFile, onMessageInput, onSend }) {
  MessageInput.context = {
    className: 'message-input',
    Input,
    Button,
    attachmentIcon,
    sendIcon,
    onAttachFile,
    onMessageInput,
    onSend,
  };

  // TODO: Сделать автоматически расширяемое по высоте поле для сообщения
  return `
    <div class="{{ className }}">
      <Button
        title="Прикрепить файл"
        icon="{{ attachmentIcon }}"
        light="{{ true }}"
        onClick="{{ onAttachFile }}"
      />
      <Input
        parentBlock="{{ className }}"
        mix="input"
        onInput="{{ onMessageInput }}"
        placeholder="Новое сообщение"
      />
      <Button
        title="Отправить сообщение"
        icon="{{ sendIcon }}"
        light="{{ true }}"
        onClick="{{ onSend }}"
      />
    </div>
  `;
}

export default MessageInput;
