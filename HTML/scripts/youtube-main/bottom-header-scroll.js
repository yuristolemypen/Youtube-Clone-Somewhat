const SCROLL_DISTANCE = 100;

const scrollContainer = document.getElementById('js-bottom-section');
const scrollLeftBtn = document.getElementById('js-scroll-left-bottom-header')
const scrollRightBtn = document.getElementById('js-scroll-right-bottom-header')

function checkScrollPosition() {

  // Safety check: if any required element is not found, exit the function.
  if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) return;

  if (scrollContainer.scrollLeft <= 1) {
    scrollLeftBtn.style.display = 'none';
  } else {
    scrollLeftBtn.style.display = 'flex';
  }

  // Calculate the maximum possible scroll distance
  const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

  // Tolerance margin of - 1 just in case it stops before the absolute maxSrollLeft
  if (scrollContainer.scrollLeft >= maxScrollLeft - 1) {
    scrollRightBtn.style.display = 'none';
  } else {
    scrollRightBtn.style.display ='flex';
  }
}

export function setupBottomHeaderScroll() {

  // Safety check for initialization errors.
  if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) {
    console.log('Scroll elements not found. Check IDs and class names.');
    return;
  }

  scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -SCROLL_DISTANCE,
      behavior: 'smooth'
    });
  });

  scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: SCROLL_DISTANCE,
      behavior: 'smooth'
    });
  });

  // The reason behind this so that it wouldn't bug out,
  // to be correctly calculated after all elements are rendered
  setTimeout(checkScrollPosition, 50);


  // Calls checkScrollPosition every time the user scrolls the container.
  // This updates the arrow visibility immediately as the bar is scrolled.
  scrollContainer.addEventListener('scroll', checkScrollPosition);
}


let isDragging = false;
let startX;
let scrollLeftSnapshot;

export function dragScroll() {

  scrollContainer.addEventListener('mousedown', (mouseEvent) => {
    isDragging = true;

    scrollContainer.classList.add('active-dragging');

    // mouseEvent.pageX: Absolute mouse position relative to the whole document.
    // scrollContainer.offsetLeft: The container's fixed distance from the document's left edge.
    // Subtracting the offset gives us the X position of the mouse *inside* the container.
    startX = mouseEvent.pageX - scrollContainer.offsetLeft;

    // Record the current scroll position. This value is the fixed reference point
    // for calculating all subsequent scroll movements.
    scrollLeftSnapshot = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    scrollContainer.classList.remove('active-dragging');
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollContainer.classList.remove('active-dragging');
  });

  scrollContainer.addEventListener('mousemove', (mouseEvent) => {
    if (!isDragging) return;
    mouseEvent.preventDefault(); // Stop Default Behavior: Prevents the browser from doing things like selecting text.

    // Calculate the 'walk' (distance dragged): 
    // This is the difference between the current mouse X and the starting mouse X.
    // A positive 'walk' means the mouse moved right; a negative 'walk' means it moved left.
    const x = mouseEvent.pageX - scrollContainer.offsetLeft;
    const scrolled = (x - startX);

    // We scroll based on the original starting position (snapshot) minus the distance scrolled.
    // Why subtract 'scrolled'? Because dragging the mouse to the RIGHT (positive scrolled) must 
    // move the content to the LEFT (decreasing scrollLeft).
    scrollContainer.scrollLeft = scrollLeftSnapshot - scrolled;
  });
}