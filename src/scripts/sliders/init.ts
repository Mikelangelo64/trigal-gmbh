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

const sliderShopProductInit = (sliders: Array<IInitializedSlider>) => {
  const sectionArray = document.querySelectorAll(
    '.shop-product'
  ) as NodeListOf<HTMLElement>;

  if (sectionArray.length === 0) {
    return;
  }

  sectionArray.forEach((item, sliderIndex) => {
    const containerArray = item.querySelectorAll<HTMLElement>(
      '.shop-product__media'
    );

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((container, innerIndex) => {
      const slider = makeSlider({
        container: container,
        className: 'shop-product-gallery',

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
          spaceBetween: 24
          // autoHeight: true,
          // loop: true,

          // autoplay: {
          //   // delay: 2000,
          //   disableOnInteraction: false
          // }
          // breakpoints: {
          //   900: {
          //     autoHeight: false
          //   }
          // }
        }
      });

      if (slider) {
        const info: IInitializedSlider = {
          name: `shop-product-gallery-${sliderIndex}-${innerIndex}`,
          slider
        };

        initPaginationChanger(info);

        // const mediaQuery = window.matchMedia('(min-width: 900px)');

        // mediaQuery.addEventListener('change', () => {
        //   slider.updateAutoHeight(300);
        // });

        // еще не обновляется состояния дайнемик - потом допилить
        sliders.push(info);
      }
    });
  });
};

const sliderGalleryInit = (sliders: Array<IInitializedSlider>) => {
  const sectionArray = document.querySelectorAll(
    '.gallery'
  ) as NodeListOf<HTMLElement>;

  if (sectionArray.length === 0) {
    return;
  }

  sectionArray.forEach((item, sliderIndex) => {
    const containerArray = item.querySelectorAll<HTMLElement>(
      '.fade-section-content__item'
    );

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((container, innerIndex) => {
      const slider = makeSlider({
        container: container,
        className: 'gallery',

        renderBullets(index, className) {
          return `
            <button class="${className}">
            </button>
          `;
        },

        config: {
          allowTouchMove: true,
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 12,
          // loop: true,

          // autoplay: {
          //   // delay: 2000,
          //   disableOnInteraction: false
          // }
          breakpoints: {
            900: {
              slidesPerView: 3,
              slidesPerGroup: 3
            },
            1200: {
              slidesPerView: 3,
              slidesPerGroup: 3
            }
          }
        }
      });

      if (slider) {
        const info: IInitializedSlider = {
          name: `gallery-${sliderIndex}-${innerIndex}`,
          slider
        };

        initPaginationChanger(info);

        // еще не обновляется состояния дайнемик - потом допилить
        sliders.push(info);
      }
    });
  });
};

const slidersInit = () => {
  const sliders: Array<IInitializedSlider> = [];

  sliderProductsInit(sliders);
  sliderGalleryInit(sliders);
  sliderShopProductInit(sliders);

  return sliders;
};

export default slidersInit;
