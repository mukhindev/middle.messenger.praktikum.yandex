import { join } from './templator';

type TFormFields = {
  type: string,
  name: string,
  label: string,
};

type TFormButtons = {
  type: 'submit',
  label: 'Сохранить новый пароль',
  color: 'primary',
};

type TForm = {
  fields: TFormFields[],
  buttons: TFormButtons[],
};

function generateForm(form: TForm, formClassName: string) {
  return `
    <form class="${formClassName}" type="submit">
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
