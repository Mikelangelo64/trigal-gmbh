import { Timeline } from 'vevet';
import { IState } from '../types';
import { createDom } from './utils';
import { globalTimelineHandler } from './globalTmCallback';
import { addNestedCallbacks, createNestedTimelines } from './nestedTimelines';

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
    globalTimelineHandler(state, buttons, button, index, wrapper, itemArray);

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
