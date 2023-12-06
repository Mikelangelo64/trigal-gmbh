type TCallback = (element: Element, entry: IntersectionObserverEntry) => void;

interface IUseObserverProps {
  target: HTMLElement | null;
  root?: HTMLElement | null;
  callbackIn?: TCallback;
  callbackOut?: TCallback;
  isCallOnce?: boolean;
  threshold?: number;
}

const useObserver: (
  props: IUseObserverProps
) => IntersectionObserver | undefined = ({
  target,
  callbackIn,
  callbackOut,
  isCallOnce = false,
  root = null,
  threshold = 0
}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
          // console.log(entry);
          // console.log(entry, element);
          if (!callbackIn) {
            return;
          }
          callbackIn(element, entry);

          if (isCallOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!callbackOut) {
            return;
          }
          callbackOut(element, entry);
        }
      },
      {
        root: root,
        threshold: threshold,
        rootMargin: '0px 0px 0px 0px'
      }
    );
  });

  if (!target) {
    return undefined;
  }

  observer.observe(target);
  return observer;
};

export default useObserver;
