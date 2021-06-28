import AuthApi from '../api/AuthApi';
import { router } from '../router';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { IAuthSignInApi } from '../interfaces/IAuthSignInApi';
import { IAuthSignUpApi } from '../interfaces/IAuthSignUpApi';

const authApi = new AuthApi();

class AuthSingInController {
  public signIn(user: IAuthSignInApi) {
    showPreloader();
    return authApi.signIn(user)
      .then((xhr) => {
        console.log(xhr);
        router.go('/');
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public signUp(user: IAuthSignUpApi) {
    showPreloader();
    return authApi.signUp(user)
      .then((xhr) => {
        console.log(xhr);
        router.go('/sign-in');
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }
}

export default AuthSingInController;
