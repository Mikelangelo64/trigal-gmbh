import useObserver from '../config/useObserver';

const isViewedHandler = (className: string) => {
  const domArray = document.querySelectorAll<HTMLElement>(`.${className}`);

  if (domArray.length === 0) {
    return;
  }

  domArray.forEach((item) => {
    useObserver({
      target: item,
      callbackIn: () => {
        item.classList.add('viewed');
      },
      callbackOut: () => {
        item.classList.remove('viewed');
      }
    });
  });
};

export const isVideoViewedHandler = (sectionClassName: string) => {
  const domArray = document.querySelectorAll<HTMLElement>(
    `.${sectionClassName}`
  );

  if (domArray.length === 0) {
    return;
  }

  domArray.forEach((container) => {
    const videoArray = container.querySelectorAll<HTMLVideoElement>('video');

    if (videoArray.length === 0) {
      return;
    }

    videoArray.forEach((video) => {
      useObserver({
        target: video,
        callbackIn: () => {
          video.play();
          video.classList.add('viewed');
        },
        callbackOut: () => {
          video.pause();
          video.classList.remove('viewed');
        }
      });
    });
  });
};

export default isViewedHandler;
