import './Links.scss';
import join from '../../../utils/join';

function Links({ links }) {
  Links.context = {
    className: 'links',
  };

  return `
    <nav class="{{ className }}">
      <ul class="{{ className }}__list">
        ${join(links.map((item) => `
          <li class="{{ className }}__item">
            <a class="{{ className }}__link" href="${item.to}">${item.name}</a>
          </li>
        `))}
      </ul>
    </nav>
  `;
}

export default Links;
