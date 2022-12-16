chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'text-highlighted') {
    if (request.action === 'convertText') {
      let convertedText;
      if (request.language === 'english') {
        convertedText = convertEnglishToHebrew(request.text);
      } else if (request.language === 'hebrew') {
        convertedText = convertHebrewToEnglish(request.text);
      }
      sendResponse({convertedText: convertedText});
    }
    //let selectedText = message.selectedText;
    //let browserLanguage = navigator.language;
    //if (browserLanguage === 'en-US') {
      // Convert selected text from English to Hebrew
      //let convertedText = convertEnglishToHebrew(selectedText);
      // Send message to content script to update UI
      //chrome.tabs.sendMessage(sender.tab.id, {
       // type: 'update-ui',
        //convertedText: convertedText
      //});
    //} else if (browserLanguage === 'he') {
      // Convert selected text from Hebrew to English
      //let convertedText = convertHebrewToEnglish(selectedText);
      // Send message to content script to update UI
      //chrome.tabs.sendMessage(sender.tab.id, {
       // type: 'update-ui',
       // convertedText: convertedText
      //});
    //}
  }
});

function convertEnglishToHebrew(text) {
  // Map of English characters to Hebrew characters
  const mapping = {
    'a': 'ש', 'b': 'נ', 'c': 'ב', 'd': 'ג', 'e': 'ק',
    'f': 'כ', 'g': 'ע', 'h': 'י', 'i': 'ן', 'j': 'ח',
    'k': 'ל', 'l': 'ך', 'm': 'צ', 'n': 'מ', 'o': 'ם',
    'p': 'פ', 'q': 'ף', 'r': 'ר', 's': 'ד', 't': 'א',
    'u': 'ו', 'v': 'ט', 'w': 'י', 'x': 'ס', 'y': 'ה', 'z': 'ז',
    '`': '~', '1': '!', '2': '@', '3': '#', '4': '$',
    '5': '%', '6': '^', '7': '&', '8': '*', '9': '(',
    '0': ')', '-': '_', '=': '+', '[': '{', ']': '}',
    '\\': '|', ';': ':', '\'': '"', ',': '<', '.': '>',
    '/': '?'
  };

  // Convert English text to Hebrew
  let convertedText = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i].toLowerCase();
    if (mapping.hasOwnProperty(char)) {
      convertedText += mapping[char];
    } else {
      convertedText += char;
    }
  }
  return convertedText;
}

function convertHebrewToEnglish(text) {
  // Map of Hebrew characters to English characters
  const mapping = {
    'ש': 'a', 'נ': 'b', 'ב': 'c', 'ג': 'd', 'ק': 'e',
    'כ': 'f', 'ע': 'g', 'י': 'h', 'ן': 'i', 'ח': 'j',
    'ל': 'k', 'ך': 'l', 'צ': 'm', 'מ': 'n', 'ם': 'o',
    'פ': 'p', 'ף': 'q', 'ר': 'r', 'ד': 's', 'א': 't',
    'ו': 'u', 'ט': 'v', 'י': 'w', 'ס': 'x', 'ה': 'y', 'ז': 'z',
    '~': '`', '!': '1', '@': '2', '#': '3', '$': '4',
    '%': '5', '^': '6', '&': '7', '*': '8', '(': '9',
    ')': '0', '_': '-', '+': '=', '{': '[', '}': ']',
    '|': '\\', ':': ';', '"': '\'', '<': ',', '>': '.',
    '?': '/'
  };

  // Convert Hebrew text to English
  let convertedText = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (mapping.hasOwnProperty(char)) {
      convertedText += mapping[char];
    } else {
      convertedText += char;
    }
  }
  return convertedText;
}

