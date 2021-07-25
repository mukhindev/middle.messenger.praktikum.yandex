import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './ErrorInfo.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './ErrorInfo.scss';

const bem = new BemHandler('error-info');

interface IErrorInfo {
  statusCode: string | number,
  message: string,
  returnLink?: string,
  returnLinkText?: string,
}

class ErrorInfo extends Block {
  constructor(props: IErrorInfo) {
    super('div', {
      className: bem.get(),
      statusCode: props.statusCode ?? '500',
      message: props.message ?? 'Неизвестная ошибка',
      returnLink: props.returnLink || '/',
      returnLinkText: props.returnLinkText || 'Вернуться к чатам',
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default ErrorInfo;
