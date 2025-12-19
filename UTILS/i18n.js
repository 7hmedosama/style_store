// ===== Localization Utility (i18n) =====

let currentLang = localStorage.getItem('selectedLang') || 'ar';

/**
 * Initialize language and update UI
 */
function initI18n() {
    applyLanguage(currentLang);
}

/**
 * Toggle the language dropdown menu
 */
function toggleLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLang', currentLang);
    applyLanguage(currentLang);

    // Close dropdown after selection
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('active');

    // Refresh product-related components to update their text (e.g. category names if dynamic)
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderFavorites === 'function') renderFavorites();
    if (typeof updateCartUI === 'function') updateCartUI();
}

/**
 * Apply language to the DOM
 * @param {string} lang 
 */
function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update translation for elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Handle Title
    document.title = lang === 'ar' ? 'متجر ستايل | Style Store' : 'Style Store | Online Shop';
}

/**
 * Translate a key dynamically
 * @param {string} key 
 * @returns {string}
 */
function t(key) {
    return translations[currentLang][key] || key;
}
