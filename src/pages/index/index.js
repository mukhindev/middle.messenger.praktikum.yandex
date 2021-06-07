import Block from '../../classes/Block';
import Button from '../../components/ui/Button/Button';
import '../../assets/styles/global.scss';
import './index.scss';
import { compile } from '../../utils/templator';

const template = `
<main>
  <h1>{{ title }}</h1>
  {{ Button }}
</main>
`;

class IndexPage extends Block {
  constructor() {
    super('div', {
      title: 'Привет, Мир!',
      Button: new Button(),
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
