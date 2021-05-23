import Templator from '../../src/utils/Templator.js';
import Main from '../components/Main/Main.js'
import Nav from '../components/Nav/Nav.js'
import '../styles/index.scss';

function Index () {
  Index.context = {
    className: 'app',
    Main,
    Nav,
    menu: [
      { name: 'Логин', to: '/sign-in' },
      { name: 'Регистрация', to: '/sign-up' },
    ]
  }

  return /*html*/ `
    <div class="{{ className }}">
      <header class="{{ className }}__header">
        <h1 class="{{ className }}__title">Hello, World!</h1>
        <Nav {{ menu }} />
      </header>
      <Main {{ title="Типо prop" }}>
        <p>В компоненте как children</p>
      </Main>
    </div>
  `
}

const html = new Templator().compile(Index);
const parser = new DOMParser();
const page = parser.parseFromString(html, 'text/html');
const root = document.body;
root.append(page.documentElement);
