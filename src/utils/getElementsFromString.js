const parser = new DOMParser();

function getElementsFromString(html) {
  const page = parser.parseFromString(html, 'text/html');
  return page.documentElement.querySelector('body').children;
}

export default getElementsFromString;
