# Simple Web Browser Application

A lightweight web browser application built with Node.js, Express.js, HTML, and CSS that allows users to fetch and view webpage content.

## Features

✨ **Core Features:**
- Enter a URL and fetch its content
- Display webpage content in a sandboxed iframe
- Real-time URL validation
- Graceful error handling for invalid URLs
- Loading indicator during content fetching
- Responsive design for all screen sizes

🛡️ **Error Handling:**
- Invalid URL format detection
- Network connection error handling
- Timeout handling (10-second limit)
- Server error messages (404, 500, etc.)
- Connection refused handling

## Project Structure

```
Web-Browser/
├── package.json          # Project dependencies
├── server.js             # Express server configuration
└── public/
    ├── index.html        # Main HTML file
    ├── styles.css        # Styling
    └── script.js         # Client-side JavaScript
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps to Run

1. **Navigate to the project directory:**
   ```bash
   cd Web-Browser
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Usage

1. Enter a URL in the text field (e.g., `google.com` or `https://example.com`)
2. Click the "Fetch" button
3. Wait for the content to load
4. View the fetched webpage content in the application

## Technologies Used

- **Backend:**
  - Node.js - JavaScript runtime
  - Express.js - Web framework
  - Axios - HTTP client for fetching URLs

- **Frontend:**
  - HTML5 - Page structure
  - CSS3 - Styling and animations
  - Vanilla JavaScript - Interactivity

## API Endpoints

### POST `/api/fetch-url`
Fetches content from a given URL.

**Request:**
```json
{
  "url": "example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "content": "<html>...</html>",
  "url": "https://example.com"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message describing the issue"
}
```

## Features Explanation

### URL Validation
- Automatically adds `https://` protocol if missing
- Validates URL format before fetching
- Shows clear error messages for invalid URLs

### Content Fetching
- Uses axios with 10-second timeout
- Sets appropriate User-Agent header
- Handles various network errors gracefully

### Display
- Content is displayed in a sandboxed iframe
- Shows current URL being viewed
- Displays welcome message when no content is loaded

## Error Messages

The application provides helpful error messages for:
- Empty URL input
- Invalid URL format
- Domain not found (ENOTFOUND)
- Connection refused (ECONNREFUSED)
- Request timeout
- HTTP errors (404, 500, etc.)

## Styling Features

- Modern gradient background
- Smooth animations and transitions
- Responsive design for mobile devices
- Clean, user-friendly interface
- Loading spinner animation
- Error message styling

## Security Considerations

- HTTP requests are performed server-side (not exposed to browser)
- Content is displayed in a sandboxed iframe with limited permissions
- Input validation prevents common attacks
- User-Agent header is set for proper web crawling

## Limitations

- Some websites may block automated requests
- Content with complex JavaScript may not render properly in iframe
- Large pages may take time to fetch and display
- Cross-origin restrictions may apply to some websites

## Future Enhancements

- History of visited URLs
- Ability to go back/forward
- Zoom controls
- Tab support
- Bookmarking functionality
- Search within page content
- Dark mode theme

## Troubleshooting

**Issue: Port 3000 is already in use**
- Change the PORT variable in `server.js` to a different port (e.g., 3001)

**Issue: Website won't load**
- Some websites block automated requests
- Check the network error message for details
- Try a different website

**Issue: Content not displaying correctly**
- The website may use modern JavaScript frameworks
- Try a simpler website for testing

## License

MIT License - Feel free to use this project for learning and development purposes.
