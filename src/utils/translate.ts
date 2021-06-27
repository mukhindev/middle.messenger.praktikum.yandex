export function translate(phrase: string): string {
  switch (phrase) {
    case 'User already in system': return 'Пользователь уже в системе';
    case 'Not found': return 'Не найдено';
    case 'login is empty, but required': return 'Логин не введён, обязательное поле';
    default: return phrase;
  }
}
