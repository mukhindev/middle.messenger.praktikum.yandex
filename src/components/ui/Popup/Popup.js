import Button from '../Button/Button';
import arrowLeftIcon from '../../../assets/images/arrow-left.svg';
import closeIcon from '../../../assets/images/close.svg';
import './Popup.scss';

function Popup(props) {
  const {
    title,
    children,
    parentBlock,
    mix,
    onComeBack,
    onClose,
  } = props;

  Popup.context = {
    className: 'popup',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    Button,
    title,
    children,
    onComeBack,
    onClose,
    arrowLeftIcon,
    closeIcon,
  };

  const comeBackButtonTemplate = `
    <Button
      parentBlock="{{ className }}"
      mix="come-back-button"
      title="Назад"
      icon="{{ arrowLeftIcon }}"
      light="{{ true }}"
      onClick="{{ onComeBack }}"
    />
  `;

  const closeButtonTemplate = `
    <Button
      parentBlock="{{ className }}"
      mix="close-button"
      title="Назад"
      icon="{{ closeIcon }}"
      light="{{ true }}"
      onClick="{{ onClose }}"
    />
  `;

  return `
    <div class="{{ className }}">
      <div class="{{ className }}__card{{ mixClassName }}">
        <div class="{{ className }}__header">
          ${onComeBack ? comeBackButtonTemplate : ''}
          ${title ? '<h2 class="{{ className }}__title">{{ title }}</h2>' : ''}
          ${onClose ? closeButtonTemplate : ''}
        </div>
        <div class="{{ className }}__body">
          {{ children }}
        </div>
      </div>
    </div>
  `;
}

export default Popup;
