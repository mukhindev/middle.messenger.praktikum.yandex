import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template class="{{ classNameWithMix }}">
    <input
      class="{{ className }}__field"
      ${props.name ? 'name="{{ name }}"' : ''}
      type="{{ type }}"
      placeholder="{{ placeholder }}"
    />
    ${props.label ? '<span class="{{ className }}__label">{{ label }}</span>' : ''}
  </template>
`;
