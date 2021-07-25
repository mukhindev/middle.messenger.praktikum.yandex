export const template = () => `
  <template class="{{ classNameRoot }}">
    <input class="{{ className }}__input" type="file" id="avatar" name="avatar" accept="image/*">
    <img class="{{ className }}__image" src="{{ src }}" alt="{{ alt }}" />
  </template>
`;
