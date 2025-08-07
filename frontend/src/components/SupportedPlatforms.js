import React from 'react';

const SupportedPlatforms = () => (
  <div className="supported-platforms">
    <h2>Supported Platforms</h2>
    <div className="platform-row">
      <div className="platform instagram">
        <div className="icon">📸</div>
        <b>Instagram</b>
        <p>Download videos, reels, IGTV, and stories from Instagram with full quality preservation.</p>
        <div className="options">
          <span>Posts</span>
          <span>Reels</span>
          <span>IGTV</span>
          <span>Stories</span>
        </div>
      </div>
      <div className="platform youtube">
        <div className="icon">🎥</div>
        <b>YouTube Shorts</b>
        <p>Extract YouTube Shorts videos in multiple formats and quality options.</p>
        <div className="options">
          <span>Shorts</span>
          <span>HD Quality</span>
          <span>Audio Only</span>
        </div>
      </div>
      <div className="platform pinterest">
        <div className="icon">📌</div>
        <b>Pinterest</b>
        <p>Save Pinterest videos and animated pins directly to your device.</p>
        <div className="options">
          <span>Videos</span>
          <span>GIFs</span>
          <span>Pins</span>
        </div>
      </div>
      <div className="platform tiktok">
        <div className="icon">🎵</div>
        <b>TikTok</b>
        <p>Download TikTok videos without watermarks in high quality.</p>
        <div className="options">
          <span>Videos</span>
          <span>No Watermark</span>
          <span>HD Quality</span>
        </div>
      </div>
      <div className="platform facebook">
        <div className="icon">📘</div>
        <b>Facebook</b>
        <p>Extract videos from Facebook posts, stories, and reels.</p>
        <div className="options">
          <span>Posts</span>
          <span>Stories</span>
          <span>Reels</span>
        </div>
      </div>
      <div className="platform twitter">
        <div className="icon">🐦</div>
        <b>Twitter</b>
        <p>Download videos from Twitter posts and threads.</p>
        <div className="options">
          <span>Posts</span>
          <span>Threads</span>
          <span>Spaces</span>
        </div>
      </div>
    </div>
  </div>
);

export default SupportedPlatforms;