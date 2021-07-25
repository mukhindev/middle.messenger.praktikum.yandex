import { TProps } from '../../classes/Block';
import { generateForm } from '../../utils/formHandler';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <main class="{{ className }}__main">
      <h1 class="{{ className }}__title">Регистрация</h1>
      ${generateForm(props.form, '{{ classNameForm }}')}
      <p class="{{ className }}__to-sign-in">
        Есть аккаунт?
        <Link>Вход</Link>
      </p>
    </main>
  </template>
`;
