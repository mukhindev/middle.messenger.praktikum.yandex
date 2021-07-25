import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './MessageHeader.tmpl';
import BemHandler from '../../../utils/BemHandler';
import DropDownMenu from '../../ui/DropDownMenu/DropDownMenu';
import moreIcon from '../../../assets/images/more.svg';
import addContactIcon from '../../../assets/images/add-contact.svg';
import removeContactIcon from '../../../assets/images/remove-contact.svg';
import trashIcon from '../../../assets/images/trash.svg';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import './MessageHeader.scss';
import { store } from '../../../store';

const bem = new BemHandler('message-header');

interface IMessageHeader {
  avatar?: string | null
  onAddContact: () => void
  onRemoveContact: () => void
  onRemoveChat: () => void
}

class MessageHeader extends Block {
  constructor(props: IMessageHeader) {
    super('div', {
      className: bem.get(),
      avatar: props.avatar ?? defaultAvatar,
      name: '',
      ContactMenu: new DropDownMenu({
        classMix: bem.get('more-menu'),
        icon: moreIcon,
        title: 'Управление чатом',
        style: {
          top: '32px',
          right: '0',
          'z-index': '1',
        },
        items: [
          {
            icon: addContactIcon,
            label: 'Добавить пользователя',
            onClick: props.onAddContact,
          },
          {
            icon: removeContactIcon,
            label: 'Удалить пользователя',
            onClick: props.onRemoveContact,
          },
          {
            icon: trashIcon,
            label: 'Удалить чат',
            onClick: props.onRemoveChat,
          },
        ],
      }),
    });
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.props.name = state.chats.find((chat: any) => chat.id === state.chatId)?.title || 'Выберете или создайте чат';
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default MessageHeader;
