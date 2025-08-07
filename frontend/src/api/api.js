import axios from 'axios';

// Try multiple common backend ports
const BACKEND_PORTS = [3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010];
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3002';

// Function to find available backend
async function findBackendPort() {
  for (const port of BACKEND_PORTS) {
    try {
      const response = await axios.get(`http://localhost:${port}/`, { timeout: 1000 });
      if (response.status === 200) {
        console.log(`Backend found on port ${port}`);
        return `http://localhost:${port}`;
      }
    } catch (error) {
      // Continue to next port
      continue;
    }
  }
  throw new Error('Backend server not found. Please start the backend server.');
}

// Cache the backend URL
let cachedBackendUrl = null;

async function getBackendUrl() {
  if (!cachedBackendUrl) {
    cachedBackendUrl = await findBackendPort();
  }
  return cachedBackendUrl;
}

export async function fetchVideoInfo(url) {
  try {
    const backendUrl = await getBackendUrl();
    const resp = await axios.post(`${backendUrl}/api/fetch-video-info`, { url });
    return resp.data;
  } catch (error) {
    if (error.message.includes('Backend server not found')) {
      throw new Error('Backend server is not running. Please start the backend server.');
    }
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.error || 'Failed to fetch video info');
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection and ensure the backend is running.');
    } else {
      // Other error
      throw new Error('An unexpected error occurred');
    }
  }
}