import ContactCard from "../ContactCard/ContactCard.js";
import './ContactCardList.scss'

function ContactCardList ({ contacts, parentBlock, mix }) {
  ContactCardList.context = {
    className: 'contact-card-list',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    ContactCard,
    contacts,
  }

  return `
    <ul class="{{ className }}{{ mixClassName }}">
      ${contacts.map((_, index) => (
        `
          <li class="{{ className }}__item">
            <ContactCard contacts="{{ contacts }}" index="${index}" />
          </li>
        `
      )).join('')}
    </ul>
  `
}

export default ContactCardList;
