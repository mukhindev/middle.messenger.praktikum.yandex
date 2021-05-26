const parser = new DOMParser();

function getElementFromString (html) {
  const page = parser.parseFromString(html, 'text/html');
  return page.documentElement
}

export default getElementFromString
