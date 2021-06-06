import Templator from '../../utils/Templator';
import Main from '../../components/layouts/Main/Main';
import Links from '../../components/blocks/Links/Links';
import '../../assets/styles/global.scss';
import './index.scss';
import getElementFromString from '../../utils/getElementFromString';

function IndexPage() {
  IndexPage.context = {
    className: 'index-page',
    Main,
    Links,
    menu: [
      { name: 'Чат', to: '/chat.html' },
      { name: 'Логин', to: '/sign-in.html' },
      { name: 'Регистрация', to: '/sign-up.html' },
      { name: 'Изменить пароль', to: '/password.html' },
      { name: 'Профиль', to: '/profile.html' },
      { name: 'Ошибка 404', to: '/404.html' },
      { name: 'Ошибка 500', to: '/500.html' },
    ],
  };

  return `
    <div class="{{ className }}">
      <header class="{{ className }}__header">
        <h1 class="{{ className }}__title">Чат</h1>
      </header>
      <Main>
        <h2 class="{{ className }}__links-title">Страницы приложения</h2>
        <Links links="{{ menu }}" />
      </Main>
    </div>
  `;
}

const html = new Templator().compile(IndexPage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
