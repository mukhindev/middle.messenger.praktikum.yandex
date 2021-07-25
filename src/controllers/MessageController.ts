import env from '../utils/env';
import { IMessageWebSocketConnect, IMessageWebSocketGet } from '../interfaces/IMessageWebSocket';
import { store } from '../store';
import { convertKeysToCamelCase } from '../utils/keysConverter';
import { showToast } from '../utils/toast';

class MessageController {
  private _ws: WebSocket;
  private _userId: number;
  private _chatId: number;
  private _token: string;
  private _ping: any;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMassage = this._handleMassage.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  private _addEvents() {
    this._ws.addEventListener('open', this._handleOpen);
    this._ws.addEventListener('message', this._handleMassage);
    this._ws.addEventListener('error', this._handleError);
    this._ws.addEventListener('close', this._handleClose);
  }

  private _removeEvents() {
    this._ws.removeEventListener('open', this._handleOpen);
    this._ws.removeEventListener('message', this._handleMassage);
    this._ws.removeEventListener('error', this._handleError);
    this._ws.removeEventListener('close', this._handleClose);
  }

  private _handleOpen() {
    this.getMessages({ offset: 0 });
    this._ping = setInterval(() => {
      this._ws.send('');
    }, 10000);
  }

  private _handleMassage(evt: MessageEvent) {
    const data = JSON.parse(evt.data);
    if (Array.isArray(data)) {
      if (!data.length) {
        store.setState({ messages: [] });
      } else if (data[0].id === 0) {
        store.setState({ messages: data.map((item) => convertKeysToCamelCase(item)) });
      } else {
        const messages = [
          ...store.state.messages,
          ...data.map((item) => convertKeysToCamelCase(item)),
        ];
        store.setState({ messages });
      }
    } else if (typeof data === 'object' && data.type === 'message') {
      const messages = [convertKeysToCamelCase(data), ...store.state.messages];
      store.setState({ messages });
    }
  }

  private _handleError(evt: ErrorEvent) {
    console.log('💬 _handleError', evt.message);
  }

  private _handleClose(evt: CloseEventInit) {
    this._removeEvents();
    if (evt.wasClean) {
      showToast('Соединение закрыто чисто', 'error');
    } else {
      showToast('Проблемы с подключением', 'error');
    }
    if (evt.code === 1006) {
      this._reconnection();
    }
  }

  private _reconnection() {
    this.connect({
      userId: this._userId,
      chatId: this._chatId,
      token: this._token,
    });
  }

  public connect(options: IMessageWebSocketConnect) {
    this._userId = options.userId;
    this._chatId = options.chatId;
    this._token = options.token;
    this._ws = new WebSocket(`${env.HOST_WS}/chats/${options.userId}/${options.chatId}/${options.token}`);
    this._addEvents();
  }

  public getMessages(options: IMessageWebSocketGet) {
    this._ws.send(JSON.stringify({
      content: options.offset.toString(),
      type: 'get old',
    }));
  }

  public leave() {
    clearInterval(this._ping);
    this._ws.close();
    this._removeEvents();
  }

  public sendMessage(message: string) {
    this._ws.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
}

export default new MessageController();
