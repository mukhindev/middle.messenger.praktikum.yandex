import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Input.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Input.scss';

const bem = new BemHandler('input');

interface IInput {
  label?: string
  placeholder?: string
  name?: string
  type?: string
  classMix?: string
  onInput: (value: string) => void
}

class Input extends Block {
  constructor(props: IInput) {
    super('label', {
      className: bem.get(),
      classNameWithMix: bem.get('', '', props.classMix),
      label: props.label ?? '',
      placeholder: props.placeholder ?? props.label ?? '',
      type: props.type ?? 'text',
      events: {
        input: (evt: InputEvent) => {
          props.onInput((evt.target as HTMLInputElement).value);
        },
      },
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Input;
