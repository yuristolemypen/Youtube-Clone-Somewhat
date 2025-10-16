import {renderVideos} from "./youtube-main/video-grid.js";
import {renderSubscribers} from "./youtube-main/nav-sidebar.js";
import {setupBottomHeaderScroll, dragScroll} from "./youtube-main/bottom-header-scroll.js";

renderVideos();
renderSubscribers();
setupBottomHeaderScroll();
dragScroll();