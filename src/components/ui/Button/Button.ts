import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import BemHandler from '../../../utils/BemHandler';
import './Button.scss';

const bem = new BemHandler('button');

const template = `
  <template class="{{ className }}">
    {{ label }}
  </template>
`;

interface IButton {
  label: string
}

class Button extends Block {
  constructor(props: IButton) {
    super('button', {
      className: bem.get(),
      label: props.label ?? 'Моя кнопка'
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Button;
