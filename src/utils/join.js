function join(array) {
  if (!Array.isArray(array)) {
    throw new Error(`Функция join ожидает массив, был передан ${typeof array}`);
  }
  return array.join('');
}

export default join;
