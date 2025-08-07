import React from 'react';

const Features = () => (
  <div className="features">
    <div className="feature-card">
      <div className="icon">🔒</div>
      <b>100% Secure</b>
      <p>No data collection or storage. Your privacy is our priority.</p>
    </div>
    <div className="feature-card highlight">
      <div className="icon">⚡</div>
      <b>Lightning Fast</b>
      <p>Instant processing with no waiting times or queues.</p>
    </div>
    <div className="feature-card">
      <div className="icon">📱</div>
      <b>Mobile Friendly</b>
      <p>Works perfectly on all devices and browsers.</p>
    </div>
  </div>
);

export default Features;