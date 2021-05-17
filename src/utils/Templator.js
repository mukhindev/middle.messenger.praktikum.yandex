export default class Templator {
  constructor() {
    this.context = null
    this.handleMustache = this.handleMustache.bind(this)
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
      return `{{ Не найден контекст "${key}" }}`;
    }
    // Если в значении экземпляр шаблонизатора
    if (typeof value === 'function') {
      if (value.name[0] === value.name[0].toUpperCase()) { 
        return new Templator().compile(value());
      }
      window[value.name] = value
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
      .replace(/{{(.*?)}}/gi, this.handleMustache)
      .trim();
  }
}
