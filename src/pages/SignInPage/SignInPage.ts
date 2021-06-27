import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './SignInPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import { registerFormElements, validateForm, handleFormSubmit } from '../../utils/formHandler';
import Link from '../../components/ui/Link/Link';
import { authSignInController } from '../../controllers';
import { userStore } from '../../stores/authStore';
import './SignInPage.scss';

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
      test: '',
      TestButton: new Button({
        label: 'Тест',
        color: 'primary',
        onClick: () => {
          userStore.setState({ counter: userStore.state.counter + 1 });
        },
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

    registerFormElements(this.props);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const formElement: HTMLFormElement | null = this.getContent().querySelector(`.${this.props.classNameForm}`);
    validateForm(formElement);
  }

  handleSubmit(evt: Event) {
    const formData = handleFormSubmit(evt);
    authSignInController.signIn({
      login: formData.login,
      password: formData.password,
    });
  }

  componentDidMount() {
    userStore.subscribe((state) => { this.props.test = state.counter; });
  }

  render() {
    return compile(template, this.props);
  }
}

export default SignInPage;
