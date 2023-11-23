import debounce from '../config/debounce';
import makeGlobalTimeline from './makeTimeline';
import navigationInit from './navigationInit';
import recalculateHeight, {
  changeInnerItemPosition
} from './recalculateHeight';
import scrollHandler from './scrollHandler';
import scrollbarFix from './scrollbarFix';
import { IState } from './types';

const initScrollSections = () => {
  const containerArray =
    document.querySelectorAll<HTMLElement>('.scroll-container');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const wrapper = container.querySelector<HTMLElement>(
      '.scroll-container__wrapper'
    );

    const itemArray = container.querySelectorAll<HTMLElement>(
      '.scroll-container__item'
    );

    if (!wrapper || itemArray.length === 0) {
      return;
    }

    const state: IState = {
      isCanScrollUp: false,
      isCanScrollDown: false,
      isCanScrolling: true,
      isNavigationEvent: false,
      scrollingIndex: 0,
      timelines: [],
      duration: 600
    };

    const timelines = makeGlobalTimeline({
      wrapperProp: wrapper,
      itemArray,
      state
    });

    state.timelines = timelines;
    // state.timeline.play();

    scrollbarFix(itemArray);
    changeInnerItemPosition(itemArray);
    scrollHandler(container, wrapper, itemArray, state);
    navigationInit(container, wrapper, itemArray, state);

    window.addEventListener(
      'resize',
      debounce({
        callback: () => {
          scrollbarFix(itemArray);
          changeInnerItemPosition(itemArray);
          recalculateHeight(wrapper, state.scrollingIndex);
        }
      })
    );
  });
};

export default initScrollSections;
