import { join } from './templator';
import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import { TProps } from '../classes/Block';

export type TFormField = {
  type: string,
  name: string,
  label: string,
  onInput: (value: string) => void
};

export type TFormButton = {
  type: 'submit',
  label: 'Сохранить новый пароль',
  color: 'primary',
  onClick: () => void
};

type TForm = {
  fields: TFormField[],
  buttons: TFormButton[],
};

export function generateForm(form: TForm, formClassName: string) {
  return `
    <form class="${formClassName}" novalidate>
      <div class="${formClassName}-fields">
        ${join(form.fields.map((_: unknown, index: number) => `
          <Input key="${index}"/>
        `))}
      </div>
      ${form.buttons.length > 0
        ? `
          <div class="${formClassName}-buttons">
            ${join(form.buttons.map((_: unknown, index: number) => `
              <Button key="${index}" />
            `))}
          </div>
        `
        : ''
      }

    </form>
  `;
}

export function registerFormElements(props: TProps) {
  if (!props.form.fields || !props.form.buttons) {
    throw new Error('Необходимо создать в props.form массивы fields[] и buttons[], описывающие элементов формы');
  }
  props.Input = props.form.fields.map((field: TFormField) => new Input(field));
  props.Button = props.form.buttons.map((button: TFormButton) => new Button(button));
}

export function validateForm(form: HTMLFormElement | null, cb?: (isValid: boolean) => void) {
  if (!form) {
    throw new Error('Не найдена форма для валидации');
  }

  const isValid = form.checkValidity();

  if (!cb) {
    // Стандартное поведение валидации
    const submitButton: HTMLButtonElement | null = form.querySelector('[type=submit]');
    if (isValid && submitButton) {
      submitButton.disabled = false;
    } else if (submitButton) {
      submitButton.disabled = true;
    }
  } else {
    // Колбек для нестандартной реакции на валидацию
    cb(isValid);
  }
}

export function handleFormSubmit(evt: Event): Record<string, string> {
  if (!(evt?.target as HTMLFormElement)?.elements) {
    throw new Error('Необходимо передать событие submit с формы');
  }
  evt.preventDefault();
  const { elements } = evt.target as HTMLFormElement;
  const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
  const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
    acc[field.name] = field.value;
    return acc;
  }, {});
  return formData;
}
