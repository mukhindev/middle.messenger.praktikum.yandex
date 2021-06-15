import Block from '../../../classes/Block';
import ContactCard from '../ContactCard/ContactCard';
import { compile } from '../../../utils/templator';
import { template } from './ContactCardList.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './ContactCardList.scss';

const bem = new BemHandler('contact-card-list');

interface IContactCardList {
  classMix: string
  contacts: any[]
}

class ContactCardList extends Block {
  constructor(props: IContactCardList) {
    super('ul', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      ContactCard: props.contacts.map((contact) => new ContactCard(contact)),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ContactCardList;
