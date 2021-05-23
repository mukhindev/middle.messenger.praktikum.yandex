import './Main.scss'

function Main ({ children, title }) {
  Main.context = {
    className: 'main',
    children,
    title
  }

  return /*html*/ `
    <main class="{{ className }}">
      <h2 class="{{ className }}__title">{{ title }}</h2>
      {{ children }}
    </main>
  `
}

export default Main;