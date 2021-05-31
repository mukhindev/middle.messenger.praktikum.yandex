import Button from '../Button/Button';
import join from '../../../utils/join';
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
      ${join(items.map(({ id, icon, name: itemName }) => `
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
      `))}
    </ul>
  `;
}

export default DropDownList;
