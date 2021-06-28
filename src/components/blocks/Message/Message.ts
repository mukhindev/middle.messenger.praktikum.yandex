import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Message.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import formatDate from '../../../utils/formatDate';
import './Message.scss';

const bem = new BemHandler('message');

interface IMessage {
  id: string,
  ownerId: string,
  authorId: string,
  authorName: string,
  text: string,
  avatar: string | null,
  date: string,
}

class Message extends Block {
  constructor(props: IMessage) {
    super('li', {
      className: bem.get(),
      classNameRoot: bem.get('', { 'outgoing-message': props.authorId === props.ownerId }),
      classNameDate: bem.get('date', { 'outgoing-message': props.authorId === props.ownerId }),
      id: props.id,
      ownerId: props.ownerId,
      authorId: props.authorId,
      authorName: props.authorName,
      text: props.text,
      avatar: props.avatar ?? defaultAvatar,
      date: props.date,
      formattedDate: formatDate(props.date),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Message;
