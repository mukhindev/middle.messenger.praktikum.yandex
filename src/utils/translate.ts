export function translate(phrase: string): string {
  switch (phrase) {
    case 'User already in system':
      return 'Пользователь уже в системе';
      break;
    case 'Not found':
      return 'Не найдено';
      break;
    default:
      return phrase;
  }
}
