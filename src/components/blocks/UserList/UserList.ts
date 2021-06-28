import Block from '../../../classes/Block';
import User from '../User/User';
import { compile } from '../../../utils/templator';
import { template } from './UserList.tmpl';
import BemHandler from '../../../utils/BemHandler';
import './UserList.scss';

const bem = new BemHandler('user-list');

interface IUserList {
  className?: string
  users: unknown[],
}

class UserList extends Block {
  constructor(props: IUserList) {
    super('ul', {
      className: bem.get('', '', props.className),
      users: props.users,
      User,
    });
  }

  render() {
    console.log('render UserList', this.props.users);
    return compile(template, this.props);
  }
}

export default UserList;
