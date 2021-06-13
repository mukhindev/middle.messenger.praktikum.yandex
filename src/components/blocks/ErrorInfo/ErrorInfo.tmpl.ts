export const template = () => `
  <template class="{{ className }}">
    <h1 class="{{ className }}__title">Ошибка {{ statusCode }}</h1>
    <p class="{{ className }}__message">{{ message }}</p>
    <a class="{{ className }}__return-link" href="{{ returnLink }}">{{ returnLinkText }}</a>
  </template>
`;
