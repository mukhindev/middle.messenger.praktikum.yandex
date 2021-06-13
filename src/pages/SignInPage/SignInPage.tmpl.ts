import { TProps } from '../../classes/Block';
import generateForm from '../../utils/generateForm';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <main class="{{ className }}__main">
      <h1 class="{{ className }}__title">Вход</h1>
      ${generateForm(props.form, '{{ classNameForm }}')}
      <p class="{{ className }}__to-sign-up">
        Нет аккаунта?
        <a class="{{ className }}__to-sign-up-link" href="/sign-up.html">Регистрация</a>
      </p>
    </main>
  </template>
`;
