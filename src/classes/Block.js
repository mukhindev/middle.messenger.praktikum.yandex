import EventBus from './EventBus';
import getElementFromString from '../utils/getElementFromString';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;

  _meta = null;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _componentDidRender() {
    this.componentDidRender(this._element);
  }

  componentDidRender() {}

  componentDidUpdate(oldProps, newProps) {
    return oldProps !== newProps;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _renderChildComponents() {
    const componentMarker = this._element.querySelector('#tmpl');
    if (componentMarker) {
      console.log(this._element);
      const parent = componentMarker.parentNode;
      parent.replaceChild(window['tmpl'], componentMarker);
    }
    console.log('_render', this._element);
  }

  _render() {
    const blockHTML = this.render();
    const blockElement = getElementFromString(blockHTML);
    this._element.innerHTML = '';
    this._element.append(blockElement);
    this._renderChildComponents();
    this._componentDidRender();
  }

  render() {}

  getContent() {
    return this.element;
  }

  getComponent(name) {
    return this.components[name];
  }

  _makePropsProxy(props) {
    const proxyProps = new Proxy(props, {
      set: (target, prop, value) => {
        target[prop] = value;
        this._meta.props = this.props;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.props, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });

    return proxyProps;
  }

  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
