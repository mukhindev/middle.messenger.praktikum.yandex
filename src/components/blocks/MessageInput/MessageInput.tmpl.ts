export const template = () => `
  <template class="{{ className }}">
    <AttachmentMenu />
    <form class="{{ classNameForm }}" novalidate autocomplete="off">
      <MessageInput />
      <SendButton />
    </form>
  </template>
`;
