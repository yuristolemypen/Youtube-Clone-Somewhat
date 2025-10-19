import {renderVideos} from "./youtube-main/video-grid.js";
import {renderSubscribers} from "./youtube-main/nav-sidebar.js";
import {setupBottomHeaderScroll, initDragScroll} from "./youtube-main/bottom-header-scroll.js";
import {initHamburgerListeners} from "./youtube-main/top-header.js";

renderVideos();
renderSubscribers();
setupBottomHeaderScroll();
initDragScroll();
initHamburgerListeners();