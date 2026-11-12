/**
 * Exam & ISSB Portal - Global Theme Manager
 * Supports Light & Dark themes with localStorage persistence and system sync.
 */
(function () {
  const THEME_KEY = "exam-portal-theme";
  const THEME_ATTR = "data-theme";

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    } catch (_) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute(THEME_ATTR, theme);

    // Update meta theme-color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", theme === "dark" ? "#090d16" : "#f1f5f9");
    }

    // Update all theme toggle buttons on the page
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const isDark = theme === "dark";
    const buttons = document.querySelectorAll(".theme-toggle-button, #theme-toggle");
    buttons.forEach((btn) => {
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
      const icon = btn.querySelector(".theme-icon");
      const text = btn.querySelector(".theme-text");
      if (icon) {
        icon.textContent = isDark ? "☀️" : "🌙";
      }
      if (text) {
        text.textContent = isDark ? "Light" : "Dark";
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute(THEME_ATTR) || getPreferredTheme();
    const next = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (_) {}
    applyTheme(next);
    return next;
  }

  // Initialize theme as early as possible
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Bind to DOM when ready
  function init() {
    applyTheme(document.documentElement.getAttribute(THEME_ATTR) || getPreferredTheme());

    document.querySelectorAll(".theme-toggle-button, #theme-toggle").forEach((btn) => {
      btn.removeEventListener("click", toggleTheme);
      btn.addEventListener("click", toggleTheme);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Sync across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === THEME_KEY && (e.newValue === "dark" || e.newValue === "light")) {
      applyTheme(e.newValue);
    }
  });

  // Listen to system preference changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      try {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      } catch (_) {}
    });
  }

  window.toggleTheme = toggleTheme;
  window.applyTheme = applyTheme;
})();
