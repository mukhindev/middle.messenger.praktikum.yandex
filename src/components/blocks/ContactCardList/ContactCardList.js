import ContactCard from '../ContactCard/ContactCard';
import join from '../../../utils/join';
import './ContactCardList.scss';

function ContactCardList({ contacts, parentBlock, mix }) {
  ContactCardList.context = {
    className: 'contact-card-list',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    ContactCard,
    contacts,
  };

  window.selectChat = function () {
    const chatWindowElement = document.querySelector('.chat-page__main');
    const unselectedChatWindowElement = document.querySelector('.chat-page__unselected-сhat-window');
    chatWindowElement.style.display = 'flex';
    unselectedChatWindowElement.style.display = 'none';
  };

  return `
    <ul class="{{ className }}{{ mixClassName }}">
      ${join(contacts.map((_, index) => `
        <li class="{{ className }}__item" onclick="window.selectChat()">
          <ContactCard contacts="{{ contacts }}" index="${index}" />
        </li>
      `))}
    </ul>
  `;
}

export default ContactCardList;
