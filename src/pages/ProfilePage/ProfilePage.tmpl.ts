import { TProps } from '../../classes/Block';
import { generateForm } from '../../utils/formHandler';

export const template = (props: TProps) => `
  <template class="{{ className }}">
    <main class="{{ className }}__main">
      <div class="{{ className }}__header">
        <ComeBackButton />
        <h1 class="{{ className }}__title">@mukhindev</h1>
      </div>
      <div class="{{ className }}__avatar-wrapper">
        <ChooseAvatar />
      </div>
      ${generateForm(props.form, '{{ classNameForm }}')}
      <div class="{{ className }}__footer">
        <PasswordButton />
        <SignOutButton />
      </div>
    </main>
  </template>
`;
