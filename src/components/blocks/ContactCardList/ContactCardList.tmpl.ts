import { TProps } from '../../../classes/Block';

export const template = (props: TProps) => `
  <template class="{{ classNameWithMix }}">
    ${props.ContactCard.map((_: unknown, index: number) => (`
      <li class="{{ className }}__item">
        <ContactCard key="${index}" />
      </li>
    `)).join('')}
  </template>
`;
