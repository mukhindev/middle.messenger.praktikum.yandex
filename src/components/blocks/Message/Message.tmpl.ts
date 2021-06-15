export const template = () => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ authorName }}"
    />
    <p class="{{ className }}__text">
      {{ text }}
      <date class="{{ classNameDate }}" datetime="{{ date }}">{{ formattedDate }}</date>
    </p>
  </template>
`;
