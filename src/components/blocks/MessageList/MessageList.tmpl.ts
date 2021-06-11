import { TProps } from '../../../classes/Block';
import { join } from '../../../utils/templator';

export const template = (props: TProps) => `
  <template class="{{ classNameWithMix }}">
    ${join(props.Message.map((_: unknown, index: number) => `
      <li class="{{ className }}__item">
        <Message key="${index}" />
      </li>
    `))}
  </template>
`;
