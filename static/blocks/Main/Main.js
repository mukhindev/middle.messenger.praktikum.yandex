import './Main.scss'

function Main (props) {
  const { children } = props;

  Main.context = {
    className: 'main',
    children,
  }

  return /*html*/ `
    <main class="{{ className }}">
      {{ children }}
    </main>
  `
}

export default Main;