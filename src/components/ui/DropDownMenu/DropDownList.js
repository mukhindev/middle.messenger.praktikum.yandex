import Button from '../Button/Button';
import './DropDownList.scss';

function DropDownList(props) {
  const {
    menu,
    parentBlock,
    mix,
    onSelectItem,
  } = props;

  const { name, items } = menu;

  DropDownList.context = {
    className: 'drop-down-list',
    mixClassName: (parentBlock && mix) ? ` ${parentBlock}__${mix}` : '',
    Button,
    handleMenuItemClick: (target) => {
      onSelectItem(target.dataset.menuName, target.dataset.menuIndex);
    },
  };

  return `
    <ul class="{{ className }}{{ mixClassName }}">
      ${items.map(({ id, icon, name: itemName }) => (`
        <li class="{{ className }}__item">
          <Button
            onClick="{{ handleMenuItemClick }}"
            menuIndex="${id}"
            menuName="${name}"
            icon="${icon}"
            label="${itemName}"
            light="{{ true }}"
          />
        </li>
      `)).join('')}
    </ul>
  `;
}

export default DropDownList;
