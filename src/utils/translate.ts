export function translate(phrase: string): string {
  switch (phrase) {
    case 'User already in system': return 'Пользователь уже в системе';
    case 'Not found': return 'Не найдено';
    case 'login is empty, but required': return 'Логин не введён, обязательное поле';
    case 'Email already exists': return 'Пользователь с таким email уже существует';
    case 'Cookie is not valid': return 'Вы не авторизованы. Войдите или зарегистрируйтесь';
    case 'phone is not valid': return 'Неверный формат телефона';
    case 'No chat': return 'Не выбран чат';
    case 'Login or password is incorrect': return 'Неправильные логин или пароль';
    default: return phrase;
  }
}
