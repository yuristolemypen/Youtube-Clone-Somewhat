import {navSidebar} from "../data/nav-sidebar-info.js";

let isExpanded = false;
const COLLAPSED_LIMIT = 6;

function generateSubscriptionsHTML() {
  const limit = isExpanded ? navSidebar.length : COLLAPSED_LIMIT;
  
  const channelsToShow = navSidebar.slice(0, limit); // 0 for the index extraction begins, limit for where it'll end
  // Create new array containing only the channels to be displayed using limit
  let navSidebarHTML =
    `
      <div class="sidebar-sec side-top">
      Subscriptions &nbsp;&nbsp;<span>&gt;</span>
      </div>
    `;

  channelsToShow.forEach((channelInfo) => {
    navSidebarHTML += `
    <div class="sidebar-sec side-profile">
      <img src="${channelInfo.channelPicture}">
      <div>${channelInfo.channelName}</div>
    </div>
  `;
  });

  if (navSidebar.length > COLLAPSED_LIMIT) {
    const remainingCount = navSidebar.length - COLLAPSED_LIMIT;

    const iconChar = '&gt;';

    const showMoreLessText = isExpanded ? 'Show less' : 'Show more';

    const addOnClass = isExpanded ? 'js-arrow-icon-up' : '';

    navSidebarHTML += `
      <div id="js-show-more-less-btn" class="sidebar-sec">
        <button>
          <div class="js-arrow-icon-down ${addOnClass}">${iconChar}</div>
        </button>
        <div>${showMoreLessText}</div>
      </div>
    `;
  };

  return navSidebarHTML;
}


function attachToggleListener() {
  const toggleBtn = document.getElementById('js-show-more-less-btn');
  // We put this in a variable so that we can get the parent container of this later
  const contentContainer = document.getElementById('js-channel-subs');

  if (toggleBtn && contentContainer) {
    toggleBtn.addEventListener('click', () => {
      // Basically a shortcut of if statements for isExpanded === true, else !isExpanded
      isExpanded = !isExpanded

      renderSubscribers();
      if (!isExpanded) {
        // Get the parent element of contentContainer, which is the whole sidebar
        const scrollableParent = contentContainer.parentElement;

        // Ensure that parent element is found/used
        if (scrollableParent) {
          // Reset the scroll position 0 pixels in relation to the sidebar container, which is the parent element of the sub container
          scrollableParent.scrollTop = 0;
        } else {
          console.error('Could not find parent element to reset scroll position.');
        } // We don't really need this if-else statement, it's just a safeguard if ever an error occurs
      }
    });
  }
}


export function renderSubscribers() {
  const subscriptionsContainer = document.getElementById('js-channel-subs');
  // Just a safeguard
  if (subscriptionsContainer) {
    // Render the generated HTML, replacing all old content
    subscriptionsContainer.innerHTML = generateSubscriptionsHTML();

    // Re-attach the click listener to the newly created button element
    attachToggleListener();
  }
}