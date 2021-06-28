import MessageWebSocket from '../api/MessageWebSocket';

const messageWebSocket = new MessageWebSocket();

class MessageController {
  public connect(userId: string, chatId: string, token: string) {
    return messageWebSocket.connect(userId, chatId, token);
  }

  public send(message: string) {
    return messageWebSocket.send(message);
  }
}

export default MessageController;
