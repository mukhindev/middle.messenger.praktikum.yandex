export const template = () => `
  <template class="{{ className }}">
    <header class="{{ className }}__header">
      <h1 class="{{ className }}__title">Чат</h1>
    </header>
    <main class="{{ className }}__main">
      <h2 class="{{ className }}__links-title">Страницы приложения</h2>
      <Links />
    </main>
  </template>
`;
