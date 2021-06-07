import Block from '../../classes/Block';
import Button from '../../components/ui/Button/Button';
import '../../assets/styles/global.scss';
import './index.scss';
import { compile } from '../../utils/templator';

const template = `
  <template class="{{ className }}">
    <h1>{{ title }}</h1>
    {{ Button1 }}
    {{ Button2 }}
  </template>
`;

class IndexPage extends Block {
  constructor() {
    super('div', {
      className: 'index-page',
      title: 'Привет, Мир!',
      Button1: new Button(),
      Button2: new Button({
        className: 'button-2',
        startCounter: 3,
      }),
    });

    setTimeout(() => {
      this.props.title = 'Hello, World!';
    }, 2000);
  }

  render() {
    return compile(template, this.props);
  }
}

const indexPage = new IndexPage();

document.body.prepend(indexPage.getContent());
