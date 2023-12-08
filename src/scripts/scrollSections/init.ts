import debounce from '../config/debounce';
import makeGlobalTimeline from './makeTimeline';
import navigationInit from './navigation/navigationInit';
import recalculateHeight, {
  changeInnerItemPosition
} from './recalculateHeight';
import scrollHandler from './scrollHandler';
import scrollbarFix from './scrollbarFix';
import { IState } from './types';

const initScrollSections = () => {
  const containerArray =
    document.querySelectorAll<HTMLElement>('.scroll-container');

  const stateArray: IState[] = [];

  if (containerArray.length === 0) {
    return { containerArray: [], stateArray };
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
      previousIndex: 0,
      timelines: [],
      duration: 600,
      resizeCallback: () => {}
    };

    const timelines = makeGlobalTimeline({
      wrapperProp: wrapper,
      itemArray,
      stateProp: state
    });

    state.timelines = timelines;
    // state.timeline.play();

    scrollbarFix(itemArray);
    changeInnerItemPosition(itemArray);
    scrollHandler(container, wrapper, itemArray, state);
    navigationInit(container, wrapper, itemArray, state);
    // specialScrollInit(container, wrapper, itemArray, state);

    const resizeCallback = () => {
      scrollbarFix(itemArray);
      changeInnerItemPosition(itemArray);
      recalculateHeight(wrapper, state.scrollingIndex);
    };

    state.resizeCallback = resizeCallback;

    window.addEventListener(
      'resize',
      debounce({
        callback: () => {
          state.resizeCallback();
          // scrollbarFix(itemArray);
          // changeInnerItemPosition(itemArray);
          // recalculateHeight(wrapper, state.scrollingIndex);
        }
      })
    );

    stateArray.push(state);
  });

  return { containerArray: Array.from(containerArray), stateArray };
};

export default initScrollSections;
