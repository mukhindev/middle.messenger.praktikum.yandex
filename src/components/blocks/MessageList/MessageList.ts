import Block from '../../../classes/Block';
import Message from '../Message/Message';
import { compile } from '../../../utils/templator';
import { template } from './MessageList.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './MessageList.scss';

const bem = new BemHandler('message-list');

interface IMessageList {
  classMix: string
  messages: any[]
}

class MessageList extends Block {
  constructor(props: IMessageList) {
    super('ul', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      messages: props.messages,
      Message,
    });
  }

  render() {
    const list = this.getContent();
    setTimeout(() => {
      list.scrollTo({
        top: list.scrollHeight,
      });
    }, 0);
    return compile(template, this.props);
  }
}

export default MessageList;
