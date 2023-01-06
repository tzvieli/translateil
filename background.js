// Mapping of Hebrew letters to English letters according to keyboard layout
var hebrewToEnglish = {
    "א": "t",
    "ב": "c",
    "ג": "d",
    "ד": "s",
    "ה": "v",
    "ו": "u",
    "ז": "z",
    "ח": "j",
    "ט": "y",
    "י": "h",
    "כ": "f",
    "ל": "k",
    "מ": "n",
    "נ": "b",
    "ס": "x",
    "ע": "g",
    "פ": "p",
    "צ": "m",
    "ק": "e",
    "ר": "r",
    "ש": "a",
    "ת": ",",
  };
  
  // Mapping of English letters to Hebrew letters according to keyboard layout
  var englishToHebrew = {
    "a": "ש",
    "b": "נ",
    "c": "ב",
    "d": "ג",
    "e": "ק",
    "f": "כ",
    "g":"ע",
    "h": "י",
    "i": "ן",
    "j": "ח",
    "k": "ל",
    "l": "ך",
    "m": "צ",
    "n": "מ",
    "o": "ם",
    "p": "פ",
    "q": "/",
    "r": "ר",
    "s": "ד",
    "t": "א",
    "u": "ו",
    "v": "ה",
    "w": "'",
    "x": "ס",
    "y": "ט",
    "z": "ז",
  };
  

  function translate(info,tab) {
    chrome.tabs.executeScript({
      code: `
      var hebrewToEnglish = {
        "א": "t",
        "ב": "c",
        "ג": "d",
        "ד": "s",
        "ה": "v",
        "ו": "u",
        "ז": "z",
        "ח": "j",
        "ט": "y",
        "י": "h",
        "כ": "f",
        "ל": "k",
        "מ": "n",
        "נ": "b",
        "ס": "x",
        "ע": "g",
        "פ": "p",
        "צ": "m",
        "ק": "e",
        "ר": "r",
        "ש": "a",
        "ת": ",",
        "ם": "o",
        "ן": "i",
        "ץ": ".",
        "ף": ";",
        "ך": "l",
        "/": "q",
        "'": "w",
        ",":"'",
      };
      
      // Mapping of English letters to Hebrew letters according to keyboard layout
      var englishToHebrew = {
        "a": "ש",
        "b": "נ",
        "c": "ב",
        "d": "ג",
        "e": "ק",
        "f": "כ",
        "g":"ע",
        "h": "י",
        "i": "ן",
        "j": "ח",
        "k": "ל",
        "l": "ך",
        "m": "צ",
        "n": "מ",
        "o": "ם",
        "p": "פ",
        "q": "/",
        "r": "ר",
        "s": "ד",
        "t": "א",
        "u": "ו",
        "v": "ה",
        "w": "'",
        "x": "ס",
        "y": "ט",
        "o": "ם",
        "i": "ן",
        ".": "ץ",
        ";": "ף",
        "l": "ך",
        "'":",",
      };

      function translateText(text) {
        // Determine if the text is Hebrew or English
        var isHebrew = /[\u0590-\u05FF]/.test(text);
      
        // Select the appropriate mapping
        var mapping = isHebrew ? hebrewToEnglish : englishToHebrew;
      
        // Translate the text
        var translation = "";
        for (var i = 0; i < text.length; i++) {
          var ch = text.charAt(i);
          translation += mapping[ch] || ch;
        }
      
        return translation;
      }
      
      var input = document.activeElement;
      //document.activeElement.textContent = "11111111";
      if(input.tagName == 'INPUT' && input.type == 'text')
      {
        var start = input.selectionStart;
        var finish = input.selectionEnd;
        var allText = input.value;
        var text = allText.substring(start, finish);
    
        // Translate the text
        var translation = translateText(text.toLowerCase());
        var newText=allText.substring(0, start) + translation + allText.substring(finish, allText.length);
 
        //Replace the selected text with the translation
        //range.deleteContents();
        //range.insertNode(document.createTextNode(translation));
        //navigator.clipboard.writeText(translation);
        input.value = newText;
        input.setSelectionRange(start,finish);
      }
      else
      {
       // alert("please copy text to clipboard try again and then paste");
        //const text = await navigator.clipboard.readText();
        navigator.clipboard.readText()
          .then(text => {
            console.log('Pasted content: ', text);
            var t = translateText(text.toLowerCase());
            navigator.clipboard.writeText(t);
          })
          .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
        //alert(c + "");
      }
    `
    });
  }
  
  function translateText(text) {
    // Determine if the text is Hebrew or English
    var isHebrew = /[\u0590-\u05FF]/.test(text);
  
    // Select the appropriate mapping
    var mapping = isHebrew ? hebrewToEnglish : englishToHebrew;
  
    // Translate the text
    var translation = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      translation += mapping[ch] || ch;
    }
  
    return translation;
  }
 

      chrome.contextMenus.create({
        title: "switch he-en", 
        contexts:["selection"], 
        onclick: translate
      });


      chrome.commands.onCommand.addListener(function (command) {
        switch (command) {
            case 'translate_text':
                translate();
                break;
            default:
                console.log(`Command ${command} not found`);
        }
    });