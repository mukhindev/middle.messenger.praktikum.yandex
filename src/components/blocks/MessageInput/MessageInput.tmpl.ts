export const template = () => `
  <template class="{{ className }}">
    <AttachmentMenu />
    <form class="{{ classNameForm }}" type="submit" novalidate>
      <MessageInput />
      <SendButton />
    </form>
  </template>
`;
