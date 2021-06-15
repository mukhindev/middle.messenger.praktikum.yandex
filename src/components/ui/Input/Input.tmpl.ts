import { TProps } from '../../../classes/Block';
import { setAttributes } from '../../../utils/templator';

export const template = (props: TProps) => `
  <template class="{{ classNameRoot }}">
    <input
      class="{{ classNameInput }}"
      type="{{ type }}"
      ${props.name ? 'name="{{ name }}"' : ''}
      ${props.placeholder ? 'placeholder="{{ placeholder }}"' : ''}
      ${setAttributes(props.validation)}
    />
    ${props.label ? '<span class="{{ classNameLabel }}">{{ label }}</span>' : ''}
    <span class="{{ classNameError }}"></span>
  </template>
`;
