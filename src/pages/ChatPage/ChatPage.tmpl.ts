export const template = () => `
  <template class="{{ className }}">
    <aside class="{{ className }}__side-panel">
      <div class="{{ className }}__side-panel-header">
        <SearchInput />
      </div>
      <ContactCardList />
      <div class="{{ className }}__side-panel-footer">
        <NewChatButton />
        <SettingsButton />
      </div>
    </aside>
    <main class="{{ className }}__main">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </main>
  </template>
`;
