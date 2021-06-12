import Block from '../../../classes/Block';
import Button from '../Button/Button';
import { compile } from '../../../utils/templator';
import { template } from './DropDownMenu.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './DropDownMenu.scss';

const bem = new BemHandler('drop-down-menu');

interface IDropDownMenu {
  classMix?: string
  isOpen: boolean
  items: any[]
  icon: string
  title: string
  style: Record<string, string>
}

class DropDownMenu extends Block {
  constructor(props: IDropDownMenu) {
    super('div', {
      className: bem.get(),
      classMix: props.classMix,
      classNameRoot: bem.get('', '', props.classMix),
      classNameMenu: bem.get('menu', { opened: props.isOpen }),
      style: props.style,
      isOpen: props.isOpen,
      MenuButton: new Button({
        title: 'Управление пользователями',
        icon: props.icon,
        light: true,
        onClick: () => {
          this.props.isOpen = true;
        },
      }),
      MenuItem: props.items.map((item) => new Button({
        ...item,
        light: true,
        onClick: () => {
          item.onClick();
          this.props.isOpen = false;
        },
      })),
    });

    this.handleOverlay = this.handleOverlay.bind(this);
  }

  handleOverlay(evt: MouseEvent) {
    if (!(evt.target as HTMLElement).closest(`.${bem.get('menu')}`)) {
      this.props.isOpen = false;
      document.removeEventListener('mousedown', this.handleOverlay);
    }
  }

  render() {
    if (this.props.isOpen === true) {
      document.addEventListener('mousedown', this.handleOverlay);
    } else {
      document.removeEventListener('mousedown', this.handleOverlay);
    }

    return compile(template, {
      ...this.props,
      classNameMenu: bem.get('menu', { opened: this.props.isOpen }),
    });
  }
}

export default DropDownMenu;
