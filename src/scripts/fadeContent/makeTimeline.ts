import { BaseTimeline, Timeline } from 'vevet';
import { IParentHeight } from './useParentHeight';

interface IMakeTimeline {
  showItem: HTMLElement;
  hideItem: HTMLElement;
  parentHeight: IParentHeight;
  section: HTMLElement;
  activeHeight: number;
  duration?: number;
  label?: HTMLElement | null;
  button?: HTMLElement | null;
  previousButton?: HTMLElement | null;
}

const labelTimeline = (
  labelDom: HTMLElement,
  button: HTMLElement,
  previousButton: HTMLElement
) => {
  const label = labelDom;
  const timeline = new BaseTimeline({
    easing: [0.25, 0.1, 0.25, 1]
  });

  const rect = button.getBoundingClientRect();
  const rectPrev = previousButton.getBoundingClientRect();
  const inner = document.querySelector<HTMLElement>('.fade-section__list');

  if (!inner) {
    return timeline;
  }

  const leftShift = inner.offsetLeft;
  const scrollShift = inner.scrollLeft;

  const prevPos = rectPrev.x - leftShift + scrollShift;
  const targetPos = rect.x - leftShift + scrollShift;

  const prevWidth = rectPrev.width;
  const targetWidth = rect.width;

  timeline.addCallback('progress', ({ easing }) => {
    label.style.transform = `translate(${
      prevPos + easing * (targetPos - prevPos)
    }px, 0)`;

    label.style.width = `${prevWidth + easing * (targetWidth - prevWidth)}px`;
  });

  return timeline;
};

const makeTimeline = ({
  showItem: showItemProp,
  hideItem: hideItemProp,
  parentHeight,
  section: sectionProp,
  activeHeight,
  duration = 600,
  label,
  button,
  previousButton
}: IMakeTimeline) => {
  const showItem = showItemProp;
  const hideItem = hideItemProp;
  const section = sectionProp;

  const timeline = new Timeline({
    duration,
    shouldDestroyOnEnd: true,
    easing: [0.25, 0.1, 0.25, 1]
  });

  timeline.addCallback('start', () => {
    parentHeight.save();
    hideItem.classList.add('unactive');
    showItem.classList.remove('unactive');
  });

  timeline.addCallback('progress', ({ progress }) => {
    section.style.pointerEvents = 'none';
    parentHeight.interpolate(activeHeight, progress);

    showItem.style.opacity = `${progress}`;
    hideItem.style.opacity = `${1 - progress}`;
  });

  timeline.addCallback('end', () => {
    section.style.pointerEvents = '';

    timeline.destroy();
    parentHeight.reset();
  });

  if (label && button && previousButton) {
    const nestedTm = labelTimeline(label, button, previousButton);
    timeline.addNestedTimeline(nestedTm);
  }

  timeline.play();
};

export default makeTimeline;
