document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const generateButton = document.getElementById('generateTOC');

  // Check system preference for dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
  }

  // Listen for changes in system color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  });

  // Generate TOC when button is clicked
  generateButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "generateTOC"});
    });
  });
});