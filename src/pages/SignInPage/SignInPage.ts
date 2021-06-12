import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './SignInPage.tmpl';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import '../../assets/styles/global.scss';
import './SignInPage.scss';

const bem = new BemHandler('sign-in-page');

const form = {
  fields: [
    {
      type: 'text',
      name: 'login',
      label: 'Логин',
      onInput: (value: string) => console.log('Поле логина:', value),
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      onInput: (value: string) => console.log('Поле логина:', value),
    },
  ],
  buttons: [
    {
      type: 'submit',
      label: 'Войти',
      color: 'primary',
      onClick: () => {},
    },
  ],
};

class SignInPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      form,
      Input: form.fields.map((field) => new Input(field)),
      Button: form.buttons.map((button) => new Button(button)),
      events: {
        submit: (evt: Event) => this.handleSubmit(evt),
      },
    });
  }

  handleSubmit(evt: Event) {
    evt.preventDefault();
    const { elements } = evt.target as HTMLFormElement;
    const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
    const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
    console.log(formData);
  }

  render() {
    return compile(template, this.props);
  }
}

document.body.prepend(new SignInPage().getContent());
