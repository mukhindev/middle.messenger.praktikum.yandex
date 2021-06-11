import Block from '../../classes/Block';
import ContactCardList from '../../components/blocks/ContactCardList/ContactCardList';
import { compile } from '../../utils/templator';
import BemHandler from '../../utils/BemHandler';
import '../../assets/styles/global.scss';
import './ChatPage.scss';

const bem = new BemHandler('chat-page');

const template = `
  <template class="{{ className }}">
    <aside class="{{ className }}__side-panel">
      <ContactCardList />
    </aside>
    <main class="{{ className }}__main">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </main>
  </template>
`;

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
