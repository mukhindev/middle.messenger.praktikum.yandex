import './Main.scss'

function Main (props) {
  const { children, test } = props;

  const context = {
    className: 'main',
    children,
  }

  return [
    context,
    `
      <main class="{{ className }}">
        {{ children }}
      </main>
    `
  ]
}

export default Main;