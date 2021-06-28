import { TProps } from '../../classes/Block';
import { generateForm } from '../../utils/formHandler';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <main class="{{ className }}__main">
      <h1 class="{{ className }}__title">Вход</h1>
      ${generateForm(props.form, '{{ classNameForm }}')}
      <p class="{{ className }}__to-sign-up">
        Нет аккаунта?
        <Link>Регистрация</Link>
      </p>
    </main>
  </template>
`;
