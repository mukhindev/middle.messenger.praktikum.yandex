export const template = () => `
  <template class="{{ className }}">
    <AttachmentMenu />
    <form class="{{ classNameForm }}" novalidate>
      <MessageInput />
      <SendButton />
    </form>
  </template>
`;
