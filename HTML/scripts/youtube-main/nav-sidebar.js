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

    const showMoreLessText = isExpanded ? 'Show less' : `Show ${remainingCount} more`;

    const addOnClass = isExpanded ? 'js-arrow-icon-up' : '';

    navSidebarHTML += `
      <div class="sidebar-sec js-show-more-less-btn">
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
  const toggleBtns = document.querySelectorAll('.js-show-more-less-btn');

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      isExpanded = !isExpanded; // flips between true / false

      renderSubscribers(); // Calls function to regenerate HTML for both sidebars

    });
  });
}

// Function to render subscription lists dynamically
export function renderSubscribers() {
  // Store references to both subscription containers (main + mobile sidebar)
  const containers = [
    document.getElementById('js-channel-subs'),
    document.getElementById('js-channel-subs-hidden')
  ];

  containers.forEach((container) => {
    if (!container) return;  // Safety check → skip if container not found
   
    container.innerHTML = generateSubscriptionsHTML();
    // Reset scroll if collapsed
    if (!isExpanded && container.parentElement) {
      container.parentElement.scrollTop = 0;
    }
  });

  attachToggleListener();
  // Reattach click listeners because innerHTML replaces old elements
}
