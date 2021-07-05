import { TProps } from '../../../classes/Block';

// TODO: Прятать null от последнего сообщения и даты
export const template = (props: TProps) => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ name }}"
    />
    <div class="{{ className }}__name-wrapper">
      ${props.isGroup ? '<div class="{{ className }}__group-marker"></div>' : ''}
      <p class="{{ className }}__name">{{ title }}</p>
    </div>
    <p class="{{ className }}__last-message">{{ last_message.content }}</p>
    ${props.unread_count
      ? `<span class="{{ className }}__counter-unread-messages">
          {{ unread_count }}
        </span>`
      : ''
    }
    <date class="{{ className }}__updated-at" datetime="{{ time }}">{{ formattedTime }}</date>
  </template>
`;
