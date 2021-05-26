import './Main.scss'

function Main ({ children }) {
  Main.context = {
    className: 'main',
    children,
  }

  return /*html*/ `
    <a class="{{ className }}">
      {{ children }}
    </a>
  `
}

export default Main;
