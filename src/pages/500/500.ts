import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './500.tmpl';
import ErrorInfo from '../../components/blocks/ErrorInfo/ErrorInfo';
import BemHandler from '../../utils/BemHandler';
import './500.scss';

const bem = new BemHandler('error-500-page');

class Error500Page extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      ErrorInfo: new ErrorInfo({
        statusCode: '500',
        message: 'Что-то произошло на сервере попробуйте позже',
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Error500Page;
