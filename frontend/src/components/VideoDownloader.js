import React, { useState } from 'react';
import FAQ from './FAQ';
import Features from './Features';
import Header from './Header';
import Preview from './Preview';
import Steps from './Steps';
import SupportedPlatforms from './SupportedPlatforms';
import UrlInput from './UrlInput';

const VideoDownloader = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="container">
      <Header />
      <UrlInput setVideoInfo={setVideoInfo} setError={setError} />
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {videoInfo && <Preview videoInfo={videoInfo} />}
      <Steps />
      <SupportedPlatforms />
      <Features />
      <FAQ />
      <div className="footer">
        <div className="footer-content">
          <div className="footer-text">
            © 2024 Reelmaster. All rights reserved | Fast, Free & Secure Video Downloads<br />
            Not affiliated with Instagram, YouTube, or Pinterest
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;