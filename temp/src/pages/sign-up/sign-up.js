import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import generateForm from '../../utils/generateForm';
import '../../assets/styles/global.scss';
import './sign-up.scss';

function SignUpPage() {
  SignUpPage.context = {
    className: 'sign-up-page',
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

  const signUpForm = {
    fields: [
      {
        type: 'email',
        name: 'email',
        label: 'Почта',
      },
      {
        type: 'text',
        name: 'login',
        label: 'Логин',
      },
      {
        type: 'text',
        name: 'firstName',
        label: 'Имя',
      },
      {
        type: 'password',
        name: 'password',
        label: 'Пароль',
      },
      {
        type: 'text',
        name: 'secondName',
        label: 'Фамилия',
      },
      {
        type: 'password',
        name: 'repeatedPassword',
        label: 'Пароль ещё раз',
      },
      {
        type: 'tel',
        name: 'tel',
        label: 'Телефон',
      },
    ],
    buttons: [
      {
        type: 'submit',
        label: 'Регистрация',
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
        <h1 class="{{ className }}__title">Регистрация</h1>
        ${generateForm(signUpForm, '{{ className }}__form', '{{ handleSubmitButton(event) }}')}
        <p class="{{ className }}__to-sign-in">
          Есть аккаунт?
          <a class="{{ className }}__to-sign-in-link" href="/sign-in.html">Вход</a>
        </p>
      </Main>
    </div>
  `;
}

const html = new Templator().compile(SignUpPage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
