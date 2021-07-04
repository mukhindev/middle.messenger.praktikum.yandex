import AuthApi from '../api/AuthApi';
import { router } from '../router';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { IAuthApiSignIn, IAuthApiSignUp } from '../interfaces/IAuthApi';
import { store } from '../store';

const authApi = new AuthApi();

class AuthSingInController {
  public signIn(user: IAuthApiSignIn) {
    showPreloader();
    return authApi.signIn(user)
      .then(() => {
        router.go('/');
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public signUp(user: IAuthApiSignUp) {
    showPreloader();
    return authApi.signUp(user)
      .then(() => {
        router.go('/sign-in');
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public checkAuth() {
    return authApi.checkAuth()
      .then((xhr) => {
        const response = JSON.parse(xhr.response);
        store.setState({
          currentUser: response,
        });
      })
      .catch(handleError);
  }
}

export default AuthSingInController;
