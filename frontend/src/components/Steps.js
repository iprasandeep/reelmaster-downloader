import React from 'react';

const Steps = () => (
  <div className="steps">
    <div className="step">
      <div className="step-number">1</div>
      <div className="icon">📋</div>
      <b>Copy the URL</b>
      <p>Open Instagram, go to the video, reel, or IGTV you want to download. Copy the URL from the address bar or share menu.</p>
    </div>
    <div className="step">
      <div className="step-number">2</div>
      <div className="icon">📋</div>
      <b>Paste the Link</b>
      <p>Return to Reelmaster, paste the link into the input field and click "Detect & Preview" to load the video information.</p>
    </div>
    <div className="step">
      <div className="step-number">3</div>
      <div className="icon">⬇️</div>
      <b>Download</b>
      <p>Review the video details and click "Download Video" or "Download Audio" to save the file to your device.</p>
    </div>
  </div>
);

export default Steps;