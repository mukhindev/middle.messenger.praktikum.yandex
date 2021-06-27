import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './SignUpPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import { registerFormElements, validateForm, handleFormSubmit } from '../../utils/formHandler';
import Link from '../../components/ui/Link/Link';
import './SignUpPage.scss';

const bem = new BemHandler('sign-up-page');

class SignUpPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      classNameForm: bem.get('form'),
      Link: new Link({
        className: bem.get('to-sign-in-link'),
        to: '/sign-in',
      }),
      form: {
        fields: [
          {
            type: 'email',
            name: 'email',
            label: 'Почта',
            validation: {
              pattern: '[\\w.-]+@([A-Za-z0-9-]+\\.)+[A-Za-z0-9]+',
              minlength: 5,
              maxlength: 200,
              required: true,
              'data-error': 'Обязательно поле в формате email',
            },
            onInput: (value: string) => console.log('Поле почты:', value),
            onValidate: () => this.validate(),
          },
          {
            type: 'text',
            name: 'login',
            label: 'Логин',
            validation: {
              pattern: '[\\w.]*',
              maxlength: 60,
              required: true,
              'data-error': 'Обязательно поле. Только англ. буквы, символ _ и точка',
            },
            onInput: (value: string) => console.log('Поле логина:', value),
            onValidate: () => this.validate(),
          },
          {
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            validation: {
              pattern: '[-A-Za-zА-Яа-я.\\s]*',
              maxlength: 80,
              required: true,
              'data-error': 'Обязательно поле. Только буквы, дефис и точка',
            },
            onInput: (value: string) => console.log('Поле имя:', value),
            onValidate: () => this.validate(),
          },
          {
            type: 'password',
            name: 'password',
            label: 'Пароль',
            validation: {
              pattern: '[-+~!?@#$%^&*;\\()\\[\\]\\|:\\w]*',
              maxlength: 200,
              required: true,
              'data-error': 'Обязательно поле. Только англ и символы: -+~!?@#$%^&*;()[]|:',
            },
            onInput: (value: string) => {
              console.log('Поле пароля:', value);
              this.props.repeatedPasswordValidate();
            },
            onValidate: () => this.validate(),
          },
          {
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            validation: {
              pattern: '[-A-Za-zА-Яа-я.\\s]*',
              maxlength: 80,
              required: true,
              'data-error': 'Обязательно поле. Только буквы, дефис и точка',
            },
            onInput: (value: string) => console.log('Поле фамилия:', value),
            onValidate: () => this.validate(),
          },
          {
            type: 'password',
            name: 'repeated_password',
            label: 'Пароль ещё раз',
            validation: {
              required: true,
            },
            useValidation: (validate: () => void) => {
              this.props.repeatedPasswordValidate = validate;
            },
            onInput: (value: string) => {
              const passwordInput: HTMLInputElement | null = this.getContent().querySelector('[name=password]');
              const repeatedPasswordInput: HTMLInputElement | null = this.getContent().querySelector('[name=repeatedPassword]');
              if (!passwordInput || !repeatedPasswordInput) {
                return;
              }
              if (value === passwordInput.value) {
                repeatedPasswordInput.setCustomValidity('');
                this.props.repeatedPasswordValidate();
              } else {
                repeatedPasswordInput.setCustomValidity('Пароль должен совпадать');
                this.props.repeatedPasswordValidate();
              }
            },
            onValidate: () => this.validate(),
          },
          {
            type: 'tel',
            name: 'phone',
            label: 'Телефон',
            validation: {
              pattern: '^(\\+[0-9])\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{7}$',
              required: true,
              'data-error': 'Обязательно поле в формате телефона +79991234567',
            },
            onInput: (value: string) => console.log('Поле телефона:', value),
            onValidate: () => this.validate(),
          },
        ],
        buttons: [
          {
            type: 'submit',
            label: 'Регистрация',
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
    delete formData.repeated_password;
  }

  render() {
    return compile(template, this.props);
  }
}

export default SignUpPage;
