import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import generateForm from '../../utils/generateForm';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import '../../assets/styles/global.scss';
import './password.scss';

function ProfilePage() {
  ProfilePage.context = {
    className: 'password-page',
    Main,
    Input,
    Button,
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
    toProfilePage: () => {
      window.location.href = '/profile.html';
    },
  };

  const profileForm = {
    fields: [
      {
        type: 'password',
        name: 'password',
        label: 'Текущий пароль',
      },
      {
        type: 'password',
        name: 'newPassword',
        label: 'Новый пароль',
      },
      {
        type: 'password',
        name: 'repeatedNewPassword',
        label: 'Новый пароль ещё раз',
      },
    ],
    buttons: [
      {
        type: 'submit',
        label: 'Сохранить новый пароль',
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
      onClick="{{ toProfilePage }}"
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
          <h1 class="{{ className }}__title">Смена пароля</h1>
        </div>
        ${generateForm(profileForm, '{{ className }}__form', '{{ handleSubmitButton(event) }}')}
      </Main>
    </div>
  `;
}

const html = new Templator().compile(ProfilePage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
