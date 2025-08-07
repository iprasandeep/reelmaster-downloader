import React, { useState } from 'react';
import { fetchVideoInfo } from '../api/api';

const UrlInput = ({ setVideoInfo, setError }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchVideoInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchVideoInfo(url);
      if (data.error) throw new Error(data.error);
      
      // Add the original URL to the video info for downloads
      const videoInfoWithUrl = {
        ...data,
        originalUrl: url
      };
      
      setVideoInfo(videoInfoWithUrl);
      setError(null);
    } catch (err) {
      setError(err.message);
      setVideoInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchVideoInfo();
    }
  };

  return (
    <div className={`url-input ${isLoading ? 'loading' : ''}`}>
      <div className="input-row">
        <input
          type="text"
          placeholder="Paste the video URL here (Instagram, YouTube Shorts, Pinterest...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          onClick={handleFetchVideoInfo}
          disabled={isLoading}
        >
          {isLoading ? 'Detecting...' : 'Detect & Preview'}
        </button>
      </div>
      <small>Supports Instagram, YouTube Shorts, Pinterest, TikTok, and more</small>
    </div>
  );
};

export default UrlInput;