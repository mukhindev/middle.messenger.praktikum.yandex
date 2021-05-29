import './Links.scss';

function Links({ links }) {
  Links.context = {
    className: 'links',
  };

  return `
  <nav class="{{ className }}">
    <ul class="{{ className }}__list">
      ${links.map((item) => (
    `
          <li class="{{ className }}__item">
            <a class="{{ className }}__link" href="${item.to}">${item.name}</a>
          </li>
        `
  )).join('')}
    </ul>
  </nav>
`;
}

export default Links;
