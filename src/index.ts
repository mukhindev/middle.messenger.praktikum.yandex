import ChatPage from './pages/ChatPage/ChatPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import PasswordPage from './pages/PasswordPage/PasswordPage';
import Error404Page from './pages/404/404';
import Error500Page from './pages/500/500';
import { router } from './router';
import { authController } from './controllers';
import './assets/styles/global.scss';

router
  .setUnprotectedPaths(['/sign-in', '/sign-up', '/500'])
  .onRoute(authController.checkAuth)
  .use('/', ChatPage)
  .use('/profile', ProfilePage)
  .use('/sign-in', SignInPage)
  .use('/sign-up', SignUpPage)
  .use('/password', PasswordPage)
  .use('/500', Error500Page)
  .use('*', Error404Page)
  .start();
