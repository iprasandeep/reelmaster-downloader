import React from 'react';

const Preview = ({ videoInfo }) => {
  const handleDownload = () => {
    if (videoInfo.videoUrl) {
      const link = document.createElement('a');
      link.href = videoInfo.videoUrl;
      link.download = `${videoInfo.title}.mp4`; // Enforce MP4 extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No video URL available for download.');
    }
  };

  return (
    <div className="preview">
      <h2 className="preview-title">Video Preview</h2>
      {videoInfo.streamUrl && (
        <div className="video-player-section">
          <div className="video-container">
            <video
              controls
              className="video-player"
              poster={videoInfo.thumbnail}
              preload="metadata"
            >
              <source src={videoInfo.streamUrl} type="video/mp4" />
              <source src={videoInfo.streamUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      <div className="video-info">
        {videoInfo.thumbnail && !videoInfo.streamUrl && (
          <img src={videoInfo.thumbnail} alt={videoInfo.title} className="thumbnail" />
        )}
        <div className="video-details">
          <h3 className="title">{videoInfo.title}</h3>
          {videoInfo.uploader && <div className="uploader">by {videoInfo.uploader}</div>}
          {videoInfo.duration && <div className="duration">{videoInfo.duration}</div>}
          {videoInfo.platform && <div className="platform">{videoInfo.platform}</div>}
        </div>
      </div>
      <div className="download-options">
        {videoInfo.videoUrl && (
          <button onClick={handleDownload} className="primary">
            Download Video
          </button>
        )}
        {videoInfo.audioUrl && (
          <button onClick={() => handleDownload('audio')} className="secondary">
            Download Audio
          </button>
        )}
      </div>
      <div className="download-info">
        {videoInfo.streamUrl
          ? 'Use the video controls above or download buttons below'
          : 'Click the download button to save the file to your device'}
      </div>
    </div>
  );
};

export default Preview;