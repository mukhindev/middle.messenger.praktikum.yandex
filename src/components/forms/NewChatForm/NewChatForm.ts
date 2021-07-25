import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './NewChatForm.tmpl';
import BemHandler from '../../../utils/BemHandler';
import { registerFormElements, validateForm, handleFormSubmit } from '../../../utils/formHandler';
import './NewChatForm.scss';

const bem = new BemHandler('new-chat-form');

interface INewChatForm {
  onSubmit: (formData: Record<string, string>) => void
}

class NewChatForm extends Block {
  constructor(props: INewChatForm) {
    super('div', {
      className: bem.get(),
      classNameForm: bem.get('form'),
      onSubmit: props?.onSubmit,
      form: {
        fields: [
          {
            type: 'text',
            name: 'title',
            label: 'Название',
            validation: {
              pattern: '[-_A-Za-zА-Яа-я0-9\\s!]*',
              maxlength: 60,
              required: true,
              'data-error': 'Обязательно поле. Буквы, цифры, знаки -_! и пробелы',
            },
            onInput: () => {},
            onValidate: () => this.validate(),
          },
        ],
        buttons: [
          {
            type: 'submit',
            label: 'Создать',
            color: 'primary',
            onClick: () => {
              this.validate();
            },
          },
        ],
      },
      events: {
        submit: (evt: Event) => this.handleSubmit(evt),
      },
    });

    registerFormElements(this.props);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const formElement: HTMLFormElement | null = this.getContent().querySelector(`.${this.props.classNameForm}`);
    validateForm(formElement);
  }

  handleSubmit(evt: Event) {
    const formData = handleFormSubmit(evt);
    this.props.onSubmit(formData);
  }

  render() {
    return compile(template, this.props);
  }
}

export default NewChatForm;
