import vevet from '../config/vevet';

const scrollbarFix = (itemArray: NodeListOf<HTMLElement>) => {
  itemArray.forEach((item, index) => {
    const scrollbarArray = item.querySelectorAll<HTMLElement>('.v-scrollbar');
    if (scrollbarArray.length === 0) {
      return;
    }

    scrollbarArray.forEach((scrollbarProp) => {
      const scrollbar = scrollbarProp;
      scrollbar.style.transform = `translate(0, ${
        vevet.viewport.height * index
      }px)`;
    });
  });
};

export default scrollbarFix;
