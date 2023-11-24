import vevet from '../config/vevet';
import { IState } from './types';

const itemInnerScroll = (item: HTMLElement, permissionProp: IState) => {
  const child = item.children[0] as HTMLElement | null;
  const permission = permissionProp;

  if (!child) {
    return;
  }

  item.addEventListener('wheel', () => {
    // console.log(permission.isCanScrollDown, permission.isCanScrollUp);

    if (item.classList.contains('centered')) {
      permission.isCanScrollDown = true;
      permission.isCanScrollUp = true;
    }

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

    // console.log(rect.top);

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
  state.isNavigationEvent = false;

  if (evt.deltaY < 0) {
    if (state.scrollingIndex !== 0 && state.isCanScrollUp) {
      if (itemArray[state.scrollingIndex].classList.contains('special')) {
        return;
      }

      state.scrollingIndex -= 1;
      state.timelines[state.scrollingIndex].reverse();
    }
  } else if (evt.deltaY > 0) {
    if (state.scrollingIndex < itemArray.length - 1 && state.isCanScrollDown) {
      if (itemArray[state.scrollingIndex + 1].classList.contains('special')) {
        return;
      }

      state.scrollingIndex += 1;
      state.timelines[state.scrollingIndex - 1].play();
    }
  }

  if (itemArray[state.scrollingIndex].classList.contains('with-scroll')) {
    document.body.classList.add('scrollable');
  } else {
    document.body.classList.remove('scrollable');
  }
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
      if (state.isNavigationEvent) {
        // console.log(state.scrollingIndex);
        state.isCanScrolling = false;
        return;
      }

      state.timelines.forEach((timeline, index) => {
        if (index === state.scrollingIndex) {
          if (timeline.progress === 0) {
            timeline.addCallback(
              'start',
              () => {
                // console.log('start', index, state.scrollingIndex);
                state.isCanScrolling = false;
              },
              { isOnce: true }
            );

            timeline.addCallback(
              'end',
              () => {
                // console.log('end', index);
                state.isCanScrolling = true;
              },
              { isOnce: true }
            );
          }
          return;
        }

        if (index === state.scrollingIndex - 1) {
          if (timeline.progress === 1) {
            timeline.addCallback(
              'start',
              () => {
                // console.log('start reverse', index);
                state.isCanScrolling = true;
              },
              { isOnce: true }
            );

            timeline.addCallback(
              'end',
              () => {
                // console.log('end reverse', index);
                state.isCanScrolling = false;
              },
              { isOnce: true }
            );
          }
        }
      });

      scrollEvent(evt, state, itemArray);

      // setTimeout(() => {
      //   state.isCanScrolling = true;
      // }, state.duration / 3);
    }
    // console.log(vevet.viewport.height);

    // state.isCanScrolling = false;
  });
};

export default scrollHandler;
