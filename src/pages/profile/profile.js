import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import generateForm from '../../utils/generateForm';
import defaultAvatar from '../../assets/images/default-avatar.png';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import '../../assets/styles/global.scss';
import './profile.scss';

function ProfilePage() {
  ProfilePage.context = {
    className: 'profile-page',
    Main,
    Input,
    Button,
    defaultAvatar,
    arrowLeftIcon,
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
    toChatPage: () => {
      window.location.href = '/chat.html';
    },
    toChangePassword: () => {
      window.location.href = '/password.html';
    },
    handleSignOut: () => {
      window.location.href = '/sign-up.html';
    },
  };

  const profileForm = {
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
        type: 'text',
        name: 'secondName',
        label: 'Фамилия',
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
        label: 'Сохранить изменения',
        color: 'primary',
      },
    ],
  };

  const comeBackButtonTemplate = `
    <Button
      parentBlock="{{ className }}"
      mix="come-back-button"
      title="Назад"
      icon="{{ arrowLeftIcon }}"
      light="{{ true }}"
      onClick="{{ toChatPage }}"
    />
  `;

  return `
    <div class="{{ className }}">
      <Main
        parentBlock="{{ className }}"
        mix="main"
      >
        <div class="{{ className }}__header">
          ${comeBackButtonTemplate}
          <h1 class="{{ className }}__title">@mukhindev</h1>
        </div>
        <div class="{{ className }}__avatar-wrapper">
          <button class="{{ className }}__avatar-change-button">
            <img class="{{ className }}__avatar" src="{{ defaultAvatar }}" alt="" />
            <Button
              parentBlock="{{ className }}"
              mix="avatar-delete-button"
              label="Удалить аватар"
              light="{{ true }}"
            />
          </button>
        </div>
        ${generateForm(profileForm, '{{ className }}__form', '{{ handleSubmitButton(event) }}')}
        <div class="{{ className }}__footer">
          <Button
            parentBlock="{{ className }}"
            mix="password-button"
            label="Сменить пароль"
            light="{{ true }}"
            onClick="{{ toChangePassword }}"
          />
          <Button
            parentBlock="{{ className }}"
            mix="sign-out-button"
            label="Выйти из аккаунта"
            light="{{ true }}"
            onClick="{{ handleSignOut }}"
          />
        </div>
      </Main>
    </div>
  `;
}

const html = new Templator().compile(ProfilePage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
