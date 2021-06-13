import Block from '../../../classes/Block';
import Button from '../Button/Button';
import { compile } from '../../../utils/templator';
import { template } from './DropDownMenu.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './DropDownMenu.scss';

const bem = new BemHandler('drop-down-menu');

interface IDropDownMenu {
  classMix?: string
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
      classNameMenu: bem.get('menu'),
      classNameMenuOpen: bem.get('menu', { opened: true }),
      style: props.style ?? null,
      MenuButton: new Button({
        title: 'Управление пользователями',
        icon: props.icon,
        light: true,
        onClick: () => this.toggleMenu(true),
      }),
      MenuItem: props.items.map((item) => new Button({
        ...item,
        light: true,
        onClick: () => {
          item.onClick();
          this.toggleMenu(false);
        },
      })),
    });
    this.handleOverlay = this.handleOverlay.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleOverlay(evt: MouseEvent) {
    if (!(evt.target as HTMLElement).closest(`.${bem.get('menu')}`)) {
      this.toggleMenu(false);
      document.removeEventListener('mousedown', this.handleOverlay);
    }
  }

  toggleMenu(isOpen: boolean) {
    const menuElement = this.getContent().lastElementChild;
    if (!menuElement) {
      return;
    }
    if (isOpen) {
      menuElement.className = this.props.classNameMenuOpen;
      document.addEventListener('mousedown', this.handleOverlay);
    } else {
      menuElement.className = this.props.classNameMenu;
      document.removeEventListener('mousedown', this.handleOverlay);
    }
  }

  render() {
    return compile(template, this.props);
  }
}

export default DropDownMenu;
