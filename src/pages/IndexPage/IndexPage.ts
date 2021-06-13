import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './IndexPage.tmpl';
import Links from '../../components/blocks/Links/Links';
import BemHandler from '../../utils/BemHandler';
import '../../assets/styles/global.scss';
import './IndexPage.scss';

const bem = new BemHandler('index-page');

class IndexPage extends Block {
  constructor() {
    super('div', {
      className: bem.get(),
      Links: new Links({
        items: [
          { name: 'Чат', to: '/chat.html' },
          { name: 'Логин', to: '/sign-in.html' },
          { name: 'Регистрация', to: '/sign-up.html' },
          { name: 'Изменить пароль', to: '/password.html' },
          { name: 'Профиль', to: '/profile.html' },
          { name: 'Ошибка 404', to: '/404.html' },
          { name: 'Ошибка 500', to: '/500.html' },
        ],
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

document.body.prepend(new IndexPage().getContent());
