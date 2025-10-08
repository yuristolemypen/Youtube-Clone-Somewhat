const SCROLL_DISTANCE = 100; // Defines how many pixels the bar will scroll per click.

function checkScrollPosition() {
  // Retrieve the elements using their IDs. This function relies on these elements existing.
  const scrollContainer = document.getElementById('js-bottom-section');
  const scrollLeftBtn = document.getElementById('js-scroll-left-bottom-header');
  const scrollRightBtn = document.getElementById('js-scroll-right-bottom-header');

  // Safety check: if any required element is not found, exit the function.
  if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) return;

  // scrollLeft is the distance scrolled from the very beginning (left edge).
  if (scrollContainer.scrollLeft <= 1) {
    // If scrollLeft is 0 (or very close), hide the left button.
    scrollLeftBtn.style.display = 'none';
  } else {
    // Otherwise, the bar is scrolled right, so show the left button.
    scrollLeftBtn.style.display = 'flex'; // Assumes your CSS uses display: flex for visibility.
  }

  // Calculate the maximum possible scroll distance.
  // scrollWidth = total width of all content (including hidden).
  // clientWidth = total width of the visible container.
  // The max scroll distance is the content width MINUS the visible area width.
  const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

  // Check if the current scroll position is at the end (using a small tolerance of 1 pixel).
  if (scrollContainer.scrollLeft >= maxScrollLeft - 1) {
    // If at the far right, hide the right button.
    scrollRightBtn.style.display = 'none';
  } else {
    // Otherwise, there is more content to the right, so show the right button.
    scrollRightBtn.style.display = 'flex';
  }
}


export function setupGenreScroll() {
  // Retrieve elements again. It's safe practice to retrieve elements once inside the setup function.
  const scrollContainer = document.getElementById('js-bottom-section');
  const scrollLeftBtn = document.getElementById('js-scroll-left-bottom-header');
  const scrollRightBtn = document.getElementById('js-scroll-right-bottom-header');

  // Safety check for initialization errors.
  if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) {
    console.error("Scroll elements not found. Check IDs and class names.");
    return;
  }

  scrollLeftBtn.addEventListener('click', () => {
    // scrollBy() scrolls the container relative to its current position.
    // Negative value moves the view to the left.
    scrollContainer.scrollBy({
      left: -SCROLL_DISTANCE,
      behavior: 'smooth' // Provides a smooth animation effect.
    });
    // Note: The 'scroll' event listener will automatically call checkScrollPosition after the smooth scroll finishes.
  });

  // --- SCROLL RIGHT LOGIC (Click Handler) ---
  scrollRightBtn.addEventListener('click', () => {
    // Positive value moves the view to the right.
    scrollContainer.scrollBy({
      left: SCROLL_DISTANCE,
      behavior: 'smooth'
    });
  });

  // 1. Initial check: Ensures the left arrow is correctly hidden when the page first loads (scrollLeft = 0).
  // setTimeout is used here because scrollWidth/clientWidth sometimes need a tiny delay 
  // to be calculated correctly by the browser after all elements are painted.
  setTimeout(checkScrollPosition, 50);

  // 2. Continuous monitoring: Calls checkScrollPosition every time the user scrolls the container.
  // This updates the arrow visibility immediately as the bar is scrolled.
  scrollContainer.addEventListener('scroll', checkScrollPosition);
}