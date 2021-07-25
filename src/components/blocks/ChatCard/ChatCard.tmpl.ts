import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар чата {{ name }}"
    />
    <div class="{{ className }}__name-wrapper">
      ${props.isGroup ? '<div class="{{ className }}__group-marker"></div>' : ''}
      <p class="{{ className }}__name">{{ title }}</p>
    </div>
    ${props.lastMessage
      ? '<p class="{{ className }}__last-message">{{ lastMessage.content }}</p>'
      : ''
    }
    ${props.unreadCount
      ? `<span class="{{ className }}__counter-unread-messages">
          {{ unreadCount }}
        </span>`
      : ''
    }
    ${props.time
      ? '<date class="{{ className }}__updated-at" datetime="{{ time }}"> {{ formattedTime }}</date>'
      : ''
    }

  </template>
`;
