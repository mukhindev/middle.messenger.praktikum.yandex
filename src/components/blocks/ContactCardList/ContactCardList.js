import ContactCard from "../ContactCard/ContactCard.js";
import './ContactCardList.scss'

function ContactCardList ({ contacts }) {
  ContactCardList.context = {
    className: 'contact-card-list',
    ContactCard,
    contacts,
  }

  return /*html*/ `
    <ul class="{{ className }}">
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
