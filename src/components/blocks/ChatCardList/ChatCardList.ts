import Block from '../../../classes/Block';
import ChatCard from '../ChatCard/ChatCard';
import { compile } from '../../../utils/templator';
import { template } from './ChatCardList.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './ChatCardList.scss';

const bem = new BemHandler('chat-card-list');

interface IChatCardList {
  classMix: string
  chats: unknown[],
}

class ChatCardList extends Block {
  constructor(props: IChatCardList) {
    super('ul', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      chats: props.chats,
      ChatCard,
    });
  }

  render() {
    console.log('render ChatCardList', this.props.chats);
    return compile(template, this.props);
  }
}

export default ChatCardList;
