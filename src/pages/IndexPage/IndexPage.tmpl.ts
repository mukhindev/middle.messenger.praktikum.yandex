export const template = () => `
  <template class="{{ className }}">
    <header class="{{ className }}__header">
      <h1 class="{{ className }}__title">Чат</h1>
    </header>
    <main class="{{ className }}__main">
      <section class="{{ className }}__section">
        <h2 class="{{ className }}__links-title">Страницы приложения</h2>
        <Links />
      </section>
      <section class="{{ className }}__section">
        <h2 class="{{ className }}__links-title">Проверка HTTPTransport</h2>
        <p class="{{ className }}__http-transport-test">
          Результат смотреть в консоли. Данные предоставлены сервисом
          <a
            href="https://jsonplaceholder.typicode.com/"
            target="_blank"
            rel="noreferrer"
          >
            JSONPlaceholder
          </a>
        </p>
        <div class="{{ className }}__test-buttons">
          <TestHTTPTransportGetButton />
          <TestHTTPTransportPostButton />
        </div>
      </section>
    </main>
  </template>
`;
