export const template = () => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ owner }}"
    />
    <p class="{{ className }}__text">
      {{ text }}
      <span class="{{ classNameDate }}">{{ date }}</span>
    </p>
  </template>
`;
