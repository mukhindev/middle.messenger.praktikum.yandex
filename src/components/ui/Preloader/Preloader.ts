import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Preloader.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Preloader.scss';

const bem = new BemHandler('preloader');

class Preloader extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Preloader;
