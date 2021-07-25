import Block from '../../../classes/Block';
import Message from '../Message/Message';
import { compile } from '../../../utils/templator';
import { template } from './MessageList.tmpl';
import BemHandler from '../../../utils/BemHandler';
import debounce from '../../../utils/debounce';
import './MessageList.scss';

const bem = new BemHandler('message-list');

interface IMessageList {
  classMix: string
  messages: any[]
  onEndList?: (length: number) => void
}

class MessageList extends Block {
  handleScrollWithDebounce: (evt: Event) => void;

  constructor(props: IMessageList) {
    super('ul', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      messages: props.messages,
      Message,
      onEndList: props.onEndList,
      events: {
        scroll: (evt: Event) => this.handleScrollWithDebounce(evt),
      },
    });

    this.handleScrollWithDebounce = debounce.call(this, this.handleScroll, 500);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(evt: Event) {
    const list = evt.target as HTMLUListElement;
    if (list) {
      const isEndList = list.scrollTop <= -(list.scrollHeight - list.offsetHeight);
      if (isEndList && this.props?.onEndList) {
        this.props.onEndList(this.props.messages.length);
      }
    }
  }

  public scrollToLastMessage() {
    const list = this.getContent();
    list.scrollTo({
      top: list.scrollHeight,
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default MessageList;
