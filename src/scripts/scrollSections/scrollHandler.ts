import vevet from '../config/vevet';
import { IState } from './types';

const itemInnerScroll = (item: HTMLElement, permissionProp: IState) => {
  const child = item.children[0] as HTMLElement | null;
  const permission = permissionProp;

  if (!child) {
    return;
  }

  // item.addEventListener('scroll', () => {
  //   document.body.classList.add('scrollable');
  // });

  item.addEventListener('wheel', () => {
    if (!item.classList.contains('active')) {
      permission.isCanScrollDown = false;
      permission.isCanScrollUp = false;
      return;
    }

    const rect = child.getBoundingClientRect();
    const windowHeight = vevet.viewport.height;

    if (Math.floor(rect.bottom) <= windowHeight) {
      permission.isCanScrollDown = true;

      // console.log('down!');
      // console.log(permission);
      return;
    }
    permission.isCanScrollDown = false;

    if (rect.top >= 0) {
      permission.isCanScrollUp = true;
      // console.log('up');
    } else {
      permission.isCanScrollUp = false;
    }
  });
};

const scrollEvent = (
  evt: WheelEvent,
  stateProp: IState,
  itemArray: NodeListOf<HTMLElement>
) => {
  const state = stateProp;

  if (evt.deltaY < 0) {
    if (state.scrollingIndex !== 0 && state.isCanScrollUp) {
      state.scrollingIndex -= 1;
      state.timelines[state.scrollingIndex].reverse();
    }
  } else if (evt.deltaY > 0) {
    if (state.scrollingIndex < itemArray.length - 1 && state.isCanScrollDown) {
      // console.log('working!!!!');

      state.timelines[state.scrollingIndex].play();
      state.scrollingIndex += 1;
    }
  }

  if (itemArray[state.scrollingIndex].classList.contains('with-scroll')) {
    document.body.classList.add('scrollable');
  } else {
    document.body.classList.remove('scrollable');
  }

  // if (itemArray[state.scrollingIndex]) {
  //   itemArray.forEach((item, index) => {
  //     if (index === state.scrollingIndex) {
  //       item.classList.add('active');
  //     } else {
  //       item.classList.remove('active');
  //     }
  //   });
  // }
};

const scrollHandler = (
  container: HTMLElement,
  wrapper: HTMLElement,
  itemArray: NodeListOf<HTMLElement>,
  stateProp: IState
) => {
  const state = stateProp;

  itemArray[state.scrollingIndex].classList.add('active');

  if (itemArray[state.scrollingIndex].classList.contains('with-scroll')) {
    document.body.classList.add('scrollable');
  }

  itemArray.forEach((item) => {
    itemInnerScroll(item, state);
  });

  container.addEventListener('wheel', (evt) => {
    if (state.isCanScrolling) {
      scrollEvent(evt, state, itemArray);

      setTimeout(() => {
        state.isCanScrolling = true;
      }, state.duration / 3);
    }
    // console.log(vevet.viewport.height);

    state.isCanScrolling = false;
  });
};

export default scrollHandler;
