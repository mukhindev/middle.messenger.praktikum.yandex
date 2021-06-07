import EventBus from './EventBus';
import getElementsFromString from '../utils/getElementsFromString';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;

  _meta = null;

  _id = null;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this._uuid = `x${Date.now()}`;

    this.props = this._makePropsProxy({ ...props, _uuid: this._uuid });
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

  _renderChildComponents(elements) {
    elements.forEach((markerElement) => {
      const parent = markerElement.parentNode;
      const blockElement = window._components[markerElement.dataset.uuid];
      parent.replaceChild(blockElement, markerElement);
    });
  }

  _render() {
    const blockHTML = this.render();
    const template = getElementsFromString(blockHTML);
    // Перенос атрибутов с <template> на обёртку блока
    template.getAttributeNames()
      .forEach((name) => {
        this._element.setAttribute(name, template.getAttribute(name));
      });
    const blockElements = template.content.cloneNode(true);
    this._element.innerHTML = '';
    this._element.append(blockElements);
    const markerElements = this._element.querySelectorAll('[data-uuid]');
    this._renderChildComponents(markerElements);
    this._element.removeAttribute('data-uuid');
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
    const element = document.createElement(tagName);
    element.setAttribute('data-uuid', this._uuid);
    return element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
