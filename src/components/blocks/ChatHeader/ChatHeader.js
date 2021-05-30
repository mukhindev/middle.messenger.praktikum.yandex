import './ChatHeader.scss';
import Button from '../../ui/Button/Button';
import DropDownList from '../../ui/DropDownMenu/DropDownList';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import moreIcon from '../../../assets/images/more.svg';

function ChatHeader(props) {
  const {
    avatar,
    name,
    onMoreMenu,
    onAddContact,
    onDeleteContact,
    moreMenu,
    onSelectItem,
  } = props;

  ChatHeader.context = {
    className: 'chat-header',
    avatar: avatar ?? defaultAvatar,
    name,
    Button,
    DropDownList,
    onAddContact,
    onDeleteContact,
    onMoreMenu,
    moreIcon,
    moreMenu,
    onSelectItem,
  };

  return `
    <div class="{{ className }}">
      <img
        class="{{ className }}__avatar"
        src="{{ avatar }}"
        alt="Аватар пользователя {{ avatar }}"
      />
      <p class="{{ className }}__name">{{ name }}</p>
      <Button
        title="Управление пользователями"
        icon="{{ moreIcon }}"
        light="{{ true }}"
        onClick="{{ onMoreMenu }}"
      />
      <DropDownList
        parentBlock="{{ className }}"
        mix="more-menu"
        menu="{{ moreMenu }}"
        onSelectItem="{{ onSelectItem }}"
      />
    </div>
  `;
}

export default ChatHeader;
