enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;

type TRequestOptions = {
  method?: METHODS
  headers?: Record<string, string>
  timeout?: number
  data?: unknown
};

function queryStringify(data: TRequestData) {
  if (!data) return '';
  return Object.entries(data).reduce((acc, [key, value], index, arr) => {
    return `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  public get = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  public post = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  public put = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  public patch = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PATCH });
  };

  public delete = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: TRequestOptions) => {
    const {
      method = METHODS.GET,
      headers = {},
      data,
      timeout = 5000,
    } = options;

    // Если метод GET и передана data, трансформировать data в query запрос
    const query = method === METHODS.GET ? queryStringify(data as TRequestData) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url + query);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
