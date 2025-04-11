document.addEventListener('DOMContentLoaded', function() {
    const currentLanguage = document.getElementById('current-language');
    const languageOptions = document.getElementById('language-options');
    const selectedLanguageText = document.getElementById('selected-language');
    const options = document.querySelectorAll('.language-option');
    const dropdownIcon = document.querySelector('.dropdown-icon');
    
    // Determine current language based on URL
    const pathname = window.location.pathname;
    const isJapanese = pathname.includes('/ja-jp');
    
    // Set initial state
    if (isJapanese) {
      selectedLanguageText.textContent = '日本語';
      document.querySelector('[data-lang="ja"]').classList.add('active');
      document.querySelector('[data-lang="en"]').classList.remove('active');
    }
    
    // Toggle dropdown
    currentLanguage.addEventListener('click', function() {
      const isOpen = languageOptions.style.display === 'block';
      languageOptions.style.display = isOpen ? 'none' : 'block';
      dropdownIcon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
    
    // Handle language selection
    options.forEach(option => {
      option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Update active class
        options.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Update displayed language
        selectedLanguageText.textContent = this.textContent;
        
        // Close dropdown
        languageOptions.style.display = 'none';
        dropdownIcon.style.transform = 'rotate(0deg)';
        
        // Redirect to appropriate page
        if (lang === 'en' && isJapanese) {
          window.location.href = pathname.replace('/ja-jp/', '/');
        } else if (lang === 'ja' && !isJapanese) {
          window.location.href = '/ja-jp' + (pathname === '/' ? '' : pathname);
        }
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.language-switcher')) {
        languageOptions.style.display = 'none';
        dropdownIcon.style.transform = 'rotate(0deg)';
      }
    });
  });