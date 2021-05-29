import './ChatHeader.scss';
import Button from '../../ui/Button/Button';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import moreIcon from '../../../assets/images/more.svg';

function ChatHeader(props) {
  const {
    avatar,
    name,
    onAddContact,
    onDeleteContact,
  } = props;

  ChatHeader.context = {
    className: 'chat-header',
    avatar: avatar ?? defaultAvatar,
    name,
    Button,
    onAddContact,
    onDeleteContact,
    onClickMore: () => console.log('Нажали открыть меню'),
    moreIcon,
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
        title="Отправить сообщение"
        icon="{{ moreIcon }}"
        light="{{ true }}"
        onClick="{{ onClickMore }}"
      />
    </div>
  `;
}

export default ChatHeader;
