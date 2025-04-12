const typingContainers = [
  {
    element: document.getElementById('typing-container1'),
    startTag: '<h2 class="greeting">',
    endTag: '</h2>',
    text: 'Nice to meet you!'
  },
  {
    element: document.getElementById('typing-container2'),
    startTag: '<h2 class="name">',
    endTag: '</h2>',
    text: 'I\'m Eric Duncan'
  }
];

function simulateCodeTyping(container) {
  // Create a pre element to display the HTML code being typed
  const codeElement = document.createElement('pre');
  codeElement.className = 'code-display';
  container.element.appendChild(codeElement);
  
  // Stages of typing:
  // 1. Type opening tag
  // 2. Type text content
  // 3. Type closing tag
  // 4. Execute the code

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
        // Move to typing the text content
        phase = "textContent";
        index = 0;
        setTimeout(typeNextChar, 100);
      }
    } 
    else if (phase === "textContent") {
      // Type the text content
      if (index < container.text.length) {
        rawCode += container.text.charAt(index);
        updateCodeDisplay();
        index++;
        setTimeout(typeNextChar, 100);
      } else {
        // Move to typing the closing tag
        phase = "endTag";
        index = 0;
        setTimeout(typeNextChar, 100);
      }
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
        container.element.innerHTML = container.startTag + container.text + container.endTag;
        container.element.querySelector('h2').classList.add('typed');
      }, 500);
    }
  }
  
  function updateCodeDisplay() {
    // Apply syntax highlighting to the raw code
    let highlighted = highlightCode(rawCode);
    // Add cursor at the end of the text
    codeElement.innerHTML = highlighted;
    
    // Make sure we scroll to the bottom if content overflows
    codeElement.scrollTop = codeElement.scrollHeight;
  }
  
  function highlightCode(code) {
    // First escape any HTML characters to prevent issues
    let escapedCode = code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    
    // Now apply syntax highlighting (im never doing regex again)
    return escapedCode
      // Highlight HTML tags (including the brackets)
      .replace(/(&lt;)([\/\w]+)(\s|&gt;)/g, '<span class="tag">&lt;$2</span>$3')
      .replace(/(&gt;)/g, '<span class="tag">&gt;</span>')
      // Highlight attributes
      .replace(/(\s)([a-zA-Z\-]+)(=)(&quot;)((?:(?!&quot;).)*)(&quot;)/g, 
               '$1<span class="attribute">$2</span>$3<span class="string">$4$5$6</span>');
  }
  
  // Add the cursor style to the code element
  codeElement.classList.add('typing-cursor');
  
  // Start the typing process
  typeNextChar();
}

function startTypingEffect() {
  typingContainers.forEach((container, index) => {
    // Stagger the typing of each container
    setTimeout(() => simulateCodeTyping(container), index * 5000);
  });
}

window.addEventListener('load', startTypingEffect);