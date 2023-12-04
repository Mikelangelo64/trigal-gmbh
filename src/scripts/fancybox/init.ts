import { Fancybox } from '@fancyapps/ui';

const fancyboxInit = () => {
  const galleryArray = document.querySelectorAll<HTMLElement>(
    '.gallery .gallery-slider'
  );

  if (galleryArray.length === 0) {
    return;
  }

  galleryArray.forEach((item, index) => {
    Fancybox.bind(`[data-fancybox="gallery-${index}"]`, {
      ...Fancybox.defaults,
      dragToClose: false,
      backdropClick: 'close',
      compact: false,

      Images: {
        // Disable animation from/to thumbnail on start/close
        zoom: false
      },

      Toolbar: {
        absolute: true,
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      },

      Thumbs: {
        type: 'classic'
      },

      Carousel: {
        transition: 'crossfade',
        breakpoints: {
          '(max-width: 900px)': {
            Navigation: false
          }
        }
      }
    });
  });
};

export default fancyboxInit;
