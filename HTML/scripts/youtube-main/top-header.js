export function initHamburgerListeners() {
  const body = document.body;

  // Handles hamburger menu click

  document.querySelectorAll('.js-hamburger-menu-icon').forEach((btn) => {
    btn.addEventListener('click', () => {
      const width = window.innerWidth; // Returns current viewport width

      if (width <= 1300) { // Mobile/tablet view
        body.classList.toggle('js-show-aside');
      } else { // Desktop view
        body.classList.toggle('js-shrink-aside');
      }
    });
  });

  // Handles window resize handling

  window.addEventListener('resize', () => {
    const width = window.innerWidth;

    if (width <= 1300) {
      body.classList.remove('js-shrink-aside');
    } else {
      body.classList.remove('js-show-aside');
    }
  });

  // Handles click outside sidebar to close (overlay click functionality)

  document.addEventListener('click', (event) => {
    if (body.classList.contains('js-show-aside')) {

      const clickedInsideSidebar = event.target.closest('.aside-hidden');
      const clickedHamburger = event.target.closest('.js-hamburger-menu-icon');
      const clickedShowMoreLess = event.target.closest('.js-show-more-less-btn');

      // If click is outside all relevant elements, close sidebar
      if (!clickedInsideSidebar && !clickedHamburger && !clickedShowMoreLess) {
        body.classList.remove('js-show-aside');
      }
    }
  });

  // Handles click 'Escape' button to toggle the hamburger-menu and reveal hidden sidebar/aside-hidden

  document.addEventListener('keydown', (event) => {
    const width = window.innerWidth;

    if (event.key === 'Escape' && width <= 1300) {
      body.classList.toggle('js-show-aside');
    }
  });
};