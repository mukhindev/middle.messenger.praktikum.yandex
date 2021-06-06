import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import DropDownList from '../../ui/DropDownMenu/DropDownList';
import attachmentIcon from '../../../assets/images/attachment.svg';
import sendIcon from '../../../assets/images/send.svg';
import './MessageInput.scss';

function MessageInput(props) {
  const {
    onAttachmentMenu,
    onMessageInput,
    onSend,
    attachmentMenu,
    onSelectItem,
  } = props;

  MessageInput.context = {
    className: 'message-input',
    Input,
    Button,
    DropDownList,
    attachmentIcon,
    sendIcon,
    onAttachmentMenu,
    onMessageInput,
    onSend,
    attachmentMenu,
    onSelectItem,
  };

  // TODO: Сделать автоматически расширяемое по высоте поле для сообщения
  return `
    <div class="{{ className }}">
      <Button
        title="Прикрепить файл"
        icon="{{ attachmentIcon }}"
        light="{{ true }}"
        onClick="{{ onAttachmentMenu }}"
      />
      <DropDownList
        parentBlock="{{ className }}"
        mix="attachment-menu"
        menu="{{ attachmentMenu }}"
        onSelectItem="{{ onSelectItem }}"
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
