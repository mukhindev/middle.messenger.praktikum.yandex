import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './SignInPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import validateForm from '../../utils/validateForm';
import { TFormField, TFormButton } from '../../utils/generateForm';
import Link from '../../components/ui/Link/Link';
import './SignInPage.scss';
import { authSignInController } from '../../controllers';

const bem = new BemHandler('sign-in-page');

class SignInPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      classNameForm: bem.get('form'),
      Link: new Link({
        className: bem.get('to-sign-up-link'),
        to: '/sign-up',
      }),
      form: {
        fields: [
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
            type: 'password',
            name: 'password',
            label: 'Пароль',
            validation: {
              pattern: '[-+~!?@#$%^&*;\\()\\[\\]\\|:\\w]*',
              maxlength: 200,
              required: true,
              'data-error': 'Обязательно поле. Только англ и символы: -+~!?@#$%^&*;()[]|:',
            },
            onInput: (value: string) => console.log('Поле пароля:', value),
            onValidate: () => this.validate(),
          },
        ],
        buttons: [
          {
            type: 'submit',
            label: 'Войти',
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

    this.props.Input = this.props.form.fields.map((field: TFormField) => new Input(field));
    this.props.Button = this.props.form.buttons.map((button: TFormButton) => new Button(button));

    this.validate = this.validate.bind(this);
  }

  validate() {
    const formElement: HTMLFormElement | null = this.getContent().querySelector(`.${this.props.classNameForm}`);
    validateForm(formElement);
  }

  handleSubmit(evt: Event) {
    evt.preventDefault();
    const { elements } = evt.target as HTMLFormElement;
    const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
    const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
    const user = formData;
    authSignInController.signIn(user);
  }

  render() {
    return compile(template, this.props);
  }
}

export default SignInPage;
