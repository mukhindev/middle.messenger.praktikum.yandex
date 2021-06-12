import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ChatHeader.tmpl';
import BemHandler from '../../../utils/BemHandler';
import DropDownMenu from '../../ui/DropDownMenu/DropDownMenu';
import moreIcon from '../../../assets/images/more.svg';
import addContactIcon from '../../../assets/images/add-contact.svg';
import trashIcon from '../../../assets/images/trash.svg';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import './ChatHeader.scss';

const bem = new BemHandler('chat-header');

interface IChatHeader {
  avatar?: string | null
  onAddContact: () => void
  onRemoveContact: () => void
}

class ChatHeader extends Block {
  constructor(props: IChatHeader) {
    super('div', {
      className: bem.get(),
      avatar: props.avatar ?? defaultAvatar,
      name: 'Денис Колбасов',
      ContactMenu: new DropDownMenu({
        classMix: bem.get('more-menu'),
        icon: moreIcon,
        title: 'Управление пользователями',
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
            icon: trashIcon,
            label: 'Удалить пользователя',
            onClick: props.onRemoveContact,
          },
        ],
        isOpen: false,
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ChatHeader;
