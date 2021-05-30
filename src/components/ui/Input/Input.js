import './Input.scss';

function Input(props) {
  const {
    type,
    label,
    placeholder,
    onInput,
    parentBlock,
    mix,
  } = props;

  Input.context = {
    className: 'input',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    type: type ?? 'text',
    label: label ?? '',
    placeholder: placeholder ?? '',
    onInput,
  };

  const labelTemplate = label
    ? '<span class="{{ className }}__label">{{ label }}</span>'
    : '';

  return `
    <label class="{{ className }}{{ mixClassName }}">
      <input
        class="{{ className }}__field"
        type="{{ type }}"
        placeholder="{{ placeholder }}"
        oninput="{{ onInput(this) }}"
      />
      ${labelTemplate}
    </label>
  `;
}

export default Input;
