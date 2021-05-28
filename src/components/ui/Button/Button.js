import './Button.scss'

function Button (props) {
  const {
    type,
    children,
    onClick,
    parentBlock,
    mix
  } = props

  Button.context = {
    className: 'button',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    type: type ?? 'button',
    children: children ?? '',
    onClick,
  }
  return /*html*/  `
    <button
      class="{{ className }}{{ mixClassName }}"
      type="{{ type }}"
      onclick="{{ onClick() }}"
    >
      {{ children }}
    </button>
  `
}

export default Button
