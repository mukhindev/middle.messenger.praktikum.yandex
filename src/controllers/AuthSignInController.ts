import AuthSignInApi from '../api/AuthSignInApi';
import { router } from '../router';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { IAuthSignInApi } from '../interfaces/IAuthSignInApi';

const authSignInApi = new AuthSignInApi();

class AuthSingInController {
  public signIn(user: IAuthSignInApi) {
    showPreloader();
    return authSignInApi.request(user)
      .then((xhr) => {
        console.log(xhr);
        router.go('/');
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }
}

export default AuthSingInController;
