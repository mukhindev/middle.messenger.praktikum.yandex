const parser = new DOMParser();

function getTemplateFromHTML(html) {
  const page = parser.parseFromString(html, 'text/html');
  return page.querySelector('template');
}

export default getTemplateFromHTML;
