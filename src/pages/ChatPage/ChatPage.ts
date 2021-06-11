import Block from '../../classes/Block';
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList';
import { compile } from '../../utils/templator';
import { template } from "./ChatPage.tmpl";
import BemHandler from '../../utils/BemHandler';
import '../../assets/styles/global.scss';
import './ChatPage.scss';

const bem = new BemHandler('chat-page');

class ChatPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      ContactCardList: new ContactCardList({
        classMix: bem.get('contact-card-list'),
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

document.body.prepend(new ChatPage().getContent());
