export default class Templator {
  constructor() {
    this.context = null
    this.handleMustache = this.handleMustache.bind(this)
    // Если в глобальном window нет $templatorMetods
    if (!window.$templatorMethods) {
      // Создать объект для хранения методов
      window.$templatorMethods = {}
    }
  }

  // Обработчик получения значения из контекста
  getValueFromContext(key) {
    // Если ключ без точки
    if (!key.includes('.')) {
      // Вернуть значение из корня контекста
      return this.context[key];
    }
    // Иначе, поделить ключ по точке
    const path = key.split('.');
    // Использовать как путь для извлечения из контекста
    return path.reduce((acc, k) => acc[k], this.context);
  }

  // Обработчик усов
  handleMustache(match) {
    // Отбрасываем усы
    const [key] = match.match(/[\w.]+/);
    // Получаем значение из контектса
    const value = this.getValueFromContext(key);
    // Если значение неопределено
    if (value === undefined) {
      return `{{ Контекст "${key}" не определён }}`;
    }
    if (typeof value === 'function') {
      // Если в значении компонент
      if (value.name[0] === value.name[0].toUpperCase()) {
        // Найти совпадения по пропсам
        const propsNames = match.match(/\[(.*?)\]/g) || [];
        const props = {}
        // Если есть пропсы
        if (propsNames.length) {
          for (const prop of propsNames) {
            const propsKey = prop.match(/[\w.]+/)
            if (prop.includes('=')) {
              // Наполняем объект значением после =
              props[propsKey] = prop.split('=')[1].replace(']', '')
            } else {
              // Наполняем объект пропсов из контекста
              props[propsKey] = this.context[propsKey]
            }

          }
        }
        // Компилируем шаблон из компонента, передаём props
        return new Templator().compile(value(props));
      }
      // Если в значении метод
      window.$templatorMethods[value.name] = value
      return `${value.name}()`
    }
    return value;
  }

  /**
   * Компиляция шаблона.
   * @param {[{}, string|() => string]}
   * @returns {string}
   */
  compile([context, template]) {
    this.context = context
    return template
      // Ищем усы, на совпадения вызываем обработчик
      .replace(/{{(.*?)}}/g, this.handleMustache)
      .trim();
  }
}
