import vevet from '../config/vevet';

const findHeight = (header: HTMLElement) => {
  if (
    vevet.isMobile ||
    document.querySelector('html')?.classList.contains('shop')
  ) {
    const container = header.querySelector('.header__container');

    if (!container) {
      return;
    }

    const startedHeight = container.getBoundingClientRect().height;
    document
      .querySelector('html')
      ?.style.setProperty('--started-header-height', `${startedHeight}px`);
  }
};

export default findHeight;
