import { showToast } from './toast';
import { translate } from './translate';

export function handleError(error: XMLHttpRequest) {
  const { reason } = JSON.parse(error.response);
  showToast(translate(reason), 'error');
  return Promise.reject(error);
}
