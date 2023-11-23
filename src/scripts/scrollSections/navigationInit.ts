import { Timeline } from 'vevet';
import { IState } from './types';
import vevet from '../config/vevet';

const createDom = (
  container: HTMLElement,
  itemArray: NodeListOf<HTMLElement>
) => {
  const buttons: HTMLButtonElement[] = [];
  const wrapperDom = document.createElement('div');
  wrapperDom.classList.add('scroll-container-navigation');

  itemArray.forEach((item) => {
    const button = document.createElement('button');
    button.classList.add('scroll-container-navigation__button');

    if (item.classList.contains('active')) {
      button.classList.add('active');
    }

    buttons.push(button);
    wrapperDom.appendChild(button);
  });

  container.appendChild(wrapperDom);
  return { wrapperDom, buttons };
};

// const buttonHandler = (
//   evt: MouseEvent,
//   index: number,
//   stateProp: IState,
//   length: number,
//   wrapperProp: HTMLElement,
//   itemArray: NodeListOf<HTMLElement>
// ) => {
//   evt.preventDefault();

//   const wrapper = wrapperProp;
//   const state = stateProp;

//   const timelineNav = new Timeline({
//     duration: 1000,
//     easing: [0.25, 0.1, 0.25, 1],
//     shouldDestroyOnEnd: true
//   });

//   const scopes = spreadScope(length, 0.0);

//   const differ = index - state.scrollingIndex;
//   const prevIndex = state.scrollingIndex;
//   state.scrollingIndex = index;

//   if (differ === 0) {
//     return;
//   }

//   console.log(differ);

//   timelineNav.addCallback('progress', ({ progress }) => {
//     itemArray.forEach((item) => {
//       item.classList.add('progress');
//     });

//     const value =
//       -1 *
//       (vevet.viewport.height * prevIndex +
//         vevet.viewport.height * progress * differ);

//     wrapper.style.transform = `translate(0, ${value}px)`;
//   });

//   timelineNav.addCallback('start', () => {
//     itemArray[prevIndex].classList.remove('active');
//   });

//   timelineNav.addCallback('end', () => {
//     itemArray.forEach((item) => {
//       item.classList.remove('progress');
//     });

//     itemArray[state.scrollingIndex].classList.add('active');
//   });

//   timelineNav.play();

//   // if (state.timelines[index - 1]) {
//   //   state.timelines[index - 1].play();
//   // } else {
//   //   state.timelines[0].reverse();
//   // }
// };

const globalTimelineHandler = (
  state: IState,
  buttons: HTMLButtonElement[],
  button: HTMLButtonElement,
  index: number,
  wrapper: HTMLElement
) => {
  state.timelines[index].addCallback('progress', ({ progress }) => {
    if (state.isNavigationEvent) {
      return;
    }

    wrapper.classList.add('progress');
    buttons.forEach((item) => {
      item.classList.add('progress');
    });

    if (progress === 0 || progress === 1) {
      wrapper.classList.remove('progress');
      buttons.forEach((item) => {
        item.classList.remove('progress');
      });
    }
  });

  state.timelines[index].addCallback('start', () => {
    if (state.isNavigationEvent) {
      return;
    }

    if (state.timelines[index].isReversed) {
      buttons[index].classList.add('active');
    } else {
      buttons[index].classList.remove('active');
    }
  });

  state.timelines[index].addCallback('end', () => {
    if (state.isNavigationEvent) {
      return;
    }

    if (state.timelines[index].isReversed) {
      buttons.forEach((otherItem) => {
        otherItem.classList.remove('active');
      });
    } else {
      buttons[state.scrollingIndex].classList.add('active');
    }
  });
};

const navigationInit = (
  container: HTMLElement,
  wrapperProp: HTMLElement,
  itemArray: NodeListOf<HTMLElement>,
  stateProp: IState
) => {
  const { buttons } = createDom(container, itemArray);
  const wrapper = wrapperProp;
  const state = stateProp;

  buttons.forEach((button, index) => {
    globalTimelineHandler(state, buttons, button, index, wrapper);

    button.addEventListener('click', (evt) => {
      // buttonHandler(evt, index, state, buttons, wrapper, itemArray);

      evt.preventDefault();
      state.isNavigationEvent = true;

      const timelineNav = new Timeline({
        duration: 1000,
        easing: [0.25, 0.1, 0.25, 1],
        shouldDestroyOnEnd: true
      });

      // const scopes = spreadScope(buttons.length, 0.0);

      const differ = index - state.scrollingIndex;
      const prevIndex = state.scrollingIndex;
      state.scrollingIndex = index;

      if (differ === 0) {
        return;
      }

      timelineNav.addCallback('progress', ({ progress }) => {
        itemArray.forEach((item) => {
          item.classList.add('progress');
        });
        buttons.forEach((item) => {
          item.classList.add('progress');
        });

        // if (progress === 1) {
        //   state.isCanScrolling = true;
        // }

        const value =
          -1 *
          (vevet.viewport.height * prevIndex +
            vevet.viewport.height * progress * differ);

        wrapper.style.transform = `translate(0, ${value}px)`;
      });

      timelineNav.addCallback('start', () => {
        state.isCanScrolling = false;

        wrapper.classList.add('progress');

        itemArray[prevIndex].classList.remove('active');
        buttons[prevIndex].classList.remove('active');
      });

      timelineNav.addCallback('end', () => {
        state.isCanScrolling = true;

        wrapper.classList.remove('progress');

        itemArray.forEach((item) => {
          item.classList.remove('progress');
        });
        buttons.forEach((item) => {
          item.classList.remove('progress');
        });

        itemArray[state.scrollingIndex].classList.add('active');
        buttons[state.scrollingIndex].classList.add('active');

        if (differ > 0) {
          state.timelines.forEach((timelineProp, indexTl) => {
            const timeline = timelineProp;
            if (indexTl < index) {
              timeline.progress = 1;
            }
          });

          return;
        }

        state.timelines
          .slice()
          .reverse()
          .forEach((timelineProp, indexTl) => {
            const timeline = timelineProp;

            if (indexTl > index) {
              timeline.progress = 0;
            }
          });
      });

      timelineNav.play();
    });
  });
  // console.log(wrapperNavigation, buttons, timelines);
};

export default navigationInit;
