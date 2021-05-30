import './Input.scss';

function Input(props) {
  const {
    type,
    name,
    label,
    placeholder,
    onInput,
    parentBlock,
    mix,
  } = props;

  Input.context = {
    className: 'input',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    name: name ?? '',
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
        ${name ? 'name="{{ name }}"' : ''}
        type="{{ type }}"
        placeholder="{{ placeholder }}"
        ${onInput ? 'oninput="{{ onInput(this) }}"' : ''}
      />
      ${labelTemplate}
    </label>
  `;
}

export default Input;
