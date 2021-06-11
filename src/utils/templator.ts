import { TProps } from '../classes/Block';

declare global {
  interface Window {
    _componentStore: Record<string, HTMLElement>;
  }
}

class Templator {
  private context: any;
  private parserRegex: RegExp;

  constructor() {
    this.parserRegex = /{{\s([\w]+)\s}}|<(?<tag>[A-Z]+\w+)\s+(.*?)\s*>(.*?)<\/\k<tag>>|<([A-Z]+\w+)\s+(.*?)\s*\/>/gs;
    this.context = null;
    this._handleFound = this._handleFound.bind(this);
    this.compile = this.compile.bind(this);
    if (!window._componentStore) {
      window['_componentStore'] = {};
    }
  }

  // Обработчик получения значения из контекста
  _getValueFromContext(key: string) {
    // Если ключ без точки
    if (!key.includes('.')) {
      // Вернуть значение из корня контекста
      return this.context[key];
    }
    // Иначе, поделить ключ по точке и ...
    const path = key.split('.');
    // Использовать как путь для извлечения из контекста
    return path.reduce((acc, k) => acc[k], this.context);
  }

  // Трансформация атрибутов в объект пропсов
  _transformAttributesToProps(attributes: string[]) {
    const props: TProps = {};

    // TODO: Решить проблему указанную линтером
    // eslint-disable-next-line no-restricted-syntax
    for (const prop of attributes) {
      // Ключ пропса (левая часть до =)
      const [propsKey] = prop.match(/[^<][\w.]+/) || [];

      // Получаем значение после =
      const propValue = prop.split(/="/)[1].replace(/"/, '').trim();
      // Проверяем, является ли ключом к контексту (prop="{{ key }}")
      const { key: propValueContextKey } = propValue.match(/{{\s*?(?<key>\w+?)\s*?}}/)?.groups || {};

      // Если это ключ к контексту
      if (propValueContextKey) {
        if (propValueContextKey === 'true') {
          props[propsKey] = true;
        } else if (propValueContextKey === 'false') {
          props[propsKey] = false;
        } else {
          // Сохраняем под ключом пропса текущий контекст
          props[propsKey] = this.context[propValueContextKey];
        }
      } else {
        // Сохраняем в пропс значение после =
        props[propsKey] = propValue;
      }
    }

    return props;
  }

  // Обработчик вхождений шаблона
  _handleFound(found: string) {
    // Извлекаем имя ключа
    const [key]: RegExpMatchArray = found.match(/[\w.]+/) || [];
    // Получаем значение из контекста по ключу
    const value = this._getValueFromContext(key);

    // Если значение не определено
    if (value === undefined) {
      return `{{ ${key} }}`;
    }

    if (key[0] === key[0].toUpperCase()) {
      const componentOpenTag = found.split('>')[0];
      const attributes = componentOpenTag.match(/\w+=".*?"/g) || [];
      const props = this._transformAttributesToProps(attributes);

      // Итерация
      if (Array.isArray(value) && (typeof props.key === 'string')) {
        if (!('key' in props)) {
          throw new Error('Компонентам внутри итерации необходим уникальный key="number", указывающий на экземпляр в массиве');
        }
        const { key } = props;

        setTimeout(() => {
          value[+key].setProps(props);
        }, 0);
        // Поместить элемент компонента в хранилище
        window._componentStore[value[+key]._uuid] = value[+key].getContent();
        // Вернуть элемент-маркер который будет заменен на элемент компонента
        return `<div data-uuid="${value[+key]._uuid}"></div>`;
      }

      setTimeout(() => {
        value.setProps(props);
      }, 0);

      // Поместить элемент компонента в хранилище
      window._componentStore[value._uuid] = value.getContent();
      // Вернуть элемент-маркер который будет заменен на элемент компонента
      return `<div data-uuid="${value._uuid}"></div>`;
    }
    return value;
  }

  compile(templateFunction: (props: TProps) => string, context: TProps) {
    this.context = context;
    const template = templateFunction(context);
    return template
      .replace(this.parserRegex, this._handleFound)
      .trim();
  }
}

export const { compile } = new Templator();
