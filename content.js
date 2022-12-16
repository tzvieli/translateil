chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'text-highlighted') {
    let selectedText = message.selectedText;
    // Code to handle the selected text goes here
  }
});
