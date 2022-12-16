chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'convertText') {
    document.getSelection().getRangeAt(0).deleteContents();
    document.getSelection().getRangeAt(0).insertNode(document.createTextNode(request.convertedText));
  }
});

document.addEventListener('mouseup', function(event) {
  let selectedText = document.getSelection().toString().trim();
  if (selectedText !== '') {
    let language;
    if (/^[\u0590-\u05FF]+$/.test(selectedText)) {
      language = 'hebrew';
    } else {
      language = 'english';
    }
    chrome.runtime.sendMessage({
      action: 'convertText',
      text: selectedText,
      language: language
    }, function(response) {
      console.log(response.convertedText);
    });
  }
});

