import authApi from '../api/AuthApi';
import { router } from '../router';
import { showPreloader, hidePreloader } from '../utils/preloader';
import { handleError } from '../utils/apiHandler';
import { IAuthApiSignIn, IAuthApiSignUp } from '../interfaces/IAuthApi';
import { store } from '../store';
import { showToast } from '../utils/toast';

class AuthSingInController {
  public signIn(user: IAuthApiSignIn) {
    showPreloader();
    return authApi.signIn(user)
      .then(() => {
        showToast('Вы вошли', 'success');
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
        showToast('Вы зарегистрировались', 'success');
        router.go('/sign-in');
      })
      .catch(handleError)
      .finally(() => {
        hidePreloader();
      });
  }

  public signOut() {
    return authApi.signOut()
      .then(() => {
        localStorage.removeItem('last-select-chat-id');
        router.go('/sign-in');
      });
  }

  public checkAuth() {
    return authApi.checkAuth()
      .then((user) => {
        store.setState({
          currentUser: user,
        });
      })
      .catch((error) => {
        handleError(error);
        router.go('/sign-in');
      });
  }
}

export default new AuthSingInController();
