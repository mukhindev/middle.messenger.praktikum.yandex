import { TProps } from '../../../classes/Block';
import { join } from '../../../utils/templator';

export const template = (props: TProps) => `
  <template class="{{ classNameWithMix }}">
    ${join(props.ContactCard.map((_: unknown, index: number) => `
      <li class="{{ className }}__item">
        <ContactCard key="${index}" />
      </li>
    `))}
  </template>
`;
