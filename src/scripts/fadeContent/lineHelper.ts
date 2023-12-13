export const setLabelPosition = (
  labelDom: HTMLElement,
  activeButton: HTMLElement
) => {
  const label = labelDom;

  const rect = activeButton.getBoundingClientRect();
  const inner = document.querySelector<HTMLElement>('.fade-section__list');

  if (!inner) {
    return;
  }

  const leftShift = inner.offsetLeft;
  const scrollShift = inner.scrollLeft;

  const targetPos = rect.x - leftShift + scrollShift;
  label.style.transform = `translate(${targetPos}px, 0)`;
};

export const setLabelWidth = (
  labelDom: HTMLElement,
  activeButton: HTMLElement
) => {
  const label = labelDom;

  const { width } = activeButton.getBoundingClientRect();

  // const targetPos = rect.x - leftShift + scrollShift;
  label.style.width = `${width}px`;
};

export const updateLabelValue = (
  labelDom: HTMLElement,
  activeButton: HTMLElement
) => {
  setLabelPosition(labelDom, activeButton);
  setLabelWidth(labelDom, activeButton);
};
