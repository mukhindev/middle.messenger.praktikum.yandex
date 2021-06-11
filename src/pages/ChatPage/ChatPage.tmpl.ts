export const template = () => `
  <template class="{{ className }}">
    <aside class="{{ className }}__side-panel">
      <ContactCardList />
    </aside>
    <main class="{{ className }}__main">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </main>
  </template>
`;
