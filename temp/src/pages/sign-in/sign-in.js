import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import generateForm from '../../utils/generateForm';
import '../../assets/styles/global.scss';
import './sign-in.scss';

function SignInPage() {
  SignInPage.context = {
    className: 'sign-in-page',
    Main,
    Input,
    Button,
    handleSubmitButton: (evt) => {
      evt.preventDefault();
      const { elements } = evt.target;
      const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
      const formData = fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {});
      console.log(formData);
    },
  };

  const SignInForm = {
    fields: [
      {
        type: 'text',
        name: 'login',
        label: 'Логин',
      },
      {
        type: 'password',
        name: 'password',
        label: 'Пароль',
      },
    ],
    buttons: [
      {
        type: 'submit',
        label: 'Войти',
        color: 'primary',
      },
    ],
  };

  return `
    <div class="{{ className }}">
      <Main
        parentBlock="{{ className }}"
        mix="main"
      >
        <h1 class="{{ className }}__title">Вход</h1>
        ${generateForm(SignInForm, '{{ className }}__form', '{{ handleSubmitButton(event) }}')}
        <p class="{{ className }}__to-sign-up">
          Нет аккаунта?
          <a class="{{ className }}__to-sign-up-link" href="/sign-up.html">Регистрация</a>
        </p>
      </Main>
    </div>
  `;
}

const html = new Templator().compile(SignInPage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
