import AuthSignUpApi from '../api/AuthSignUpApi';
import { router } from '../router';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { IAuthSignUpApi } from '../interfaces/IAuthSignUpApi';

const authSignUpApi = new AuthSignUpApi();

class AuthSingUpController {
  public signUp(user: IAuthSignUpApi) {
    showPreloader();
    return authSignUpApi.request(user)
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

export default AuthSingUpController;
