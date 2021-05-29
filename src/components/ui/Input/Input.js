import './Input.scss'

function Input ({ type, label, placeholder, onInput }) {
  Input.context = {
    className: 'input',
    type: type ?? 'text',
    label: label ?? '',
    placeholder: placeholder ?? '',
    onInput
  }

  const labelTemplate = label
    ? '<span class="{{ className }}__label">{{ label }}</span>'
    : ''

  return `
    <label class="{{ className }}">
      <input
        class="{{ className }}__field"
        type="{{ type }}"
        placeholder="{{ placeholder }}"
        oninput="{{ onInput(this) }}"
      />
      ${labelTemplate}
    </label>
  `
}

export default Input;
