if (process.env.NODE_ENV === 'production') {
  if (!process.env.HOST_API) {
    throw new Error('В режиме production наличие переменной окружения HOST_API — обязательно');
  }
  if (!process.env.HOST_WS) {
    throw new Error('В режиме production наличие переменной окружения HOST_WS — обязательно');
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST_API: process.env.HOST_API || 'https://ya-praktikum.tech/api/v2',
  HOST_WS: process.env.HOST_WS || 'wss://ya-praktikum.tech/ws',
};