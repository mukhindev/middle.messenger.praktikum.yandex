import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ChatCard.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import { store } from '../../../store';
import './ChatCard.scss';
import formatDate from '../../../utils/formatDate';

const bem = new BemHandler('chat-card');

interface IChatCard {
  id: number
  createdBy: number
  title: string
  avatar: string | null
  lastMessage: string | null
  unreadCount: number
  onClick: (chatId: number) => void
}

class ChatCard extends Block {
  constructor(props: IChatCard) {
    super('li', {
      className: bem.get(),
      classNameRoot: bem.get('', { active: props.id === store.state.chatId }),
      id: props.id,
      createdBy: props.createdBy,
      title: props.title,
      avatar: props.avatar ?? defaultAvatar,
      lastMessage: props.lastMessage ? props.lastMessage : null,
      unreadCount: props.unreadCount,
      onClick: props.onClick,
      events: {
        click: () => this.props.onClick(this.props.id),
      },
    });
  }

  render() {
    return compile(template, {
      ...this.props,
      time: this.props.lastMessage?.time || null,
      formattedTime: formatDate(this.props.lastMessage?.time || null),
    });
  }
}

export default ChatCard;
