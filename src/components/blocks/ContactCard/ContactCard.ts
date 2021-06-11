import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import formatDate from '../../../utils/formatDate';
import './ContactCard.scss';

const bem = new BemHandler('contact-card');

const template = (props) =>`
  <template class="{{ className }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ name }}"
    />
    <div class="{{ className }}__name-wrapper">
      ${props.isGroup ? '<div class="{{ className }}__group-marker"></div>' : '' }
      <p class="{{ className }}__name">{{ name }}</p>
    </div>
    <p class="{{ className }}__last-message">{{ lastMessage }}</p>
    ${props.counterUnreadMessages
      ? `<span class="{{ className }}__counter-unread-messages">
          {{ counterUnreadMessages }}
        </span>`
      : ''
    }
    <span class="{{ className }}__updated-at">{{ updatedAt }}</span>
  </template>
`;

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
    return compile(template(this.props), this.props);
  }
}

export default ContactCard;
