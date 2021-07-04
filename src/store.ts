import Store from './classes/Store';

export const store = new Store({
  currentUser: null,
  chatId: null,
  token: null,
  chats: [],
  messages: [],
});
