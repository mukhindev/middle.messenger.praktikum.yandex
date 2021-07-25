import { TProps } from '../../classes/Block';
import { generateForm } from '../../utils/formHandler';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <main class="{{ className }}__main">
      <div class="{{ className }}__header">
        <ComeBackButton />
        <h1 class="{{ className }}__title">Смена пароля</h1>
      </div>
      ${generateForm(props.form, '{{ classNameForm }}')}
    </main>
  </template>
`;
