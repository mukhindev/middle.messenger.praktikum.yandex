import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './ProfilePage.tmpl';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { registerFormElements, validateForm, handleFormSubmit } from '../../utils/formHandler';
import { router } from '../../router';
import './ProfilePage.scss';

const bem = new BemHandler('profile-page');

class ProfilePage extends Block {
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
          router.go('/');
        },
      }),
      avatar: defaultAvatar,
      AvatarDeleteButton: new Button({
        label: 'Удалить аватар',
        light: true,
        classMix: bem.get('avatar-delete-button'),
        onClick: () => {},
      }),
      PasswordButton: new Button({
        label: 'Сменить пароль',
        light: true,
        classMix: bem.get('password-button'),
        onClick: () => {
          router.go('/password');
        },
      }),
      SignOutButton: new Button({
        label: 'Выйти из аккаунта',
        light: true,
        classMix: bem.get('sign-out-button'),
        onClick: () => {},
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
            onInput: () => {},
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
            onInput: () => {},
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
            onInput: () => {},
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
            onInput: () => {},
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
            onInput: () => {},
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

    registerFormElements(this.props);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const formElement: HTMLFormElement | null = this.getContent().querySelector(`.${this.props.classNameForm}`);
    validateForm(formElement);
  }

  handleSubmit(evt: Event) {
    handleFormSubmit(evt);
  }

  render() {
    return compile(template, this.props);
  }
}

export default ProfilePage;
