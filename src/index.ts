// import { Preloader } from 'vevet';
import { init } from '@/scripts/main';
// import '@/scripts/video';
// import '@/styles/styles.scss';
// import 'normalize.css/normalize.css';
import vevet from './scripts/config/vevet';
import { Preloader } from 'vevet';

// document.addEventListener('DOMContentLoaded', () => {
//   init();
// });
// eslint-disable-next-line no-new
const preloader = new Preloader({
  container: '#v-preloader',
  hideAnimation: 2000
});

preloader.addCallback('hidden', () => {
  if (!preloader.container) {
    return;
  }

  preloader.container.classList.add('hidden');
});

vevet.pageLoad.onLoad(() => {
  init();
});
