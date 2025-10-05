import {videoInfo} from "../data/video-info.js"; 

export function renderVideos() {
  let videoInfoHTML = '';

  videoInfo.forEach((videos) => {
    videoInfoHTML += `
    <div class="video-preview">
      <div class="thumbnail-row">
        <img class="thumbnail" src="${videos.thumbnailImage}">
      </div>
      <div class="video-info-grid">
        <div class="profile-picture-container">
          <img class="profile-picture" src="${videos.profilePicture}">
        </div>
        <div class="video-info-text">
          <p class="video-title">
            ${videos.videoTitle}
          </p>
          <p class="video-author">
            ${videos.videoAuthor}
          </p>
          <p class="video-stats">
            ${videos.videoStats}
          </p>
        </div>
      </div>
    </div>
  `;

  });

  document.getElementById('js-video-grid-container')
    .innerHTML = videoInfoHTML;
}

