import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Message.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import formatDate from '../../../utils/formatDate';
import { store } from '../../../store';
import './Message.scss';

const bem = new BemHandler('message');

interface IMessage {
  id: number,
  chat_id: number
  user_id: number
  type: string
  content: string
  file: string | null
  is_read: boolean
  time: string
}

class Message extends Block {
  constructor(props: IMessage) {
    super('li', {
      className: bem.get(),
      classNameRoot: bem.get('', { 'outgoing-message': props.user_id === store.state.currentUser.id }),
      classNameDate: bem.get('date', { 'outgoing-message': props.user_id === store.state.currentUser.id }),
      id: props.id,
      chat_id: props.chat_id,
      user_id: props.user_id,
      type: props.type,
      content: props.content,
      file: props.file,
      time: props.time,
      avatar: defaultAvatar,
      formattedTime: formatDate(props.time),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Message;
