import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template
    class="{{ className }}"
    ${props.target ? 'target="{{ target }}"' : ''}
    ${props.to ? 'href="{{ to }}"' : ''}
  >
    {{ children }}
  </template>
`;
