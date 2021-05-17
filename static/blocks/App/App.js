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
        <Main>
          <ul>
            <li>
              <a href="#">
                test
              </a>
            </li>
          </ul>
        </Main>
        <Main>
          123
        </Main>
      </div>
    `
  ]
}

export default App;
