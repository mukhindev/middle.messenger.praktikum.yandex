import './Main.scss'

function Main ({ children }) {
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
