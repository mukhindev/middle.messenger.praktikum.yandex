import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Links.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Links.scss';

const bem = new BemHandler('links');

interface ILinks {
  items: {
    name: string,
    to: string,
  }[]
}

class Links extends Block {
  constructor(props: ILinks) {
    super('ul', {
      className: bem.get(),
      items: props.items ?? [],
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default Links;
