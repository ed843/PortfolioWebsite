/**
 * Project Detail Page Script
 * Handles loading and displaying project details
 */

document.addEventListener("DOMContentLoaded", () => {
  // Get project ID from URL
  const projectId = getProjectIdFromUrl();

  // Load project data
  if (projectId && projectsData[projectId]) {
    loadProjectDetails(projectId);
  } else {
    handleProjectNotFound();
  }

  // Load other projects for carousel
  loadOtherProjects(projectId);
});

/**
 * Extract project ID from URL
 * Expected format: /projects/project-name.html
 */
function getProjectIdFromUrl() {
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const filename = pathSegments[pathSegments.length - 1];
  return filename.replace(".html", "");
}

/**
 * Handle case when project is not found
 */
function handleProjectNotFound() {
  document.querySelector(".project-container").innerHTML = `
      <div class="error-container">
        <h2>Project Not Found</h2>
        <p>Sorry, we couldn't find the project you're looking for.</p>
        <a href="../index.html#projects" class="project-link live">View All Projects</a>
      </div>
    `;
}

/**
 * Load and display project details
 */
function loadProjectDetails(projectId) {
  const project = projectsData[projectId];

  // Set page title
  document.title = `${project.title} | Eric Duncan's Portfolio`;

  // Update meta description
  document
    .querySelector('meta[name="description"]')
    .setAttribute(
      "content",
      `Detailed view of ${project.title} - A project by Eric Duncan, Full Stack Software Engineer`
    );

  // Set project title
  document.getElementById("projectTitle").textContent = project.title;

  // Set hero image
  document.getElementById("projectHeroImage").src = project.heroImage;
  document.getElementById(
    "projectHeroImage"
  ).alt = `${project.title} hero image`;

  // Set tech stack pills
  const techStackPills = document.getElementById("techStackPills");
  techStackPills.innerHTML = project.techStack
    .map(
      (tech) => `
      <div class="tech-pill">
        <img src="${tech.icon}" alt="${tech.name} icon" />
        ${tech.name}
      </div>
    `
    )
    .join("");

  // Set project links
  if (project.links.github) {
    document.getElementById("githubLink").href = project.links.github;
  } else {
    document.getElementById("githubLink").style.display = "none";
  }

  if (project.links.live) {
    document.getElementById("liveLink").href = project.links.live;
  } else {
    document.getElementById("liveLink").style.display = "none";
  }

  // Set completion date
  document
    .getElementById("projectDate")
    .querySelector("span").textContent = `Completed: ${project.completionDate}`;

  // Set project overview
  document.getElementById("projectOverview").innerHTML = project.overview;

  // Set features
  const featuresGrid = document.getElementById("featuresGrid");
  if (project.features && project.features.length > 0) {
    featuresGrid.innerHTML = project.features
      .map(
        (feature) => `
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-${feature.icon}"></i>
          </div>
          <div class="feature-content">
            <h3 class="feature-title">${feature.title}</h3>
            <p>${feature.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  } else {
    document.querySelector(".features-section").style.display = "none";
  }

  // Set architecture diagram and description
  if (project.architecture) {
    document.getElementById("architectureDiagram").innerHTML =
      project.architecture.diagram;
    document.getElementById("architectureDescription").innerHTML =
      project.architecture.description;
  } else {
    document.querySelector(".tech-architecture").style.display = "none";
  }

  // Set tech stack details
  if (project.techStackDetails && project.techStackDetails.length > 0) {
    const techStackGrid = document.getElementById("techStackGrid");
    techStackGrid.innerHTML = project.techStackDetails
      .map(
        (tech) => `
        <div class="tech-card">
          <img src="${tech.logo}" alt="${tech.name} logo" class="tech-logo" />
          <h4 class="tech-name">${tech.name}</h4>
          <p class="tech-description">${tech.description}</p>
        </div>
      `
      )
      .join("");
  } else {
    document.querySelector(".tech-stack-details").style.display = "none";
  }

  // Set code highlight
  if (project.codeHighlight) {
    const codeContainer = document.getElementById("codeHighlight");
    codeContainer.querySelector("code").textContent =
      project.codeHighlight.code;
    document.getElementById("codeDescription").textContent =
      project.codeHighlight.description;
    highlightCodeSyntax();
  } else {
    document.querySelector(".code-showcase").style.display = "none";
  }

  // Set challenges and solutions
  if (project.challenges && project.challenges.length > 0) {
    const challengeCards = document.getElementById("challengeCards");
    challengeCards.innerHTML = project.challenges
      .map(
        (challenge) => `
        <div class="challenge-card">
          <h3 class="challenge-title">${challenge.title}</h3>
          <p class="challenge-description">${challenge.description}</p>
          <span class="solution-label">Solution:</span>
          <p>${challenge.solution}</p>
        </div>
      `
      )
      .join("");
  } else {
    document.querySelector(".challenges-solutions").style.display = "none";
  }

  // Set project gallery
  if (project.gallery && project.gallery.length > 0) {
    const projectGallery = document.getElementById("projectGallery");
    projectGallery.innerHTML = project.gallery
      .map(
        (item) => `
        <div class="gallery-item">
          <img src="${item.image}" alt="${item.caption}" class="gallery-image" />
          <div class="gallery-caption">${item.caption}</div>
        </div>
      `
      )
      .join("");

    // Add click handlers for gallery items to show full-size images
    setupGalleryItemHandlers();
  } else {
    document.querySelector(".project-gallery").style.display = "none";
  }

  // Set learning outcomes
  if (project.learningOutcomes && project.learningOutcomes.length > 0) {
    const learningOutcomes = document.getElementById("learningOutcomes");
    learningOutcomes.innerHTML = project.learningOutcomes
      .map(
        (outcome) => `
        <div class="outcome-item">
          <div class="outcome-icon">${outcome.icon}</div>
          <p class="outcome-text">${outcome.text}</p>
        </div>
      `
      )
      .join("");
  } else {
    document.querySelector(".learning-outcomes").style.display = "none";
  }

  // Set future improvements
  if (project.futureImprovements && project.futureImprovements.length > 0) {
    const futureImprovements = document.getElementById("futureImprovements");
    futureImprovements.innerHTML = project.futureImprovements
      .map(
        (improvement) => `
        <div class="improvement-item">
          <div class="improvement-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <div class="improvement-content">
            <h4>${improvement.title}</h4>
            <p>${improvement.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  } else {
    document.querySelector(".next-steps").style.display = "none";
  }
}

/**
 * Setup click handlers for gallery items
 */
function setupGalleryItemHandlers() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const caption = item.querySelector(".gallery-caption").textContent;

      const modal = document.createElement("div");
      modal.className = "gallery-modal";
      modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imgSrc}" alt="${caption}" />
            <p>${caption}</p>
          </div>
        `;

      document.body.appendChild(modal);

      // Prevent scrolling while modal is open
      document.body.style.overflow = "hidden";

      // Handle close button click
      modal.querySelector(".close-modal").addEventListener("click", () => {
        document.body.removeChild(modal);
        document.body.style.overflow = "";
      });

      // Close modal when clicking outside image
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          document.body.style.overflow = "";
        }
      });
    });
  });
}

/**
 * Load other projects for the carousel
 */
function loadOtherProjects(currentProjectId) {
  const projectsCarousel = document.getElementById("projectsCarousel");
  const otherProjects = Object.entries(projectsData)
    .filter(([id]) => id !== currentProjectId)
    .map(([id, project]) => ({ id, ...project }));

  if (otherProjects.length > 0) {
    projectsCarousel.innerHTML = otherProjects
      .map(
        (project) => `
        <div class="carousel-item">
          <div class="carousel-image">
            <img src="${project.heroImage}" alt="${project.title}" />
          </div>
          <div class="carousel-content">
            <h3 class="carousel-title">${project.title}</h3>
            <p class="carousel-tech">${project.techStack
              .map((tech) => tech.name)
              .join(" • ")}</p>
            <a href="${id}.html" class="view-project-btn">View Project</a>
          </div>
        </div>
      `
      )
      .join("");
  } else {
    document.querySelector(".other-projects").style.display = "none";
  }
}

/**
 * Highlight code syntax
 * This assumes you're using a syntax highlighting library like Prism or Highlight.js
 * If not, this function can be modified or removed
 */
function highlightCodeSyntax() {
    // If using a library like Prism.js
    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
      return;
    }
  
    // Basic syntax highlighting fallback
    const codeElement = document.querySelector("pre code");
    if (!codeElement) return;
  
    // Get the raw code
    const code = codeElement.textContent;
    
    // Tokenize the code first, then apply highlighting
    let result = '';
    let currentToken = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    
    // Keywords to highlight
    const keywords = [
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 
      'try', 'catch', 'async', 'await', 'new', 'this', 'class', 'import', 'export', 'from', 'def'
    ];
    
    // Process the code character by character
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const nextChar = i < code.length - 1 ? code[i + 1] : '';
      
      // Handle comments
      if (char === '/' && nextChar === '/' && !inString) {
        // Flush current token if any
        if (currentToken) {
          result += processToken(currentToken);
          currentToken = '';
        }
        
        // Find the end of the line comment
        let commentText = '//';
        i += 2;
        while (i < code.length && code[i] !== '\n') {
          commentText += code[i];
          i++;
        }
        if (i < code.length) {
          commentText += code[i]; // Include the newline
        }
        
        result += `<span style="color: #7f848e;">${escapeHtml(commentText)}</span>`;
        continue;
      }
      
      // Handle strings
      if ((char === '"' || char === "'" || char === '`') && !inComment) {
        if (inString && char === stringChar) {
          // End of string
          currentToken += char;
          result += `<span style="color: #98c379;">${escapeHtml(currentToken)}</span>`;
          currentToken = '';
          inString = false;
        } else if (!inString) {
          // Start of string
          if (currentToken) {
            result += processToken(currentToken);
            currentToken = '';
          }
          currentToken = char;
          inString = true;
          stringChar = char;
        } else {
          // Different quote inside a string
          currentToken += char;
        }
        continue;
      }
      
      if (inString) {
        currentToken += char;
        continue;
      }
      
      // Handle word boundaries
      if (/\w/.test(char)) {
        currentToken += char;
      } else {
        // Process completed token if any
        if (currentToken) {
          result += processToken(currentToken);
          currentToken = '';
        }
        
        // Handle special cases for non-word chars
        if (char === '(') {
          // Check if preceded by a function name
          const lastWordMatch = result.match(/(\w+)$/);
          if (lastWordMatch) {
            const funcName = lastWordMatch[1];
            // Only color it if it's not already colored (not a keyword)
            if (!result.endsWith(`>${funcName}`)) {
              result = result.substring(0, result.length - funcName.length) +
                       `<span style="color: #61afef;">${funcName}</span>`;
            }
          }
          result += char;
        } else {
          // Just add the character
          result += char;
        }
      }
    }
    
    // Process any remaining token
    if (currentToken) {
      result += processToken(currentToken);
    }
    
    // Set the highlighted HTML
    codeElement.innerHTML = result;
    
    // Helper function to process a token based on its type
    function processToken(token) {
      // Check if token is a keyword
      if (keywords.includes(token)) {
        return `<span style="color: #c678dd;">${token}</span>`;
      }
      
      // Check if token is a number
      if (/^\d+$/.test(token)) {
        return `<span style="color: #d19a66;">${token}</span>`;
      }
      
      // Otherwise return the token as is
      return escapeHtml(token);
    }
    
    // Helper function to escape HTML
    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }
