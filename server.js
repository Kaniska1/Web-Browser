const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to fetch URL content
app.post('/api/fetch-url', async (req, res) => {
  try {
    const { url } = req.body;

    // Validate URL
    if (!url || url.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid URL.'
      });
    }

    // Add protocol if missing
    let fullUrl = url.trim();
    if (!fullUrl.match(/^https?:\/\//)) {
      fullUrl = 'https://' + fullUrl;
    }

    // Validate URL format
    try {
      new URL(fullUrl);
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format. Please enter a valid URL.'
      });
    }

    // Fetch the URL with timeout
    const response = await axios.get(fullUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Return the HTML content
    res.json({
      success: true,
      content: response.data,
      url: fullUrl
    });

  } catch (error) {
    // Handle different types of errors
    let errorMessage = 'An error occurred while fetching the URL.';

    if (error.code === 'ENOTFOUND') {
      errorMessage = 'URL not found. Please check the website address.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused. The server may be down.';
    } else if (error.code === 'ETIMEDOUT' || error.message === 'timeout of 10000ms exceeded') {
      errorMessage = 'Request timed out. The website took too long to respond.';
    } else if (error.response && error.response.status === 404) {
      errorMessage = 'Page not found (404).';
    } else if (error.response && error.response.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }

    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Web Browser App running on http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} in your browser to start using the application.`);
});
