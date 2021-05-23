export default class Templator {
  constructor() {
    this.context = null
    this.handleMatch = this.handleMatch.bind(this)
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
  handleMatch(match) {
    // Отбрасываем усы и ковычки
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
        const propsNames = match.match(/{{(.*?)}}/g) || [];
        const props = {}
        // Найти вложения в тег компонента
        const children = match.match(/<[A-Z].*?>(.*?)<\/[A-Z][a-z]*>/) || []
        // Если есть, создаёт компонент и компилируем результат в Child
        if (children[1]) {
          function Child() {
            Child.context = this.context
            return children[1]
          }
          props.children = this.compile(Child);
        }
        // Если есть пропсы
        if (propsNames.length) {
          for (const prop of propsNames) {
            const propsKey = prop.match(/[\w.]+/)[0]
            if (prop.includes('=')) {
              // Наполняем объект значением после =
              props[propsKey] = prop.split(/="/)[1].replace(/".*}}/, '').trim()
              console.log(prop, propsKey, props)
            } else {
              // Наполняем объект пропсов из контекста
              props[propsKey] = this.context[propsKey]
            }
          }
        }
        // Компилируем шаблон из компонента, передаём props
        return new Templator().compile(value, props);
      }
      // Если в значении метод
      window.$templatorMethods[value.name] = value
      return `${value.name}()`
    }
    return value;
  }

  compile(Component, props) {
    const template = Component.call(this, props);
    this.context = Component.context
    const tmpl = template
      // Ищем нужные cовпадения, вызываем обработчик
      .replace(/\s{2,}/g, '')
      .replace(/{{(.*?)}}|<[A-Z](.*?)\/>|<[A-Z](.*?)>(.*?)<\/[A-Z][a-z]*>/g, this.handleMatch)
      .trim();
    return tmpl
  }
}
