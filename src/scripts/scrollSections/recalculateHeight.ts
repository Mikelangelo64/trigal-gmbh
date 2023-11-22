import vevet from '../config/vevet';

const recalculateHeight = (wrapperProp: HTMLElement, activeIndex: number) => {
  const wrapper = wrapperProp;

  wrapper.style.transform = `translate(0, ${
    -1 * vevet.viewport.height * activeIndex
  }px)`;
};

export const changeInnerItemPosition = (itemArray: NodeListOf<HTMLElement>) => {
  itemArray.forEach((item) => {
    const inner = item.children[0];

    const { height } = item.getBoundingClientRect();
    const { height: innerHeight } = inner.getBoundingClientRect();

    if (height > innerHeight) {
      item.classList.add('centered');
      item.classList.remove('with-scroll');
    } else {
      item.classList.remove('centered');
      item.classList.add('with-scroll');
    }
  });
};

export default recalculateHeight;
