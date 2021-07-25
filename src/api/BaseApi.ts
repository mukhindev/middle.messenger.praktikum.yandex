import http from '../classes/HTTPTransport';
import env from '../utils/env';
import { convertKeysToCamelCase } from '../utils/keysConverter';

const defaultHeaders = {
  'Content-type': 'application/json; charset=UTF-8',
};

interface IBaseApi {
  baseUrl?: string,
  path?: `/${string}`
  headers?: Record<string, string>
}

class BaseApi {
  private _http: typeof http;
  private _baseUrl: string;
  private _path: string;
  private _headers: Record<string, string>;

  constructor(config: IBaseApi = {}) {
    this._http = http;
    this._baseUrl = config.baseUrl || env.HOST_API || '';
    this._path = config.path || '';
    this._headers = config.headers || defaultHeaders;
  }

  private getPath() {
    return `${this._baseUrl}${this._path}`;
  }

  private handleOptions(newOptions?: Record<any, any>) {
    const options = newOptions || {};
    options.headers = newOptions?.headers || this._headers;
    return options;
  }

  private handleResponse(res: XMLHttpRequest) {
    if (res.response === 'OK') {
      return { ok: true };
    }

    const response = JSON.parse(res.response);

    if (response && Array.isArray(response)) {
      return response.map((item) => convertKeysToCamelCase(item));
    }

    if (response && typeof response === 'object') {
      return convertKeysToCamelCase(response);
    }

    return response;
  }

  get headers() {
    return this._headers;
  }

  get(endpoint: `/${string}`, options?: {}) {
    return this._http.get(this.getPath() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }

  post(endpoint: `/${string}`, options?: {}) {
    return this._http.post(this.getPath() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }

  put(endpoint: `/${string}`, options?: {}) {
    return this._http.put(this.getPath() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }

  delete(endpoint: `/${string}`, options?: {}) {
    return this._http.delete(this.getPath() + endpoint, this.handleOptions(options))
      .then(this.handleResponse);
  }
}

export default BaseApi;
