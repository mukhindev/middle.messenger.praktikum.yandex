import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Button.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Button.scss';

const bem = new BemHandler('button');

interface IButton {
  label: string
  classMix?: string
}

class Button extends Block {
  constructor(props: IButton) {
    super('button', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      label: props.label ?? 'Моя кнопка',
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Button;
