import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ChatCard.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
// import formatDate from '../../../utils/formatDate';
import './ChatCard.scss';

const bem = new BemHandler('chat-card');

interface IChatCard {
  id: number
  created_by: number
  title: string
  avatar: string | null
  last_message: {} | null
  unread_count: number
}

class ChatCard extends Block {
  constructor(props: IChatCard) {
    super('li', {
      className: bem.get(),
      id: props.id,
      created_by: props.created_by,
      title: props.title,
      avatar: props.avatar ?? defaultAvatar,
      last_message: props.last_message,
      unread_count: props.unread_count,
      // TODO: Последнее сообщение
      // updatedAt: props.updatedAt,
      // formattedUpdatedAt: formatDate(props.updatedAt),
      // ownerLastMessage: props.ownerLastMessage,
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ChatCard;
