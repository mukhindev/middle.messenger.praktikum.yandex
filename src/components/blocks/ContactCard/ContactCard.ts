import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ContactCard.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import formatDate from '../../../utils/formatDate';
import './ContactCard.scss';

const bem = new BemHandler('contact-card');

interface IContactCard {
  id: string,
  updatedAt: string,
  avatar: string | null,
  name: string,
  isGroup: boolean,
  lastMessage: string,
  ownerLastMessage: string,
  counterUnreadMessages: number
}

class ContactCard extends Block {
  constructor(props: IContactCard) {
    super('div', {
      className: bem.get(),
      avatar: props.avatar ?? defaultAvatar,
      name: props.name,
      isGroup: props.isGroup,
      lastMessage: props.lastMessage,
      updatedAt: formatDate(props.updatedAt),
      id: props.id,
      ownerLastMessage: props.ownerLastMessage,
      counterUnreadMessages: props.counterUnreadMessages,
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ContactCard;
