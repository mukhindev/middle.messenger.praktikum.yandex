import Block from '../../classes/Block';
import { compile } from '../../utils/templator';
import { template } from './IndexPage.tmpl';
import Links from '../../components/blocks/Links/Links';
import BemHandler from '../../utils/BemHandler';
import Button from '../../components/ui/Button/Button';
import HTTPTransport from '../../classes/HTTPTransport';
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
      TestHTTPTransportGetButton: new Button({
        label: 'Проверить GET',
        color: 'primary',
        onClick: () => this.testHTTPTransportGet(),
      }),
      TestHTTPTransportPostButton: new Button({
        label: 'Проверить POST',
        color: 'primary',
        onClick: () => this.testHTTPTransportPost(),
      }),
    });
  }

  testHTTPTransportGet() {
    new HTTPTransport()
      .get(
        'https://jsonplaceholder.typicode.com/comments',
        { data: { postId: 1 } },
      )
      .then(({ response }) => console.log('Ответ от HTTPTransport:', JSON.parse(response)))
      .catch(console.log);
  }

  testHTTPTransportPost() {
    new HTTPTransport()
      .post('https://jsonplaceholder.typicode.com/posts', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        data: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
      })
      .then(({ response }) => console.log('Ответ от HTTPTransport:', JSON.parse(response)))
      .catch(console.log);
  }

  render() {
    return compile(template, this.props);
  }
}

document.body.prepend(new IndexPage().getContent());
