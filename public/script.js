// DOM Elements
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const contentFrame = document.getElementById('contentFrame');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const currentUrlDiv = document.getElementById('currentUrl');
const urlDisplay = document.getElementById('urlDisplay');
const welcomeMessage = document.getElementById('welcomeMessage');
const searchButton = urlForm.querySelector('.search-button');

// Event Listeners
urlForm.addEventListener('submit', handleFormSubmit);
urlInput.addEventListener('focus', clearError);

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  const url = urlInput.value.trim();

  if (!url) {
    showError('Please enter a URL.');
    return;
  }

  // Disable button and show loading
  searchButton.disabled = true;
  showLoading(true);
  clearError();
  hideWelcomeMessage();

  try {
    const response = await fetch('/api/fetch-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.success) {
      // Display the fetched content
      displayContent(data.content, data.url);
      // Clear input
      urlInput.value = '';
    } else {
      showError(data.error);
      hideWelcomeMessage();
    }

  } catch (error) {
    showError('Network error. Please check your connection and try again.');
    console.error('Fetch error:', error);
  } finally {
    searchButton.disabled = false;
    showLoading(false);
  }
}

// Display content in iframe
function displayContent(content, url) {
  // Display current URL
  urlDisplay.textContent = url;
  currentUrlDiv.style.display = 'block';

  // Write content to iframe
  contentFrame.srcdoc = content;

  // Show the iframe and hide welcome message
  welcomeMessage.style.display = 'none';
  contentFrame.style.display = 'block';
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Clear error message
function clearError() {
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';
}

// Show/Hide loading indicator
function showLoading(show) {
  loadingIndicator.style.display = show ? 'block' : 'none';
}

// Hide welcome message
function hideWelcomeMessage() {
  welcomeMessage.style.display = 'none';
}

// Initialize
window.addEventListener('load', () => {
  urlInput.focus();
  contentFrame.style.display = 'block';
  welcomeMessage.style.display = 'block';
  currentUrlDiv.style.display = 'none';
});
