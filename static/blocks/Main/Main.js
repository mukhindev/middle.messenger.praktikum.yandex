import './Main.scss'

function Main (props) {

  const { children, test } = props;

  const context = {
    className: 'main',
    children,
    test
  }

  return [
    context,
    `
      <main class="{{ className }}">
        {{ children }}
        {{ test }}
      </main>
    `
  ]
}

export default Main;