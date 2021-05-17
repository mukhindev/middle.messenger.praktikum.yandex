import Main from '../Main/Main.js'
import './App.scss'

function App () {
  const context = {
    className: 'app',
    Main,
    button: `<button>123</button>`,
    children: `<button>456</button>`
  }

  return [
    context,
    `
      <div class="{{ className }}">
        1.<Main {{ test=777 }}>{{ button }}</Main>
        2.<Main><div class="{{ className }}">{{ button }}</div></Main>
        3.<Main {{ children }} />
      </div>
    `
  ]
}

export default App;
