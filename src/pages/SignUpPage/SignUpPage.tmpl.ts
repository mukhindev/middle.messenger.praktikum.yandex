import { TProps } from '../../classes/Block';
import generateForm from '../../utils/generateForm';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <main class="{{ className }}__main">
      <h1 class="{{ className }}__title">Регистрация</h1>
      ${generateForm(props.form, '{{ classNameForm }}')}
      <p class="{{ className }}__to-sign-in">
        Есть аккаунт?
        <a class="{{ className }}__to-sign-in-link" href="/sign-in">Вход</a>
      </p>
    </main>
  </template>
`;
