import Menu from '../Menu/Menu.js'
import './Header.css'

function Header () {
  const context = {
    className: 'header',
    Menu
  }

  return [
    context,
    `
      <header class="{{ className }}">
        <h1 class="{{ className }}__title">Простой шаблонизатор</h1>
        {{ Menu }}
      </header>
    `
  ]
}

export default Header;