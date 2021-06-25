import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './404.tmpl';
import ErrorInfo from '../../components/blocks/ErrorInfo/ErrorInfo';
import BemHandler from '../../utils/BemHandler';
import './404.scss';

const bem = new BemHandler('error-404-page');

class Error404Page extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      ErrorInfo: new ErrorInfo({
        statusCode: '404',
        message: 'Такой страницы нет',
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Error404Page;
