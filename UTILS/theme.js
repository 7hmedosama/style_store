// ===== Theme Management Utility =====

let currentTheme = localStorage.getItem('theme') || 'light';

/**
 * Initialize theme based on saved preference
 */
function initTheme() {
    applyTheme(currentTheme);
}

/**
 * Toggle the theme dropdown menu
 */
function toggleThemeDropdown() {
    const dropdown = document.getElementById('themeDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

/**
 * Switch to a specific theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);

    // Close dropdown after selection
    const dropdown = document.getElementById('themeDropdown');
    if (dropdown) dropdown.classList.remove('active');
}

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);
}

/**
 * Update the UI elements related to theme
 * @param {string} theme 
 */
function updateThemeUI(theme) {
    const btn = document.getElementById('themeSwitcherBtn');
    if (btn) {
        const icon = btn.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }
}

// Close theme dropdown when clicking outside
document.addEventListener('click', (e) => {
    const themeDropdown = document.getElementById('themeDropdown');
    if (themeDropdown && !themeDropdown.contains(e.target)) {
        themeDropdown.classList.remove('active');
    }
});
