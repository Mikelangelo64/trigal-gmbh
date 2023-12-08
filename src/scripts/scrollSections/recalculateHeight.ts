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

    const scrollbarY = item.querySelector<HTMLElement>('.v-scrollbar_y');

    if (height > innerHeight) {
      item.classList.add('centered');
      item.classList.remove('with-scroll');

      if (scrollbarY) {
        scrollbarY.classList.add('v-scrollbar_is-empty');
      }
    } else {
      item.classList.remove('centered');
      item.classList.add('with-scroll');

      if (scrollbarY) {
        scrollbarY.classList.remove('v-scrollbar_is-empty');
      }
    }
  });
};

export default recalculateHeight;
