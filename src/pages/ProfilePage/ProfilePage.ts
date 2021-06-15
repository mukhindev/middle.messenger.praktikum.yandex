import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './ProfilePage.tmpl';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import validateForm from '../../utils/validateForm';
import { TFormField, TFormButton } from '../../utils/generateForm';
import '../../assets/styles/global.scss';
import './ProfilePage.scss';

const bem = new BemHandler('profile-page');

class Profile extends Block {
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
          window.location.href = '/chat.html';
        },
      }),
      avatar: defaultAvatar,
      AvatarDeleteButton: new Button({
        label: 'Удалить аватар',
        light: true,
        classMix: bem.get('avatar-delete-button'),
        onClick: () => console.log('Кнопка удаления аватара'),
      }),
      PasswordButton: new Button({
        label: 'Сменить пароль',
        light: true,
        classMix: bem.get('password-button'),
        onClick: () => {
          console.log('Кнопка смены пароля');
          window.location.href = '/password.html';
        },
      }),
      SignOutButton: new Button({
        label: 'Выйти из аккаунта',
        light: true,
        classMix: bem.get('sign-out-button'),
        onClick: () => {
          console.log('Кнопка выхода');
          window.location.href = '/sign-in.html';
        },
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
            name: 'firstName',
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
            type: 'text',
            name: 'secondName',
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
            type: 'tel',
            name: 'tel',
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
            label: 'Сохранить изменения',
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
    console.log(formData);
  }

  render() {
    return compile(template, this.props);
  }
}

document.body.prepend(new Profile().getContent());
