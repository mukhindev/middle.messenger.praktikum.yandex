import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import './Button.scss';

const template = `
  <template class="{{ className }}">
    {{ label }}
  </template>
`;

export default class Button extends Block {
  constructor(props) {
    super('div', {
      className: 'button',
      label: 'Моя кнопка',
      startCounter: 1,
      ...props,
    });

    this.counter = this.props.startCounter;

    const interval = setInterval(() => {
      if (this.counter >= 5) {
        clearInterval(interval);
      }
      this.props.label = `Моя кнопка ${this.counter}`;
      this.counter += 1;
    }, 1000);
  }

  render() {
    return compile(template, this.props);
  }
}

// document.body.prepend(new Button().getContent());
