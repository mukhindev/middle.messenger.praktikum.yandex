import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Toast.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Toast.scss';

const bem = new BemHandler('toast');

interface IToast {
  message?: string,
  color?: 'success' | 'primary' | 'error'
}

class Toast extends Block {
  constructor(props?: IToast) {
    super('div', {
      className: bem.get(''),
      message: props?.message ?? 'Неизвестная ошибка',
      color: props?.color ?? 'primary',
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Toast;
