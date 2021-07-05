import Block from '../../../classes/Block';
import User from '../User/User';
import { compile } from '../../../utils/templator';
import { template } from './UserList.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './UserList.scss';
import Button from '../../ui/Button/Button';

const bem = new BemHandler('user-list');

interface IUserList {
  className?: string
  users: unknown[]
  onApply: (usersId: number[]) => void
}

class UserList extends Block {
  constructor(props: IUserList) {
    super('div', {
      className: bem.get(),
      classNameRoot: bem.get('', '', props.className),
      users: props.users,
      selectedUsers: [],
      onSelect: (userId: number) => {
        if (this.props.selectedUsers.includes(userId)) {
          const updatedSelectedUsers = [...this.props.selectedUsers];
          const userIndex = updatedSelectedUsers.findIndex((user) => user === userId);
          updatedSelectedUsers.splice(userIndex, 1);
          this.props.selectedUsers = updatedSelectedUsers;
          return;
        }
        this.props.selectedUsers = [...this.props.selectedUsers, userId];
      },
      User,
      onApply: props.onApply,
      ButtonAdd: new Button({
        label: 'Применить',
        color: 'primary',
        classMix: bem.get('add-button'),
        onClick: () => {
          this.props.onApply(this.props.selectedUsers);
        },
      }),
    });
  }

  render() {
    return compile(template, this.props);
  }
}

export default UserList;
