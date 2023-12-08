import { Timeline } from 'vevet';
import { IScrollSectionState } from '../main';

const itemHandler = (
  container: HTMLElement,
  isLabelClick: boolean,
  scrollState: IScrollSectionState
) => {
  const elements = container.querySelectorAll<HTMLElement>('.accordion__item');

  if (elements.length === 0) {
    return;
  }

  let arrowClass = '.accordion__summary';

  if (isLabelClick) {
    arrowClass = '.accordion__label';
  }

  elements.forEach((element) => {
    const arrow = element.querySelector<HTMLButtonElement>(`${arrowClass}`);
    const body = element.querySelector<HTMLElement>('.accordion__details');

    if (!arrow || !body) {
      return;
    }

    const bodyInner = body.querySelector<HTMLElement>(
      '.accordion__description'
    );
    if (!bodyInner) {
      return;
    }

    const timeline = new Timeline({ duration: 400 });
    timeline.addCallback('progress', ({ easing, progress }) => {
      const height =
        progress === 1 ? 'auto' : `${bodyInner.clientHeight * easing}px`;

      body.style.height = height;
      body.style.opacity = `${easing}`;
    });

    timeline.addCallback('start', () => {
      scrollState.stateArray.forEach((state) => {
        state.resizeCallback();
      });
    });

    timeline.addCallback('end', () => {
      scrollState.stateArray.forEach((state) => {
        state.resizeCallback();
      });
    });

    arrow.addEventListener('click', () => {
      element.classList.toggle('_active');

      if (timeline.progress > 0) {
        timeline.reverse();
      } else {
        timeline.play();
      }
    });
  });
};

const accordionInit = (scrollState: IScrollSectionState) => {
  const containerArray = document.querySelectorAll<HTMLElement>('.accordion');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const isLabelClick = container.dataset.isLabelClick === 'true';
    itemHandler(container, isLabelClick, scrollState);
  });
};

export default accordionInit;
