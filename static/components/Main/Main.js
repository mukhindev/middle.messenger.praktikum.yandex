import Cat from '../Cat/Cat.js';
import './Main.css'

function Main () {
  const context = {
    className: 'main',
    Cat,
    randomNumber: Math.floor(Math.random() * 100),
    getMessage: () => alert('Кнопка работает!')
  }

  return [
    context,
    `
      <main class="{{ className }}">
        <div class="{{ className }}__cat">{{ Cat }}</div>
        <p class="{{ className }}__number">Случайное число: {{ randomNumber }}</p>
        <button class="{{ className }}__button" onClick={{ getMessage }}>Показать алерт</button>
      </main>
    `
  ]
}

export default Main;