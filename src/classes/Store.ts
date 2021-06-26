import EventBus from './EventBus';

export type TState = Record<string, any>;

class Store {
  public state: TState;
  private subscribers: Function[];
  private _meta: {
    state: TState;
  };

  private eventBus: () => EventBus;

  static EVENTS = {
    INIT: 'init',
    FLOW_SDM: 'flow:store-did-mount',
    FLOW_SDU: 'flow:store-did-update',
    FLOW_USE: 'flow:use',
  };

  constructor(initialState: TState = {}) {
    const eventBus = new EventBus();

    this._meta = {
      state: initialState,
    };

    this.state = this._makeStateProxy(initialState);
    this.subscribers = [];
    this.eventBus = () => eventBus;
    this._registerLifecycleEvents(eventBus);
    eventBus.emit(Store.EVENTS.INIT);
  }

  private _registerLifecycleEvents(eventBus: EventBus) {
    eventBus.on(Store.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Store.EVENTS.FLOW_SDM, this._storeDidMount.bind(this));
    eventBus.on(Store.EVENTS.FLOW_SDU, this._storeDidUpdate.bind(this));
    eventBus.on(Store.EVENTS.FLOW_USE, this._use.bind(this));
  }

  private _init() {
    this.eventBus().emit(Store.EVENTS.FLOW_SDM);
  }

  private _storeDidMount() {
    this.storeDidMount();
  }

  public storeDidMount() {}

  private _storeDidUpdate(oldState: TState, newState: TState) {
    const response = this.storeDidUpdate(oldState, newState);
    if (response) {
      this.eventBus().emit(Store.EVENTS.FLOW_USE);
    }
  }

  public storeDidUpdate(oldState?: TState, newState?: TState) {
    return oldState !== newState;
  }

  private _use() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  }

  public subscribe(subscriber: (state: TState) => void) {
    this.subscribers.push((subscriber));
    subscriber(this.state);
  }

  public setState(nextState: TState) {
    if (!nextState) {
      return;
    }
    Object.assign(this.state, nextState);
  }

  private _makeStateProxy(state: TState) {
    return new Proxy(state, {
      set: (target: TState, item: string, value: unknown) => {
        target[item] = value;
        this._meta.state = this.state;
        this.eventBus().emit(Store.EVENTS.FLOW_SDU, this._meta.state, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }
}

export default Store;
