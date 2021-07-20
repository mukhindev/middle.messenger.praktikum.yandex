import Toast from '../components/ui/Toast/Toast';

const toast = new Toast();

export const showToast = (message: string, color: string = 'primary') => {
  toast.setProps({ message, color });
  document.body.append(toast.getContent());
  setTimeout(() => {
    toast.destroy();
  }, 5000);
};
