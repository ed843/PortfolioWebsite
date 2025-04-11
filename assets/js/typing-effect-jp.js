const typingContainers = [
    {
      element: document.getElementById('typing-container1'),
      startTag: '<h2 class="greeting">',
      endTag: '</h2>',
      kanaText: 'はじめまして！',
      convertedText: '初めまして！'
    },
    {
      element: document.getElementById('typing-container2'),
      startTag: '<h2 class="name">',
      endTag: '</h2>',
      kanaText: 'だんかん・えりっくです。',
      convertedText: 'ダンカン・エリックです。'
    }
  ];
  
  function simulateCodeTyping(container) {
    // Create a pre element to display the HTML code being typed
    const codeElement = document.createElement('pre');
    codeElement.className = 'code-display';
    container.element.appendChild(codeElement);
    
    // Track raw code and displayed code separately
    let rawCode = "";
    let phase = "startTag"; // Tracking which phase we're in
    let index = 0;
    
    function typeNextChar() {
      if (phase === "startTag") {
        // Type the opening HTML tag
        if (index < container.startTag.length) {
          rawCode += container.startTag.charAt(index);
          updateCodeDisplay();
          index++;
          setTimeout(typeNextChar, 40);
        } else {
          // Move to typing the kana
          phase = "kanaText";
          index = 0;
          setTimeout(typeNextChar, 100);
        }
      } 
      else if (phase === "kanaText") {
        // Type the kana characters
        if (index < container.kanaText.length) {
          rawCode += container.kanaText.charAt(index);
          updateCodeDisplay();
          index++;
          setTimeout(typeNextChar, 100);
        } else {
          // Move to conversion phase
          phase = "converting";
          setTimeout(typeNextChar, 400);
        }
      } 
      else if (phase === "converting") {
        // Show the conversion process - split code into parts
        const startTagLength = container.startTag.length;
        const beforeKana = rawCode.substring(0, startTagLength);
        const afterKana = ""; // No closing tag yet
        
        // Replace kana with the converted text in the raw code
        rawCode = beforeKana + container.convertedText + afterKana;
        
        // For display, we need to highlight each part separately
        const beforeKanaHighlighted = highlightCode(beforeKana);
        const convertedTextHighlighted = highlightCode(container.convertedText);
        
        // Apply conversion styling to the converted text only
        codeElement.innerHTML = beforeKanaHighlighted + 
                               '<span class="converting">' + convertedTextHighlighted + '</span>';
        
        // Move to typing the closing tag after a brief pause
        phase = "endTag";
        index = 0;
        setTimeout(typeNextChar, 600);
      } 
      else if (phase === "endTag") {
        // Type the closing HTML tag
        if (index < container.endTag.length) {
          rawCode += container.endTag.charAt(index);
          updateCodeDisplay();
          index++;
          setTimeout(typeNextChar, 40);
        } else {
          // All done typing, execute the code
          phase = "executing";
          setTimeout(typeNextChar, 600);
        }
      } 
      else if (phase === "executing") {
        // "Execute" the code
        codeElement.classList.add('executing');
        
        setTimeout(() => {
          // Replace the code with the actual HTML element
          container.element.innerHTML = container.startTag + container.convertedText + container.endTag;
          container.element.querySelector('h2').classList.add('typed');
        }, 500);
      }
    }
    
    function updateCodeDisplay() {
      // Apply syntax highlighting to the raw code
      codeElement.innerHTML = highlightCode(rawCode);
    }
    
    function highlightCode(code) {
      // First escape any HTML characters to prevent issues
      let escapedCode = code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
      
      // Now apply syntax highlighting
      return escapedCode
        // Highlight HTML tags (including the brackets)
        .replace(/(&lt;)([\/\w]+)(\s|&gt;)/g, '<span class="tag">&lt;$2</span>$3')
        .replace(/(&gt;)/g, '<span class="tag">&gt;</span>')
        // Highlight attributes
        .replace(/(\s)([a-zA-Z\-]+)(=)(&quot;)([^&quot;]*)(&quot;)/g, 
                 '$1<span class="attribute">$2</span>$3<span class="string">$4$5$6</span>');
    }
    
    // Start the typing process
    typeNextChar();
  }
  
  function startTypingEffect() {
    typingContainers.forEach((container, index) => {
      // Stagger the typing of each container
      setTimeout(() => simulateCodeTyping(container), index * 4500);
    });
  }
  
  window.addEventListener('load', startTypingEffect);