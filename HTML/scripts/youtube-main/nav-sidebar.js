import {navSidebar} from "../data/nav-sidebar-info.js";

export function renderSubscribers() {
  let navSidebarHTML =
    `
     <div class="sidebar-sec side-top">
      Subscriptions &nbsp;&nbsp;<span>&gt;</span>
     </div>
    `;

  navSidebar.forEach((channelInfo) => {
    navSidebarHTML += `
    <div class="sidebar-sec side-profile">
      <img src="${channelInfo.channelPicture}">
      <div>${channelInfo.channelName}</div>
    </div>
  `;
  });

  document.getElementById('js-channel-subs-picture')
    .innerHTML = navSidebarHTML;
}
