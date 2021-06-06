require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  if (!process.env.PORT) {
    throw new Error('В режиме production наличие переменной окружения PORT — обязательно');
  }
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
};
