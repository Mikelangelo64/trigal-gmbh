import { Timeline } from 'vevet';
import vevet from '../config/vevet';
import { IState } from './types';

interface IMakeTimeline {
  wrapperProp: HTMLElement;
  itemArray: NodeListOf<HTMLElement>;
  state: IState;
}

// const makeGlobalTimelineOld = ({
//   wrapperProp,
//   itemArray,
//   stateProp
// }: IMakeTimeline) => {
//   const wrapper = wrapperProp;
//   const state = stateProp;
//   // console.log(1);

//   const timeline = new Timeline({
//     duration: 6000 * itemArray.length,
//     easing: [1, -0.5, 0]
//   });

//   const nestedTmArray: BaseTimeline[] = [];

//   const scopes = spreadScope(itemArray.length, 0.0);
//   console.log(scopes);

//   itemArray.forEach((item, index) => {
//     const nestedTm = new BaseTimeline({
//       nestedScope: scopes[index],
//       easing: [0.25, 0.1, 0.25, 1]
//     });

//     nestedTmArray.push(nestedTm);

//     nestedTm.addCallback('progress', ({ progress }) => {
//       // console.log(index, progress);

//       // console.log(
//       //   index,
//       //   index - 1 !== -1 && nestedTmArray[index - 1].progress === 1
//       // );

//       if (progress === 0 || progress === 1) {
//         // console.log(index);

//         return;
//       }
//       // console.log(
//       //   index,
//       //   Math.floor(timeline.progress * 1000) / 1000 ===
//       //     Math.floor(scopes[index][1] * 1000) / 1000
//       //   // index + 1 < nestedTmArray.length &&
//       //   //   timeline.progress > scopes[index][1] + 0.01
//       // );
//       // console.log(
//       //   index,
//       //   vevet.viewport.height * index + vevet.viewport.height * progress
//       // );

//       // itemArray[state.scrollingIndex].classList.add('progress');

//       state.value =
//         -1 * (vevet.viewport.height * index + vevet.viewport.height * progress);

//       // if (progress === 1) {
//       //   console.log('STOP');

//       //   timeline.pause();
//       // }
//     });
//     timeline.addNestedTimeline(nestedTm);
//   });

//   timeline.addCallback('progress', ({ progress }) => {
//     wrapper.style.transform = `translate(0, ${state.value}px)`;
//     // console.log(
//     //   progress,
//     //   scopes[state.scrollingIndex][1],
//     //   (state.scrollingIndex + 1) / itemArray.length
//     // );
//     // console.log(
//     //   Math.floor(timeline.progress * 1000) / 1000 ===
//     //     Math.floor(((state.scrollingIndex + 1) / itemArray.length) * 1000) /
//     //       1000
//     // );
//     // if (
//     //   Math.floor(progress * 1000) / 1000 ===
//     //   Math.floor(((state.scrollingIndex + 1) / itemArray.length) * 1000) / 1000
//     // ) {
//     //   console.log('stop');
//     //   state.scrollingIndex += 1;
//     //   timeline.pause();
//     // }
//     // itemArray.forEach((item, index) => {
//     //   if (
//     //     Math.floor(progress * 1000) / 1000 ===
//     //     Math.floor(scopes[index][1] * 1000) / 1000
//     //   ) {
//     //     console.log('stop');
//     //     timeline.pause();
//     //   }
//     // });
//     // if (Math.floor(progress * 1000) / 1000 === 0.78) {
//     //   timeline.pause();
//     // }
//     // itemArray.forEach((item, index) => {
//     //   // console.log(
//     //   //   Math.floor(progress * 1000) / 1000,
//     //   //   Math.floor(((index + 1) / itemArray.length) * 1000) / 1000 - 0.001,
//     //   //   Math.floor(progress * 1000) / 1000 ===
//     //   //     Math.floor(((index + 1) / itemArray.length) * 1000) / 1000 - 0.001
//     //   // );
//     //   // if (
//     //   //   Math.floor(progress * 1000) / 1000 ===
//     //   //   Math.floor((index / itemArray.length) * 1000) / 1000 - 0.001
//     //   // ) {
//     //   //   console.log('paused');
//     //   //   timeline.pause();
//     //   // }
//     // });
//   });

//   // timeline.addCallback('progress', ({ easing }) => {
//   //   wrapper.style.transform = `translateY(${
//   //     -1 * vevet.viewport.height * state.scrollingIndex * easing
//   //   }px)`;
//   // });

//   // timeline.addCallback('end', () => {
//   //   state.isCanScrollDown = false;
//   //   state.isCanScrollUp = false;
//   //   state.isCanScrolling = true;

//   //   if (itemArray[state.scrollingIndex]) {
//   //     itemArray.forEach((item, index) => {
//   //       if (index === state.scrollingIndex) {
//   //         item.classList.add('active');
//   //       } else {
//   //         item.classList.remove('active');
//   //       }
//   //     });
//   //   }
//   // });

//   return timeline;
// };

const makeGlobalTimeline = ({
  wrapperProp,
  itemArray,
  state
}: IMakeTimeline) => {
  const wrapper = wrapperProp;
  const timelines: Timeline[] = [];

  itemArray.forEach((item, index) => {
    const timeline = new Timeline({
      duration: state.duration,
      easing: [1.0, 1.0, 0.0, 0.0]
      // easing: [0.25, 0.1, 0.25, 1]
    });

    timeline.addCallback('progress', ({ easing }) => {
      // if (state.isNavigationEvent) {
      //   return;
      // }

      // item.classList.add('progress');
      // console.log(index, progress);

      // if (itemArray[index + 1]) {
      //   // itemArray[index + 1].classList.add('progress');
      // } else {
      //   // itemArray[itemArray.length - 1].classList.add('progress');
      // }

      // if (progress === 0 || progress === 1) {
      //   item.classList.remove('progress');

      //   if (itemArray[index + 1]) {
      //     itemArray[index + 1].classList.remove('progress');
      //   } else {
      //     itemArray[itemArray.length - 1].classList.remove('progress');
      //   }
      // }

      wrapper.style.transform = `translateY(${
        -1 * (vevet.viewport.height * index + vevet.viewport.height * easing)
      }px)`;
    });

    timeline.addCallback('start', () => {
      if (state.isNavigationEvent) {
        return;
      }

      if (timeline.isReversed) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    timeline.addCallback('end', () => {
      if (state.isNavigationEvent) {
        return;
      }

      if (timeline.isReversed) {
        itemArray.forEach((otherItem) => {
          otherItem.classList.remove('active');
        });
        // itemArray[index + 1].classList.remove('active');
        // itemArray[state.scrollingIndex].classList.remove('active');
      } else {
        itemArray[state.scrollingIndex].classList.add('active');
        // itemArray[index + 1].classList.add('active');
      }
    });

    timelines.push(timeline);
  });

  return timelines;
};

export default makeGlobalTimeline;
