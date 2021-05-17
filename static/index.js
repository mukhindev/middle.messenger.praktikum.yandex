import Templator from '../src/utils/Templator.js';
import App from './components/App/App.js';

const html = new Templator().compile(App());
const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', html);
