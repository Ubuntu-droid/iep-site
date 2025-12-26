// ===============================
// IEP SITE – ACCESSIBLE JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  setupSectionToggles();
  setupNavActiveState();
  setupReadingProgress();
});

// -------------------------------
// 1. SECTION TOGGLE (Show / Hide)
// -------------------------------
function setupSectionToggles() {
  const sections = document.querySelectorAll("main section");

  sections.forEach((section, index) => {
    const heading = section.querySelector("h2");
    if (!heading) return;

    // Create toggle button
    const button = document.createElement("button");
    button.className = "toggle-btn";
    button.type = "button";
    button.textContent = "Hide section";
    button.setAttribute("aria-expanded", "true");

    // Insert button after heading
    heading.insertAdjacentElement("afterend", button);

    // Collect content to toggle
    const content = Array.from(section.children).filter(
      el => el !== heading && el !== button
    );

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "Show section" : "Hide section";

      content.forEach(el => {
        el.hidden = expanded;
      });
    });
  });
}

// -------------------------------
// 2. NAV ACTIVE STATE
// -------------------------------
function setupNavActiveState() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

// -------------------------------
// 3. READING PROGRESS INDICATOR
// -------------------------------
function setupReadingProgress() {
  const progressBar = document.createElement("div");
  progressBar.id = "reading-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}