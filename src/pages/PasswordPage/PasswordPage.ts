import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './PasswordPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import { router } from '../../router';
import { registerFormElements, validateForm, handleFormSubmit } from '../../utils/formHandler';
import './PasswordPage.scss';

const bem = new BemHandler('password-page');

class PasswordPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      classNameForm: bem.get('form'),
      ComeBackButton: new Button({
        title: 'Вернуться',
        icon: arrowLeftIcon,
        light: true,
        classMix: bem.get('come-back-button'),
        onClick: () => {
          console.log('Кнопка возврата');
          router.back();
        },
      }),
      form: {
        fields: [
          {
            type: 'password',
            name: 'password',
            label: 'Текущий пароль',
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
            type: 'password',
            name: 'newPassword',
            label: 'Новый пароль',
            validation: {
              pattern: '[-+~!?@#$%^&*;\\()\\[\\]\\|:\\w]*',
              maxlength: 200,
              required: true,
              'data-error': 'Обязательно поле. Только англ и символы: -+~!?@#$%^&*;()[]|:',
            },
            onInput: (value: string) => {
              console.log('Поле нового пароля:', value);
              this.props.repeatedPasswordValidate();
            },
            onValidate: () => this.validate(),
          },
          {
            type: 'password',
            name: 'repeated_password',
            label: 'Новый пароль ещё раз',
            validation: {
              required: true,
            },
            useValidation: (validate: () => void) => {
              this.props.repeatedPasswordValidate = validate;
            },
            onInput: (value: string) => {
              const passwordInput: HTMLInputElement | null = this.getContent().querySelector('[name=newPassword]');
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
        ],
        buttons: [
          {
            type: 'submit',
            label: 'Сохранить новый пароль',
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
    console.log(formData);
  }

  render() {
    return compile(template, this.props);
  }
}

export default PasswordPage;
