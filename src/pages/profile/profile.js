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
    handleComeBack2: () => {
      window.location.href = '/chat.html';
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
      onClick="{{ handleComeBack2 }}"
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

        </div>
      </Main>
    </div>
  `;
}

const html = new Templator().compile(ProfilePage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
