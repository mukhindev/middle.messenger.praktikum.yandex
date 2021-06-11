declare global {
  interface Window {
    _components: Record<string, HTMLElement>;
  }
}

class Templator {
  constructor() {
    this.parserRegex = /<(\w*:if)\({{\s([\w]+)\s}}\).*>.*<\/\1>|{{\s([\w]+)\s}}|<(?<tag>[A-Z]+\w+)\s+(.*?)\s*>(.*?)<\/\k<tag>>|<([A-Z]+\w+)\s+(.*?)\s*\/>/gs;
    this.context = null;
    this._handleFound = this._handleFound.bind(this);
    this.compile = this.compile.bind(this);
    if (!window._components) {
      window['_components'] = {};
    }
  }

  // Обработчик получения значения из контекста
  _getValueFromContext(key) {
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

  _transformAttributesToProps(attributes) {
    const props = {};

    // TODO: Решить проблему указанную линтером
    // eslint-disable-next-line no-restricted-syntax
    for (const prop of attributes) {
      // Ключ пропса (левая часть до =)
      const propsKey = prop.match(/[^<][\w.]+/)[0];
      // Получаем значение после =
      const propValue = prop.split(/="/)[1].replace(/"/, '').trim();
      // Проверяем, является ли ключом к контексту (prop="{{ key }}")
      const propValueContextKey = propValue.match(/{{\s*?(\w+?)\s*?}}/);
      console.log(propsKey);
      // Если ключ к контексту
      if (propValueContextKey && propValueContextKey[1]) {
        if (propValueContextKey[1] === 'true') {
          props[propsKey] = true;
        } else if (propValueContextKey[1] === 'false') {
          props[propsKey] = false;
        } else {
          // Иначе сохраняем под ключом пропса текущий контекст
          props[propsKey] = this.context[propValueContextKey[1]];
        }
      } else {
        // Сохраняем в пропс значение после =
        props[propsKey] = propValue;
      }
    }

    return props;
  }

  // Обработчик усов
  _handleFound(found) {
    const foundIf = found.match(/<(\w*:if)\({{\s(?<ifKey>[\w]+)\s}}\).*>/);
    if (foundIf?.groups?.ifKey) {
      const { ifKey } = foundIf.groups;
      if (this.context[ifKey]) {
        const template = found.replace(/:if\({{\s(?<ifKey>[\w]+)\s}}\)|:if/g, '');
        return this.compile(template, this.context);
      }
      return '';
    }

    // Извлекаем текст
    const [key] = found.match(/[\w.]+/);
    // Получаем значение из контекста
    const value = this._getValueFromContext(key);
    // Если значение не определено
    if (value === undefined) {
      return `{{ ${key} }}`;
    }
    // Если ключ с большой буквы, считать компонентом
    // if (key[0] === key[0].toUpperCase()) {
    //   // Массив компонентов. Если компонент 1, обернуть массивом
    //   const components = Array.isArray(value)
    //     ? [value[0]] : [value];
    //   return components.reduce((acc, component) => {
    //     const componentOpenTag = found.split('>')[0];
    //     const attributes = componentOpenTag.match(/\w+=".*?"/g) || [];
    //     const props = this._transformAttributesToProps(attributes);
    //     setTimeout(() => {
    //       component.setProps(props);
    //     }, 0);
    //     // Поместить элемент компонента в хранилище
    //     window._components[component._uuid] = component.getContent();
    //     // Вернуть элемент-маркер который будет заменен на элемент компонента
    //     return `${acc}<div data-uuid="${component._uuid}"></div>`;
    //   }, '');

    if (key[0] === key[0].toUpperCase()) {
      // Массив компонентов. Если компонент 1, обернуть массивом
      const componentOpenTag = found.split('>')[0];
      const attributes = componentOpenTag.match(/\w+=".*?"/g) || [];
      const props = this._transformAttributesToProps(attributes);

      // Итерация
      if (Array.isArray(value)) {
        if (!('key' in props)) {
          throw new Error('Для итерации из массива необходим уникальный key');
        }

        const { key } = props;
        setTimeout(() => {
          value[key].setProps(props);
        }, 0);
        // Поместить элемент компонента в хранилище
        window._components[value[key]._uuid] = value[key].getContent();
        // Вернуть элемент-маркер который будет заменен на элемент компонента
        return `<div data-uuid="${value[key]._uuid}"></div>`;
      }

      setTimeout(() => {
        value.setProps(props);
      }, 0);
      // Поместить элемент компонента в хранилище
      window._components[value._uuid] = value.getContent();
      // Вернуть элемент-маркер который будет заменен на элемент компонента
      return `<div data-uuid="${value._uuid}"></div>`;
    }
    return value;
  }

  compile(template, context) {
    this.context = context;
    return template
      .replace(this.parserRegex, this._handleFound)
      .trim();
  }
}

export const { compile } = new Templator();
