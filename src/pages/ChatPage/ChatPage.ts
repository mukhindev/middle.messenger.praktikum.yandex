import Block from '../../classes/Block';
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList';
import Input from '../../components/ui/Input/Input';
import { compile } from '../../utils/templator';
import { template } from './ChatPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import '../../assets/styles/global.scss';
import './ChatPage.scss';

const bem = new BemHandler('chat-page');

class ChatPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      Input: new Input({
        label: 'Поиск',
        onInput: (value) => console.log('Поле поиска:', value),
      }),
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
