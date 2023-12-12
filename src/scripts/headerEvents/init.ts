import findHeight from './findHeight';
import scrollEventsHandler from './scrollEvents';

const headerEvents = () => {
  const header = document.querySelector<HTMLElement>('.header');

  if (!header) {
    return;
  }

  findHeight(header);
  scrollEventsHandler();
};

export default headerEvents;
