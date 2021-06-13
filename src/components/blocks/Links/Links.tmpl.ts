import { TProps } from '../../../classes/Block';
import { join } from '../../../utils/templator';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    ${join(props.items.map((item: { name: string, to: string }) => `
      <li class="{{ className }}__item">
        <a class="{{ className }}__link" href="${item.to}">${item.name}</a>
      </li>
    `))}
  </template>
`;
