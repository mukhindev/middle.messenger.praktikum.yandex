import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ChatCard.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
// import formatDate from '../../../utils/formatDate';
import { store } from '../../../store';
import './ChatCard.scss';
import formatDate from '../../../utils/formatDate';

const bem = new BemHandler('chat-card');

interface IChatCard {
  id: number
  created_by: number
  title: string
  avatar: string | null
  last_message: string | null
  unread_count: number
  onClick: (chatId: number) => void
}

class ChatCard extends Block {
  constructor(props: IChatCard) {
    super('li', {
      className: bem.get(),
      classNameRoot: bem.get('', { active: props.id === store.state.chatId }),
      id: props.id,
      created_by: props.created_by,
      title: props.title,
      avatar: props.avatar ?? defaultAvatar,
      last_message: props.last_message ? JSON.parse(props.last_message) : null,
      unread_count: props.unread_count,
      onClick: props.onClick,
      events: {
        click: () => this.props.onClick(this.props.id),
      },
    });
  }

  render() {
    return compile(template, {
      ...this.props,
      time: this.props.last_message?.time || null,
      formattedTime: formatDate(this.props.last_message?.time || null),
    });
  }
}

export default ChatCard;
