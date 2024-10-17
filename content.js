chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "generateTOC") {
    generateTableOfContents();
  }
});

function generateTableOfContents() {
  const existingTOC = document.getElementById('quickTOC');
  if (existingTOC) {
    existingTOC.style.opacity = '0';
    setTimeout(() => existingTOC.remove(), 300);
    return;
  }

  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) {
    alert('No headings found on this page.');
    return;
  }

  const toc = document.createElement('div');
  toc.id = 'quickTOC';
  toc.innerHTML = '<h2>Contents</h2>';

  const list = document.createElement('ul');
  toc.appendChild(list);

  headings.forEach((heading, index) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    const headingId = `heading-${index}`;

    heading.id = headingId;
    link.textContent = heading.textContent;
    link.href = `#${headingId}`;
    link.classList.add(`toc-${heading.tagName.toLowerCase()}`);

    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => {
    toc.style.opacity = '0';
    setTimeout(() => toc.remove(), 300);
  });
  toc.appendChild(closeButton);

  document.body.appendChild(toc);

  // Trigger reflow to enable transition
  toc.offsetHeight;
  toc.style.opacity = '1';

  // Check system preference for dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toc.classList.add('dark-mode');
  }

  // Listen for changes in system color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      toc.classList.add('dark-mode');
    } else {
      toc.classList.remove('dark-mode');
    }
  });
}