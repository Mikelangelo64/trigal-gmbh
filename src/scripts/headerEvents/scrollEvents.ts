import debounce from '../config/debounce';
import vevet from '../config/vevet';

const scrollEventsHandler = () => {
  if (
    vevet.isMobile ||
    document.querySelector('html')?.classList.contains('shop')
  ) {
    const header = document.querySelector<HTMLElement>('.header');
    const footer = document.querySelector<HTMLElement>('.footer');
    // const headerHeight = header ? header.offsetHeight : 0;
    let isScrolled = false;
    let prevScroll = window.scrollY;

    if (header || footer) {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
        footer?.classList.add('scrolled');
        isScrolled = true;
      }

      window.addEventListener(
        'scroll',
        debounce({
          wait: 60,
          callback: () => {
            if (prevScroll < window.scrollY) {
              header?.classList.remove('scroll-up');
              footer?.classList.remove('scroll-up');

              header?.classList.add('scroll-down');
              footer?.classList.add('scroll-down');
              // console.log('down');
            }

            if (prevScroll > window.scrollY) {
              header?.classList.remove('scroll-down');
              footer?.classList.remove('scroll-down');

              header?.classList.add('scroll-up');
              footer?.classList.add('scroll-up');
              // console.log('up');
            }
            // console.log(prevScroll, window.scrollY);

            prevScroll = window.scrollY;

            if (window.scrollY > 20 && !isScrolled) {
              header?.classList.add('scrolled');
              footer?.classList.add('scrolled');
              isScrolled = true;
              return;
            }

            if (window.scrollY <= 20 && isScrolled) {
              header?.classList.remove('scrolled');
              footer?.classList.remove('scrolled');
              isScrolled = false;
            }
          }
        })
      );
    }
  }
};

export default scrollEventsHandler;
