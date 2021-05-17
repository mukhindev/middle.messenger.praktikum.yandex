import Header from '../Header/Header.js';
import Main from '../Main/Main.js';

function App () {
  const context = {
    Header,
    Main
  }

  return [
    context,
    `
      {{ Header }}
      {{ Main }}
    `
  ]
}

export default App;
