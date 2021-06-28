export const template = () => `
  <template class="{{ className }}">
    <aside class="{{ className }}__side-panel">
      <div class="{{ className }}__side-panel-header">
        <SearchInput />
      </div>
      <ChatCardList />
      <div class="{{ className }}__side-panel-footer">
        <NewChatButton />
        <SettingsButton />
      </div>
    </aside>
    <main class="{{ className }}__main">
      <MessageHeader />
      <MessageList />
      <MessageInput />
    </main>
    <AddChatUserPopup>
      <AddChatUserForm />
      <UserList />
    </AddChatUserPopup>
    <NewChatPopup>
      <NewChatForm />
    </NewChatPopup>
  </template>
`;
