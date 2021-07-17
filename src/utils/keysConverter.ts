export function convertKeysToCamelCase(obj: Record<string, any>, replaceableСhar?: string) {
  return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
    const chars = [...key];
    chars.forEach((char, index) => {
      if (char === (replaceableСhar || '_')) {
        chars[index] = '';
        chars[index + 1] = chars[index + 1].toUpperCase();
      }
    });

    acc[chars.join('')] = value;
    return acc;
  }, {});
}

export function convertKeysToSnakeCase(obj: Record<string, any>) {
  return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
    const chars = [...key];
    chars.forEach((char, index) => {
      console.log(char);
      if (char === char.toUpperCase()) {
        chars[index] = chars[index].toLowerCase();
        chars.splice(index, 0, '_');
      }
    });

    acc[chars.join('')] = value;
    return acc;
  }, {});
}
