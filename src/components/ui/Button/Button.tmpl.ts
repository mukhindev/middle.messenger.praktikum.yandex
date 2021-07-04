import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template
    class="{{ classNameWithMix }}"
    type="{{ type }}"
    ${props.title ? 'title="{{ title }}"' : ''}
    ${props.disabled ? 'disabled' : ''}
    ${props.menuIndex ? 'data-menu-index="{{ menuIndex }}"' : ''}
    ${props.menuName ? 'data-menu-name="{{ menuName }}"' : ''}
  >
    ${props.icon ? '<img class="{{ className }}__icon" src="{{ icon }}" alt="" />' : ''}
    {{ label }}
  </template>
`;
