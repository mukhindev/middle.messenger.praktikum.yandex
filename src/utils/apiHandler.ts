import { showToast } from './toast';
import { translate } from './translate';
import { router } from '../router';

export function handleError(error: XMLHttpRequest) {
  console.log('error in handleError', error);
  if (!error.response) {
    return router.go('/500');
  }
  const { reason } = JSON.parse(error.response);
  showToast(translate(reason), 'error');
  return Promise.reject(error);
}
