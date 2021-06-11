import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ name }}"
    />
    <div class="{{ className }}__name-wrapper">
      ${props.isGroup ? '<div class="{{ className }}__group-marker"></div>' : ''}
      <p class="{{ className }}__name">{{ name }}</p>
    </div>
    <p class="{{ className }}__last-message">{{ lastMessage }}</p>
    ${props.counterUnreadMessages
      ? `<span class="{{ className }}__counter-unread-messages">
          {{ counterUnreadMessages }}
        </span>`
      : ''
    }
    <span class="{{ className }}__updated-at">{{ updatedAt }}</span>
  </template>
`;
