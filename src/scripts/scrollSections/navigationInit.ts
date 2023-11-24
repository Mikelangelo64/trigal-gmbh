import { Timeline } from 'vevet';
import { IAddNestedCallbacks, ICreateNestedTimelines, IState } from './types';

const createDom = (
  container: HTMLElement,
  itemArray: NodeListOf<HTMLElement>
) => {
  const buttons: HTMLButtonElement[] = [];
  const wrapperDom = document.createElement('div');
  wrapperDom.classList.add('scroll-container-navigation');

  itemArray.forEach((item) => {
    if (item.classList.contains('special')) {
      return;
    }

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
      // console.log(state.scrollingIndex);
      buttons[state.scrollingIndex]?.classList.add('active');
    }
  });
};

const createNestedTimelines = ({
  isReversed,
  state,
  differ,
  prevIndex,
  indexBn,
  nestdTmArray
}: ICreateNestedTimelines) => {
  state.timelines.forEach((timelineGlobalProp, indexTimeline) => {
    const timelineGlobal = timelineGlobalProp;

    const IsShouldReturn: boolean = isReversed
      ? indexTimeline < indexBn || indexTimeline >= prevIndex
      : indexTimeline < prevIndex || indexTimeline >= indexBn;

    if (IsShouldReturn) {
      return;
    }

    const nestedTm = new Timeline({
      duration: state.duration / Math.abs(differ),
      easing: [0.25, 0.1, 0.25, 1],
      shouldDestroyOnEnd: true
    });

    nestedTm.addCallback('progress', ({ progress }) => {
      if (isReversed) {
        timelineGlobal.progress = 1 - progress;
      } else {
        timelineGlobal.progress = progress;
      }
    });

    nestdTmArray.push(nestedTm);
  });
};

const addNestedCallbacks = ({
  itemArray,
  buttons,
  wrapperProp,
  timeline,
  stateProp,
  prevIndex,
  indexTm,
  indexBn,
  currentTimelineArray,
  isSpecial = false
}: IAddNestedCallbacks) => {
  const state = stateProp;
  const wrapper = wrapperProp;

  const addClassSpecialButtons = (
    section: HTMLElement,
    className: string,
    doing: 'add' | 'remove' | 'toggle'
  ) => {
    if (!section.classList.contains('special')) {
      return;
    }

    const name = section.dataset.section;
    if (!name || name === '') {
      return;
    }

    const buttonSpecialArray = document.querySelectorAll<HTMLButtonElement>(
      `.scroll-control[data-section="${name}"]`
    );

    buttonSpecialArray.forEach((specialButton) => {
      if (doing === 'add') {
        specialButton.classList.add(className);
      } else if (doing === 'toggle') {
        specialButton.classList.toggle(className);
      } else {
        specialButton.classList.remove(className);
      }
    });
  };

  if (indexTm === 0) {
    const startHandler = () => {
      state.isCanScrolling = false;

      if (buttons[prevIndex]) {
        buttons[prevIndex].classList.remove('active');
      } else {
        buttons
          .find((item) => item.classList.contains('active'))
          ?.classList.remove('active');
      }

      if (itemArray[prevIndex]) {
        itemArray[prevIndex].classList.remove('active');
      } else {
        Array.from(itemArray)
          .find((item) => item.classList.contains('active'))
          ?.classList.remove('active');
      }

      // itemArray[prevIndex].classList.remove('active');

      wrapper.classList.add('progress');

      if (isSpecial) {
        wrapper.classList.toggle('special');
      } else {
        wrapper.classList.remove('special');
      }

      buttons.forEach((item) => {
        item.classList.add('progress');
      });

      itemArray.forEach((item) => {
        item.classList.add('progress');

        addClassSpecialButtons(item, 'progress', 'add');
      });
    };

    if (isSpecial) {
      const specialTimeline = new Timeline({
        duration: state.duration / 3,
        easing: [0.25, 0.1, 0.25, 1],
        shouldDestroyOnEnd: true
      });

      specialTimeline.addCallback('progress', ({ progress }) => {
        state.isCanScrolling = false;

        wrapper.style.opacity = `${1 - progress}`;
      });

      specialTimeline.addCallback('start', () => {
        startHandler();
      });

      specialTimeline.addCallback('end', () => {
        // console.log('special!');

        timeline.play();
      });

      specialTimeline.play();
    } else {
      timeline.addCallback('start', () => {
        startHandler();
      });

      timeline.play();
    }
  }
  // console.log(timeline);

  if (!currentTimelineArray[indexTm + 1]) {
    const endHandler = () => {
      state.isCanScrolling = true;
      state.isNavigationEvent = false;

      if (buttons[indexBn]) {
        buttons[indexBn].classList.add('active');
      } else {
        buttons[prevIndex]?.classList.add('active');
      }

      itemArray[indexBn].classList.add('active');

      wrapper.classList.remove('progress');

      buttons.forEach((item) => {
        item.classList.remove('progress');
      });

      itemArray.forEach((item) => {
        item.classList.remove('progress');

        addClassSpecialButtons(item, 'progress', 'remove');

        if (isSpecial) {
          addClassSpecialButtons(item, 'active', 'toggle');
        } else {
          addClassSpecialButtons(item, 'active', 'remove');
        }
      });
    };

    const specialTimeline = new Timeline({
      duration: state.duration,
      easing: [0.25, 0.1, 0.25, 1],
      shouldDestroyOnEnd: true
    });

    specialTimeline.addCallback('progress', ({ progress }) => {
      wrapper.style.opacity = `${progress}`;
    });

    specialTimeline.addCallback('end', () => {
      endHandler();
    });

    timeline.addCallback('end', () => {
      if (isSpecial) {
        specialTimeline.play();
      } else {
        endHandler();
        specialTimeline.destroy();
      }
    });

    return;
  }

  timeline.addCallback('end', () => {
    currentTimelineArray[indexTm + 1].play();
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

      const differ = index - state.scrollingIndex;
      const prevIndex = state.scrollingIndex;
      state.previousIndex = prevIndex;
      state.scrollingIndex = index;

      if (differ === 0) {
        return;
      }

      // const scopes = spreadScope(Math.abs(differ), 0.0);
      const nestdTmArray: Timeline[] = [];

      createNestedTimelines({
        isReversed: differ < 0,
        state,
        differ,
        prevIndex,
        indexBn: index,
        nestdTmArray
      });

      if (differ > 0) {
        nestdTmArray.forEach((timeline, indexTm, array) => {
          addNestedCallbacks({
            itemArray,
            buttons,
            wrapperProp,
            timeline,
            stateProp: state,
            prevIndex,
            indexTm,
            indexBn: index,
            currentTimelineArray: array
          });
        });
      } else {
        nestdTmArray
          .slice()
          .reverse()
          .forEach((timeline, indexTm, array) => {
            addNestedCallbacks({
              itemArray,
              buttons,
              wrapperProp,
              timeline,
              stateProp: state,
              prevIndex,
              indexTm,
              indexBn: index,
              currentTimelineArray: array
            });
          });
      }
    });
  });
  // console.log(wrapperNavigation, buttons, timelines);

  const specialArray = Array.from(itemArray).filter((item) =>
    item.classList.contains('special')
  );

  specialArray.forEach((section) => {
    const name = section.dataset.section;
    if (!name || name === '') {
      return;
    }

    const buttonArray = document.querySelectorAll<HTMLButtonElement>(
      `.scroll-control[data-section="${name}"]`
    );

    if (buttonArray.length === 0) {
      return;
    }

    const indexGlobal = Array.from(itemArray).findIndex(
      (item) => item === section
    );

    buttonArray.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        state.isNavigationEvent = true;
        let isReverse = false;

        let differ = indexGlobal - state.scrollingIndex;

        const prevIndex = state.scrollingIndex;

        if (prevIndex === indexGlobal) {
          isReverse = true;
        }

        if (isReverse) {
          state.scrollingIndex = state.previousIndex;
          state.previousIndex = prevIndex;
          differ = state.scrollingIndex - state.previousIndex;
        } else {
          state.previousIndex = prevIndex;
          state.scrollingIndex = indexGlobal;
        }
        // console.log(prevIndex);

        if (differ === 0) {
          return;
        }

        const nestdTmArray: Timeline[] = [];

        createNestedTimelines({
          isReversed: differ < 0,
          state,
          differ,
          prevIndex: state.previousIndex,
          indexBn: state.scrollingIndex,
          nestdTmArray
        });

        if (differ > 0) {
          nestdTmArray.forEach((timeline, indexTm, array) => {
            addNestedCallbacks({
              itemArray,
              buttons,
              wrapperProp,
              timeline,
              stateProp: state,
              prevIndex: state.previousIndex,
              indexTm,
              indexBn: state.scrollingIndex,
              currentTimelineArray: array,
              isSpecial: true
            });
          });
        } else {
          nestdTmArray
            .slice()
            .reverse()
            .forEach((timeline, indexTm, array) => {
              addNestedCallbacks({
                itemArray,
                buttons,
                wrapperProp,
                timeline,
                stateProp: state,
                prevIndex: state.previousIndex,
                indexTm,
                indexBn: state.scrollingIndex,
                currentTimelineArray: array,
                isSpecial: true
              });
            });
        }

        // console.log(state.scrollingIndex, indexGlobal);
      });
    });
  });
};

export default navigationInit;
