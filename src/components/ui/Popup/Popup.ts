import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Popup.tmpl';
import Button from '../Button/Button';
import arrowLeftIcon from '../../../assets/images/arrow-left.svg';
import closeIcon from '../../../assets/images/close.svg';
import BemHandler from '../../../utils/BemHandler';
import './Popup.scss';
import { router } from '../../../router';

const bem = new BemHandler('popup');

interface IPopup {
  classMix?: string
  title?: string
  children?: string
  closeButton?: boolean
  comeBackButton?: boolean
  onOpen?: () => void
  onClose?: () => void
}

class Popup extends Block {
  constructor(props: IPopup) {
    super('div', {
      className: bem.get(),
      classNameRoot: bem.get('', ''),
      classNameRootOpen: bem.get('', { opened: true }),
      classNameCard: bem.get('card', '', props.classMix),
      title: props.title ?? '',
      children: props.children ?? '',
      comeBackButton: props.comeBackButton ?? false,
      ComeBackButton: new Button({
        title: 'Вернуться',
        icon: arrowLeftIcon,
        light: true,
        classMix: bem.get('come-back-button'),
        onClick: () => {
          router.back();
        },
      }),
      closeButton: props.closeButton ?? true,
      CloseButton: new Button({
        title: 'Закрыть',
        icon: closeIcon,
        light: true,
        classMix: bem.get('close-button'),
        onClick: () => this.togglePopup(false),
      }),
      onOpen: props.onOpen ?? (() => {}),
      onClose: props.onClose ?? (() => {}),
    });
    this.handleOverlay = this.handleOverlay.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  handleOverlay(evt: MouseEvent) {
    if (!(evt.target as HTMLElement).closest(`.${bem.get('card')}`)) {
      this.togglePopup(false);
      document.removeEventListener('mousedown', this.handleOverlay);
    }
  }

  togglePopup(isOpen: boolean) {
    const popupElement = this.getContent();
    if (!popupElement) {
      return;
    }
    if (isOpen) {
      popupElement.className = this.props.classNameRootOpen;
      document.addEventListener('mousedown', this.handleOverlay);
      this.props.onOpen();
    } else {
      popupElement.className = this.props.classNameRoot;
      document.removeEventListener('mousedown', this.handleOverlay);
      this.props.onClose();
    }
  }

  show() {
    this.togglePopup(true);
  }

  hide() {
    this.togglePopup(false);
  }

  render() {
    return compile(template, this.props);
  }
}

export default Popup;
