import Templator from '../classes/Templator';

export const { compile } = new Templator();

/* Утилиты шаблонизатора */
// Соединение массива строк без запятой
export function join(templates: string[]) {
  if (!Array.isArray(templates)) {
    throw new Error(`Функция join ожидает массив, был передан ${typeof templates}`);
  }
  return templates.join('');
}

// Конструктор свойства style из объекта
export function stylize(props: Record<string, string>) {
  return Object.entries(props).reduce((acc, [key, value], index, arr) => {
    return `${acc}${key}:${value};${index === arr.length - 1 ? '"' : ''}`;
  }, 'style="');
}

// Установщик атрибутов из объекта
export function setAttributes(attrs?: Record<string, string | number | boolean>) {
  if (!attrs) {
    return '';
  }
  return Object.entries(attrs).reduce((acc, [key, value]) => {
    // Если в значении бул
    if (typeof value === 'boolean') {
      if (!value) {
        // Если ложь, не добавлять атрибут
        return `${acc}`;
      }
      // Если истина, атрибут без значения
      return `${acc} ${key}`;
    }
    // Атрибут со значением
    return `${acc} ${key}="${value}"`;
  }, '');
}
