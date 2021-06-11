import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template class="{{ classNameWithMix }}">
    <input
      class="{{ className }}__field"
      type="{{ type }}"
      ${props.name ? 'name="{{ name }}"' : ''}
      ${props.placeholder ? 'placeholder="{{ placeholder }}"' : ''}
    />
    ${props.label ? '<span class="{{ className }}__label">{{ label }}</span>' : ''}
  </template>
`;
