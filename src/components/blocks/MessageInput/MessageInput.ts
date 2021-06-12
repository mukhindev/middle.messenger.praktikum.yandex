import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './MessageInput.tmpl';
import BemHandler from '../../../utils/BemHandler';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import DropDownMenu from '../../ui/DropDownMenu/DropDownMenu';
import attachmentIcon from '../../../assets/images/attachment.svg';
import pictureIcon from '../../../assets/images/picture.svg';
import locationIcon from '../../../assets/images/location.svg';
import sendIcon from '../../../assets/images/send.svg';
import './MessageInput.scss';

const bem = new BemHandler('message-input');

interface IMessageInput {
  onMessageInput: (value: string) => void
  onMessageSend: () => void
  onAttachmentFile: () => void
  onAttachmentMedia: () => void
  onAttachmentLocation: () => void
}

class MessageInput extends Block {
  constructor(props: IMessageInput) {
    super('div', {
      className: bem.get(),
      AttachmentMenu: new DropDownMenu({
        classMix: bem.get('attachment-menu'),
        icon: attachmentIcon,
        title: 'Добавить вложение',
        style: {
          bottom: '32px',
          left: '0',
          'z-index': '1',
        },
        items: [
          {
            icon: attachmentIcon,
            label: 'Загрузить файл',
            onClick: props.onAttachmentFile,
          },
          {
            icon: pictureIcon,
            label: 'Загрузить фото или видео',
            onClick: props.onAttachmentMedia,
          },
          {
            icon: locationIcon,
            label: 'Поделиться локацией',
            onClick: props.onAttachmentLocation,
          },
        ],
        isOpen: false,
      }),
      MessageInput: new Input({
        placeholder: 'Новое сообщение',
        classMix: bem.get('input'),
        onInput: props.onMessageInput,
      }),
      SendButton: new Button({
        title: 'Отправить сообщение',
        icon: sendIcon,
        light: true,
        onClick: props.onMessageSend,
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default MessageInput;
