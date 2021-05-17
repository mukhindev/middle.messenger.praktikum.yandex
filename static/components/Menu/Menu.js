import './Menu.css'

function Menu () {
  const context = {
    className: 'menu',
  }

  const menu = [
    { name: 'Главная', to: '/' },
    { name: 'Коты', to: '/cats' },
    { name: 'О сайте', to: '/about' },
  ]

  return [
    context,
    `
      <nav className="{{ className }}">
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
  ]
}

export default Menu;
