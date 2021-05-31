import join from '../../../utils/join';
import './Button.scss';

function Button(props) {
  const {
    type,
    icon,
    light,
    color,
    children,
    label,
    title,
    onClick,
    parentBlock,
    mix,
    menuIndex,
    menuName,
  } = props;

  Button.context = {
    className: 'button',
    light,
    icon,
    color: color ?? '',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    type: type ?? 'button',
    title,
    children: children ?? label ?? '',
    onClick,
    menuIndex,
    menuName,
  };

  const modifiers = join([
    light ? ' {{ className }}_light' : '',
    color === 'primary' ? ' {{ className }}_primary' : '',
  ]);

  const iconTemplate = icon
    ? '<img class="{{ className }}__icon" src="{{ icon }}" alt="" />'
    : '';

  return `
    <button
      class="{{ className }}${modifiers}{{ mixClassName }}"
      type="{{ type }}"
      ${onClick ? 'onclick="{{ onClick(this) }}"' : ''}
      ${title ? 'title="{{ title }}"' : ''}
      ${menuIndex ? 'data-menu-index="{{ menuIndex }}"' : ''}
      ${menuName ? 'data-menu-name="{{ menuName }}"' : ''}
    >
      ${iconTemplate}
      {{ children }}
    </button>
  `;
}

export default Button;
