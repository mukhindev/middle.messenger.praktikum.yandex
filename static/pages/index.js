import Templator from '../../src/utils/Templator.js';
import App from '../blocks/App/App.js';
import '../styles/index.scss';

const html = new Templator().compile(App());
const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', html);
