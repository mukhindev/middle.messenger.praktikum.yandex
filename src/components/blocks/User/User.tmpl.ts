import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ login }}"
    />
    <p class="{{ className }}__login">{{ login }}</p>
  </template>
`;
