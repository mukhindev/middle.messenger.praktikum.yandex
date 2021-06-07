import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import './Button.scss';

const template = `
  <button class="{{ className }}">{{ label }}</button>
`;

export default class Button extends Block {
  constructor(props) {
    super('div', {
      className: 'button',
      label: 'Моя кнопка',
      ...props,
    });

    // this.counter = 1;
    //
    // const interval = setInterval(() => {
    //   if (this.counter >= 5) {
    //     clearInterval(interval);
    //   }
    //   this.props.label = `Моя кнопка ${this.counter}`;
    //   this.counter += 1;
    // }, 1000);
  }

  render() {
    return compile(template, this.props);
  }
}

// document.body.prepend(new Button().getContent());
