import join from './join';

function generateForm(form, formClassName, onSubmit) {
  return `
  <form class="${formClassName}" type="submit" onsubmit="${onSubmit}">
    <div class="${formClassName}-fields">
      ${join(form.fields.map((field) => `
        <Input
          type="${field.type}"
          name="${field.name}"
          label="${field.label}"
          placeholder="${field.label}"
          ${field.onInput ? `onClick="${field.onInput}"` : ''}
        />
      `))}
    </div>
    <div class="${formClassName}-buttons">
      ${join(form.buttons.map((button) => `
        <Button
          type="${button.type}"
          label="${button.label}"
          ${button.color ? `color="${button.color}"` : ''}
          ${button.onClick ? `onClick="${button.onClick}"` : ''}
        />
      `))}
    </div>
  </form>
`;
}

export default generateForm;
