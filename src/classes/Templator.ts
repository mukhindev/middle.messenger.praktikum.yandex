import { TProps } from './Block';

declare global {
  interface Window {
    _componentStore: Record<string, HTMLElement>;
  }
}

class Templator {
  private context: any;
  private parserRegex: RegExp;

  constructor() {
    this.parserRegex = /{{\s*([\w.]+)\s*}}|<([A-Z]+\w+)\s*([^<>]+)\s*\/>|<(?<tag>[A-Z]+\w+)\s*(.*?)\s*>(.*?)<\/\k<tag>>/gs;
    this.context = null;
    this._handleFound = this._handleFound.bind(this);
    this.compile = this.compile.bind(this);
    if (!window._componentStore) {
      window['_componentStore'] = {};
    }
  }

  // Обработчик получения значения из контекста
  private _getValueFromContext(key: string) {
    // Если ключ без точки
    if (!key.includes('.')) {
      // Вернуть значение из корня контекста
      return this.context[key];
    }
    // Иначе, поделить ключ по точке и ...
    const path = key.split('.');
    // Использовать как путь для извлечения из контекста
    return path.reduce((acc, k) => {
      if (!acc) {
        return acc;
      }
      return acc[k];
    }, this.context);
  }

  // Трансформация атрибутов в объект пропсов
  private _transformAttributesToProps(attributes: string[]) {
    const props: TProps = {};

    attributes.forEach((prop) => {
      // Ключ пропса (левая часть до =)
      const [propsKey] = prop.match(/[^<][\w.]+/) || [];

      // Получаем значение после =
      const propValue = prop.split(/="/)[1].replace(/"/, '').trim();
      // Проверяем, является ли ключом к контексту (prop="{{ key }}")
      const { key: propValueContextKey } = propValue.match(/{{\s*?(?<key>\w+?)\s*?}}/)?.groups || {};

      // Если это ключ к контексту
      if (propValueContextKey) {
        // Строки {{ true }} и {{ false }} превращаем в соответствующие значения
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
    });

    return props;
  }

  // Обработчик вхождений шаблона
  private _handleFound(found: string) {
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

      // Найти вложения в тег компонента ({{ children }})
      const { children } = found.match(/<(?<tag>[A-Z]+\w+).*?>(?<children>.*?)<\/\k<tag>>/s)?.groups || {};

      // Поместить children в props
      if (children) {
        const compiledChildren = this.compile(() => children, this.context);
        setTimeout(() => {
          value.setProps({
            children: compiledChildren,
          });
        }, 0);
      }

      // Итерация через атрибут of
      if ('of' in props) {
        if (this.context[props.of] === undefined) {
          throw new Error(`Не обнаружен контекст ${props.of}[] для компонента ${key}`);
        }

        if (!value?.prototype?.constructor) {
          throw new Error(`Контекст ${key} должен быть функцией-конструктором`);
        }

        const Component = value;
        let template = '';
        const items = this.context[props.of].map((el: any) => {
          return { ...el, ...props };
        });

        items.forEach((item: unknown, index: number) => {
          this.context = {
            ...this.context,
            [`_${key}${index}`]: new Component(item),
          };

          const component = this.context[`_${key}${index}`];

          window._componentStore[component._uuid] = component.getContent();
          // Вернуть элемент-маркер который будет заменен на элемент компонента
          template += `<node data-uuid="${component._uuid}"></node>`;
        });
        return template;
      }

      // Итерация из массива экземпляров
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
        return `<node data-uuid="${value[+key]._uuid}"></node>`;
      }

      setTimeout(() => {
        value.setProps(props);
      }, 0);

      // Поместить элемент компонента в хранилище
      window._componentStore[value._uuid] = value.getContent();
      // Вернуть элемент-маркер который будет заменен на элемент компонента
      return `<node data-uuid="${value._uuid}"></node>`;
    }
    return value;
  }

  public compile(templateFunction: (props: TProps) => string, context: TProps): string {
    this.context = context;
    const template = templateFunction(context);
    return template
      .replace(this.parserRegex, this._handleFound)
      .trim();
  }
}

export default Templator;
