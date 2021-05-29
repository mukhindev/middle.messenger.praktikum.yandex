import './Button.scss'

function Button (props) {
  const {
    type,
    icon,
    light,
    color,
    children,
    label,
    onClick,
    parentBlock,
    mix
  } = props

  Button.context = {
    className: 'button',
    light,
    icon,
    color: color ?? '',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    type: type ?? 'button',
    children: children ?? label ?? '',
    onClick,
  }

  const modifiers = [
    light ? ` {{ className }}_light` : '',
    color === 'primary' ? ` {{ className }}_primary` : '',
  ].join('')

  const iconTemplate = icon
    ? '<img class="{{ className }}__icon" src="{{ icon }}" alt="" />'
    : ''

  return  `
    <button
      class="{{ className }}${modifiers}{{ mixClassName }}"
      type="{{ type }}"
      onclick="{{ onClick() }}"
    >
      ${iconTemplate}
      {{ children }}
    </button>
  `
}

export default Button
