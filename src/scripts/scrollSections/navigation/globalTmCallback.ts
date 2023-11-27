import { IState } from '../types';
import { addClassSpecialButtons } from './utils';

export const globalTimelineHandler = (
  state: IState,
  buttons: HTMLButtonElement[],
  button: HTMLButtonElement,
  index: number,
  wrapper: HTMLElement,
  itemArray: NodeListOf<HTMLElement>
) => {
  state.timelines[index].addCallback('progress', ({ progress }) => {
    if (state.isNavigationEvent) {
      return;
    }

    wrapper.classList.add('progress');

    buttons.forEach((item) => {
      item.classList.add('progress');
    });

    itemArray.forEach((item) => {
      addClassSpecialButtons(item, 'progress', 'add');
    });

    if (progress === 0 || progress === 1) {
      wrapper.classList.remove('progress');

      buttons.forEach((item) => {
        item.classList.remove('progress');
      });

      itemArray.forEach((item) => {
        addClassSpecialButtons(item, 'progress', 'remove');
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
