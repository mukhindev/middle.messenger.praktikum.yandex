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
  owner: string,
  text: string,
  avatar: string | null,
  date: string,
}

class Message extends Block {
  constructor(props: IMessage) {
    super('div', {
      className: bem.get(),
      classNameRoot: bem.get('', { 'outgoing-message': props.owner === 'Сергей Мухин' }),
      classNameDate: bem.get('date', { 'outgoing-message': props.owner === 'Сергей Мухин' }),
      id: props.id,
      owner: props.owner,
      text: props.text,
      avatar: props.avatar ?? defaultAvatar,
      date: formatDate(props.date),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Message;
