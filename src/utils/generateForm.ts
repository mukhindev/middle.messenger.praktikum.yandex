import { join } from './templator';

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

function generateForm(form: TForm, formClassName: string) {
  return `
    <form class="${formClassName}" novalidate>
      <div class="${formClassName}-fields">
        ${join(form.fields.map((_: unknown, index: number) => `
          <Input key="${index}"/>
        `))}
      </div>
      <div class="${formClassName}-buttons">
        ${join(form.buttons.map((_: unknown, index: number) => `
          <Button key="${index}" />
        `))}
      </div>
    </form>
  `;
}

export default generateForm;
