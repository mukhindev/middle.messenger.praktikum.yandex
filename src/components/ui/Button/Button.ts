import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Button.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Button.scss';

const bem = new BemHandler('button');

interface IButton {
  classMix?: string
  type?: string
  icon?: string
  light?: boolean
  color?: string
  label?: string
  title?: string
  onClick?: () => void
}

class Button extends Block {
  constructor(props: IButton) {
    super('button', {
      className: bem.get(),
      classNameWithMix: bem.get('', { light: !!props.light, color: props.color }, props.classMix),
      type: props.type ?? 'button',
      icon: props.icon ?? '',
      light: props.light ?? false,
      color: props.color ?? '',
      label: props.label ?? '',
      title: props.title ?? '',
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Button;
