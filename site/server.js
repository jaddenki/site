import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4321;

// Enable gzip compression
// This will compress all responses that are larger than 1KB
app.use(compression({
  filter: (req, res) => {
    // Don't compress responses if the client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression middleware for all other requests
    return compression.filter(req, res);
  },
  // Compression level: 0-9, where 9 is maximum compression
  level: 6,
  // Only compress responses larger than 1KB
  threshold: 1024,
}));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist'), {
  // Set cache headers for better performance
  maxAge: '1y',
  immutable: true,
}));

// Handle client-side routing (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Gzip compression enabled');
});
