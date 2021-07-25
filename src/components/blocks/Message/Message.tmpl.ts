export const template = () => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар"
    />
    <p class="{{ className }}__text">
      {{ content }}
      <date class="{{ classNameDate }}" datetime="{{ time }}">{{ formattedTime }}</date>
    </p>
  </template>
`;
