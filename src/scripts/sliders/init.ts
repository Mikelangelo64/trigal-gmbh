import initPaginationChanger from './dynamicPagination/init';
import makeSlider from './sliderHandler';
import Swiper from 'swiper';

export interface IInitializedSlider {
  name: string;
  slider: Swiper | undefined;
  isDynamicPagination?: boolean;
}

const sliderProductsInit = (sliders: Array<IInitializedSlider>) => {
  const containerArray = document.querySelectorAll(
    '.review'
  ) as NodeListOf<HTMLElement>;

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((item, sliderIndex) => {
    const slider = makeSlider({
      container: item,
      className: 'review',

      renderBullets(index, className) {
        return `
          <button class="${className}">
          </button>
        `;
      },

      config: {
        allowTouchMove: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 34,
        // loop: true,

        // autoplay: {
        //   // delay: 2000,
        //   disableOnInteraction: false
        // }
        breakpoints: {
          900: {
            slidesPerView: 2,
            slidesPerGroup: 2
          }
        }
      }
    });

    if (slider) {
      const info: IInitializedSlider = {
        name: `review-${sliderIndex}`,
        slider
      };

      initPaginationChanger(info);

      // еще не обновляется состояния дайнемик - потом допилить
      sliders.push(info);
    }
  });
};

const slidersInit = () => {
  const sliders: Array<IInitializedSlider> = [];

  sliderProductsInit(sliders);

  return sliders;
};

export default slidersInit;
