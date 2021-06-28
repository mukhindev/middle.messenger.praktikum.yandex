import { TProps } from '../../../classes/Block';
import { generateForm } from '../../../utils/formHandler';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    ${generateForm(props.form, '{{ classNameForm }}')}
  </template>
`;
