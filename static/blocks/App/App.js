import Main from '../Main/Main.js'
import './App.scss'

function App () {
  const context = {
    className: 'app',
    Main,
    children: `
      Тест это тест
    `,
    test: `234`
  }

  return [
    context,
    `
      <div class="{{ className }}">
        {{ Main [children] [test=<button>Кнопка</button>] }}
      </div>
    `
  ]
}

export default App;
