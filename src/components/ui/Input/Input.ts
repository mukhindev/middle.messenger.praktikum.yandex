import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Input.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './Input.scss';

const bem = new BemHandler('input');

interface IInput {
  classMix?: string
  label?: string
  placeholder?: string
  name?: string
  type?: string
  validation?: Record<string, string | number | boolean>
  onInput?: (value: string) => void
  onValidate?: (name: string, isValid: boolean) => void
  useValidation?: () => void
  color?: string
}

class Input extends Block {
  constructor(props: IInput) {
    super('label', {
      className: bem.get(),
      classNameRoot: bem.get('', '', props.classMix),
      classNameInput: bem.get('field'),
      classNameLabel: bem.get('label'),
      classNameError: bem.get('error'),
      name: props.name ?? '',
      label: props.label ?? '',
      placeholder: props.placeholder ?? props.label ?? '',
      type: props.type ?? 'text',
      validation: props.validation ?? null,
      onInput: props.onInput ?? null,
      onValidate: props.onValidate ?? null,
      useValidation: props.useValidation ?? null,
      color: props.color ?? '',
      events: {
        input: (evt: InputEvent) => {
          if (this.props.onInput) {
            this.validate();
            this.props.onInput((evt.target as HTMLInputElement).value);
          }
        },
        focusin: () => this.validate(),
        focusout: () => this.validate(),
      },
    });
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.props.useValidation) {
      this.props.useValidation(this.validate.bind(this));
    }
  }

  validate() {
    if (this.props.onValidate) {
      const inputElement: HTMLInputElement | null = this.getContent().querySelector(`.${this.props.classNameInput}`);
      const labelElement: HTMLElement | null = this.getContent().querySelector(`.${this.props.classNameLabel}`);
      const errorElement: HTMLElement | null = this.getContent().querySelector(`.${this.props.classNameError}`);

      if (!inputElement || !errorElement) {
        return;
      }

      const validity = inputElement.checkValidity();
      this.props.onValidate(inputElement.name, validity);

      if (!validity) {
        const errorMessage = inputElement.validationMessage;
        const customErrorMessage = inputElement.dataset.error || '';
        errorElement.textContent = customErrorMessage || errorMessage;
        inputElement.className = bem.get('field', { color: 'error' });
        if (labelElement) {
          labelElement.className = bem.get('label', { color: 'error' });
        }
      } else {
        inputElement.className = bem.get('field', { color: 'success' });
        if (labelElement) {
          labelElement.className = bem.get('label', { color: 'success' });
        }
      }
    }
  }

  render() {
    return compile(template, this.props);
  }
}

export default Input;
