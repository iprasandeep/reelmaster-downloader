const express = require('express');
const cors = require('cors');
const { exec, execSync } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();

// Function to find an available port starting from startPort
function findAvailablePort(startPort = 3002) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

app.use(cors());
app.use(express.json());

let serverPort = null;

const tempDir = path.join(os.tmpdir(), 'video-downloads');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// Simple URL validation
const isValidUrl = (url) => {
  return typeof url === 'string' && /^https?:\/\/\S+$/i.test(url.trim());
};

// Utility: Check ffmpeg availability on server startup
function checkFfmpegAvailability() {
  try {
    const version = execSync('ffmpeg -version', { timeout: 3000 }).toString();
    console.log('ffmpeg is installed and accessible.');
  } catch (err) {
    console.warn('Warning: ffmpeg is not installed or not in PATH! yt-dlp may download video without audio merging.');
  }
}

// Health check route
app.get('/', (req, res) => {
  res.send(`Express backend running on port ${serverPort || 'dynamic'}`);
});

// POST route to fetch video info & download video with audio merged
app.post('/api/fetch-video-info', (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'A valid video URL is required.' });
  }

  const tempFilePrefix = `video_${Date.now()}`;
  const tempFilePathTemplate = path.join(tempDir, `${tempFilePrefix}.%(ext)s`);

  /*
    yt-dlp command explanation:
    - Use format: bestvideo+bestaudio/best (best merged video+audio if separate, fallback to best)
    - Output template includes extension preserved
    - --merge-output-format mp4: ensure merged output is mp4 when merging needed
    - --no-playlist: single video only
    - --no-warnings: reduce noise
    - --verbose: for detailed logs (you can remove in production)
  */
  const downloadCmd = [
    'yt-dlp',
    '--no-warnings',
    '--no-playlist',
    '-f "bestvideo+bestaudio/best"',
    '--merge-output-format mp4',
    '--verbose',
    `-o "${tempFilePathTemplate}"`,
    `"${url}"`
  ].join(' ');

  exec(downloadCmd, { timeout: 180000 }, (downloadError, stdout, stderr) => {
    if (downloadError) {
      console.error('yt-dlp download error:', downloadError);
      console.error('yt-dlp stderr output:', stderr);
      return res.status(500).json({
        error: 'Failed to fetch or process video',
        details: stderr || downloadError.message,
      });
    }

    // Extract downloaded file path from yt-dlp output
    const match = stdout.match(/^\[download\] Destination: (.+)$/m);
    if (!match) {
      console.error('Failed to parse downloaded file path from yt-dlp output:\n', stdout);
      return res.status(500).json({ error: 'Failed to determine downloaded file path' });
    }

    const downloadedFilePath = match[1];
    if (!fs.existsSync(downloadedFilePath)) {
      console.error('Downloaded file not found:', downloadedFilePath);
      return res.status(500).json({ error: 'Downloaded file not found on disk' });
    }

    const downloadedFileName = path.basename(downloadedFilePath);

    // Fetch video metadata
    const infoCmd = `yt-dlp -j "${url}"`;
    exec(infoCmd, { timeout: 15000 }, (infoError, infoStdout, infoStderr) => {
      if (infoError) {
        console.error('yt-dlp info fetch error:', infoError);
        console.error('yt-dlp info stderr:', infoStderr);
        return res.status(500).json({
          error: 'Failed to fetch video info',
          details: infoStderr || infoError.message,
        });
      }

      let info;
      try {
        info = JSON.parse(infoStdout);
      } catch (parseErr) {
        console.error('Failed to parse yt-dlp JSON info:', parseErr);
        console.error('Raw info stdout:', infoStdout);
        return res.status(500).json({
          error: 'Failed to parse video info',
          details: parseErr.message,
        });
      }

      res.json({
        title: info.title || 'Unknown Title',
        thumbnail: info.thumbnail || '',
        uploader: info.uploader || 'Unknown',
        duration: info.duration ? `${Math.floor(info.duration / 60)}m ${info.duration % 60}s` : 'Unknown',
        videoUrl: `http://localhost:${serverPort}/download/${downloadedFileName}`,
        audioUrl: null,
        streamUrl: Array.isArray(info.formats) ? (info.formats.find(f => f.url)?.url || null) : null,
        platform: info.extractor || 'Unknown',
      });
    });
  });
});

// Serve downloaded video file and delete afterwards
app.get('/download/:fileName', (req, res) => {
  const filePath = path.join(tempDir, req.params.fileName);
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) console.error('Error sending file:', err);

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    });
  } else {
    res.status(404).send('File not found');
  }
});

// Inform clients that only POST allowed for this API
app.get('/api/fetch-video-info', (req, res) => {
  res.status(405).json({ error: 'Please use POST with JSON body { url }' });
});

// Start server on available port and check ffmpeg on startup
async function startServer() {
  try {
    checkFfmpegAvailability();

    serverPort = await findAvailablePort(3002);
    app.listen(serverPort, () => {
      console.log(`Server running on port ${serverPort}`);
      console.log(`API endpoint: POST http://localhost:${serverPort}/api/fetch-video-info with JSON { url: "<video_url>" }`);
      console.log(`Health check: http://localhost:${serverPort}/`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
}

startServer();
