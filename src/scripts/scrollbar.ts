import { ScrollBar } from 'vevet';
import vevet from './config/vevet';

const sectionScroll = () => {
  const containerArray =
    document.querySelectorAll<HTMLElement>('.scroll-container');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const elementArray = container.querySelectorAll<HTMLElement>(
      '.scroll-container__item'
    );

    const wrapper = container.querySelector<HTMLElement>(
      '.scroll-container__wrapper'
    );

    if (elementArray.length === 0 || !wrapper) {
      return;
    }

    elementArray.forEach((element) => {
      const scrollbar = new ScrollBar({
        container: element
      });

      // console.log(scrollbar);
      return scrollbar;
    });
  });
};

const scrollBarInit = () => {
  let scrollBar;
  if (!vevet.isMobile) {
    scrollBar = new ScrollBar({ container: window });
    sectionScroll();
  }

  return scrollBar;
};

export default scrollBarInit;
