import { Timeline } from 'vevet';
import { addClassSpecialButtons } from './utils';
import { IAddNestedCallbacks, ICreateNestedTimelines } from '../types';

export const createNestedTimelines = ({
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

export const addNestedCallbacks = ({
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

      if (itemArray[state.scrollingIndex].classList.contains('with-scroll')) {
        document.body.classList.add('scrollable');
      } else {
        document.body.classList.remove('scrollable');
      }
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
