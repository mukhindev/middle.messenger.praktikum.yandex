import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './User.tmpl';
import BemHandler from '../../../utils/BemHandler';
import defaultAvatar from '../../../assets/images/default-avatar.jpg';
import env from '../../../utils/env';
import './User.scss';

const bem = new BemHandler('user');

interface IUser {
  id: number
  login: string
  email: string
  avatar: string | null
  firstName: string
  secondName: string
  displayName: string | null
  phone: string
  onClick: (userId: number) => void
  selectedUsers: number[]
}

class User extends Block {
  constructor(props: IUser) {
    super('li', {
      className: bem.get(),
      classNameRoot: bem.get('', { active: props.selectedUsers.includes(props.id) }),
      id: props.id,
      login: props.login,
      email: props.email,
      avatar: props.avatar ? env.HOST_RESOURCES + props.avatar : defaultAvatar,
      firstName: props.firstName,
      secondName: props.secondName,
      displayName: props.displayName,
      phone: props.phone,
      onClick: props.onClick,
      events: {
        click: () => this.props.onClick(this.props.id),
      },
    });
  }

  componentDidMount() {
    setTimeout(() => {
      const avatar: HTMLImageElement | null = this.getContent().querySelector(`.${bem.get('avatar')}`);
      if (avatar) {
        avatar.onerror = () => {
          avatar.src = defaultAvatar;
        };
      }
    }, 0);
  }

  render() {
    return compile(template, this.props);
  }
}

export default User;
