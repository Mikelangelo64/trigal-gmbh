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

    const hideContainer =
      container.querySelector<HTMLElement>('.header-search');
    if (!hideContainer) {
      return;
    }

    const additionalHeight = hideContainer.getBoundingClientRect().height;
    document
      .querySelector('html')
      ?.style.setProperty(
        '--additional-header-height',
        `${additionalHeight}px`
      );
  }
};

export default findHeight;
