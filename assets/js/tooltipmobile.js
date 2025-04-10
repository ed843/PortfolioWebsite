document.addEventListener("DOMContentLoaded", function() {
    var tooltips = document.querySelectorAll('.tooltip');
  
    tooltips.forEach(function(tooltip) {
      tooltip.addEventListener('click', function() {
        var tooltipText = this.querySelector('.tooltiptext');
        if (tooltipText.classList.contains('visible')) {
          tooltipText.classList.remove('visible');
        } else {
          // Hide other tooltips
          document.querySelectorAll('.tooltip .tooltiptext.visible').forEach(function(el) {
            el.classList.remove('visible');
          });
          tooltipText.classList.add('visible');
        }
      });
  
      // Hide tooltip if clicked outside
      document.addEventListener('click', function(event) {
        if (!tooltip.contains(event.target)) {
          tooltip.querySelector('.tooltiptext').classList.remove('visible');
        }
      });
    });
  });
  