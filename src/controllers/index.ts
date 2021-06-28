import AuthSignUpController from './AuthSignUpController';
import AuthSignInController from './AuthSignInController';
import ChatController from './ChatController';
import ChatWsController from './ChatWsController';

export const authSignUpController = new AuthSignUpController();
export const authSignInController = new AuthSignInController();
export const chatController = new ChatController();
export const chatWsController = new ChatWsController();
