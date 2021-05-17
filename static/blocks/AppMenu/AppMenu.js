import './AppMenu.scss'

function Menu () {
  Menu.context = {
    className: 'app-menu',
  }

  const menu = [
    { name: 'Логин', to: '/sign-in' },
    { name: 'Регистрация', to: '/sign-up' },
  ]

  return `
  <nav class="{{ className }}">
    <ul class="{{ className }}__list">
      ${menu.map((item) => (
        `
          <li class="{{ className }}__item">
            <a class="{{ className }}__link" href="${item.to}">${item.name}</a>
          </li>
        `
      )).join('')}
    </ul>
  </nav>
`
}

export default Menu;
