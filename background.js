let selectedText = window.getSelection().toString();
chrome.runtime.sendMessage({
  type: 'text-highlighted',
  selectedText: selectedText
});
