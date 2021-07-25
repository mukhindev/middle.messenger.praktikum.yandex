import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Link.tmpl';
import BemHandler from '../../../utils/BemHandler';
import { router } from '../../../router';

const bem = new BemHandler('link');

interface ILink {
  className?: string
  to: string
  target?: string
  onClick?: () => void
}

class Link extends Block {
  constructor(props: ILink) {
    super('a', {
      className: bem.get('', '', props.className),
      target: props.target ?? '',
      to: props.to,
      events: {
        click: (evt: MouseEvent) => {
          if (this.props.target === '_blank') {
            return;
          }
          evt.preventDefault();
          router.go(this.props.to);
        },
      },
    });

    if (router.getLocationPathname() === this.props.to) {
      this.props.className = bem.get('', { active: true }, this.props.className);
    }
  }

  render() {
    return compile(template, this.props);
  }
}

export default Link;
