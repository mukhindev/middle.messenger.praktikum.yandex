import Templator from '../../src/utils/Templator.js';
import Main from '../blocks/Main/Main.js'
import Menu from '../blocks/AppMenu/AppMenu.js'
import '../styles/index.scss';

function Index () {
  Index.context = {
    className: 'app',
    Main,
    Menu,
  }

  return /*html*/ `
    <div class="{{ className }}">
      <Main>
        Hello, World!
        <Menu />
      </Main>
    </div>
  `
}

const html = new Templator().compile(Index);
const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', html);
