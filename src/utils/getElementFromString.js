const parser = new DOMParser();

function getElementFromString(html) {
  const page = parser.parseFromString(html, 'text/html');
  return page.documentElement.querySelector('body').children[0];
}

export default getElementFromString;
