import Block from '../../../classes/Block';
import ContactCard from '../ContactCard/ContactCard';
import { compile } from '../../../utils/templator';
import BemHandler from '../../../utils/BemHandler';
import { contacts } from '../../../utils/mockData';
import './ContactCardList.scss';

const bem = new BemHandler('contact-card-list');

const template = (props) => `
  <template class="{{ classNameWithMix }}">
    ${props.ContactCard.map((_, index: number) => (`
      <li class="{{ className }}__item">
        <ContactCard key="${index}" />
      </li>
    `)).join('')}
  </template>
`;

interface IContactCardList {
  classMix: string
}

class ContactCardList extends Block {
  constructor(props: IContactCardList) {
    super('ul', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      ContactCard: contacts.map((contact) => new ContactCard(contact)),
    });
  }

  render() {
    return compile(template(this.props), this.props);
  }
}

export default ContactCardList;
