export const createDom = (
  container: HTMLElement,
  itemArray: NodeListOf<HTMLElement>
) => {
  const buttons: HTMLButtonElement[] = [];
  const wrapperDom = document.createElement('div');
  wrapperDom.classList.add('scroll-container-navigation');

  itemArray.forEach((item) => {
    if (item.classList.contains('special')) {
      return;
    }

    const button = document.createElement('button');
    button.classList.add('scroll-container-navigation__button');

    const svgContainer = document.createElement('span');
    svgContainer.classList.add('scroll-container-navigation__label');
    svgContainer.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" transform="matrix(0 1 1 0 0 0)" stroke="currentColor" stroke-width="4"/>
      </svg>
    `;

    if (item.classList.contains('active')) {
      button.classList.add('active');
    }

    button.appendChild(svgContainer);
    buttons.push(button);
    wrapperDom.appendChild(button);
  });

  container.appendChild(wrapperDom);
  return { wrapperDom, buttons };
};

export const addClassSpecialButtons = (
  section: HTMLElement,
  className: string,
  doing: 'add' | 'remove' | 'toggle'
) => {
  if (!section.classList.contains('special')) {
    return;
  }

  const name = section.dataset.section;
  if (!name || name === '') {
    return;
  }

  const buttonSpecialArray = document.querySelectorAll<HTMLButtonElement>(
    `.scroll-control[data-section="${name}"]`
  );

  buttonSpecialArray.forEach((specialButton) => {
    if (doing === 'add') {
      specialButton.classList.add(className);
    } else if (doing === 'toggle') {
      specialButton.classList.toggle(className);
    } else {
      specialButton.classList.remove(className);
    }
  });
};
