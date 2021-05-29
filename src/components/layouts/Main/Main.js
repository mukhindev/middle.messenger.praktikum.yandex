import './Main.scss';

function Main({ children, parentBlock, mix }) {
  Main.context = {
    className: 'main',
    children,
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
  };

  return `
    <main class="{{ className }}{{ mixClassName }}">
      {{ children }}
    </main>
  `;
}

export default Main;
