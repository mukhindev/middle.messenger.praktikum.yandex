import './Nav.scss'

function Nav ({ menu }) {
  Nav.context = {
    className: 'nav',
  }

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

export default Nav;
