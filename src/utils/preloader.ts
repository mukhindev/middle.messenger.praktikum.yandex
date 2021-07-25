import Preloader from '../components/ui/Preloader/Preloader';

const preloader = new Preloader();

export const showPreloader = () => {
  document.body.append(preloader.getContent());
};

export const hidePreloader = () => {
  preloader.destroy();
};
