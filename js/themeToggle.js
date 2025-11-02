// wwwroot/js/themeToggle.js

const THEME_KEY = "preferredTheme";

/**
 * Sets the theme ("dark" or "light") by toggling the "dark-mode" class on <body>.
 */
export function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    localStorage.setItem(THEME_KEY, theme);    
}

/**
 * Toggles the theme between dark and light.
 */
export function toggleTheme() {
    if (document.body.classList.contains("dark-mode")) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

/**
 * Retrieves the current theme from localStorage or returns the system preference.
 */
export function getCurrentTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Initialize theme on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    setTheme(getCurrentTheme());
});

document.documentElement.classList.add('js-loaded');

// === BACK-TO-TOP START ===
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
        // Ensures the button fades in
        backToTopButton.style.opacity = 1;
    } else {
        // Fade out and then hide after transition
        backToTopButton.style.opacity = 0;
        setTimeout(() => {
            backToTopButton.style.display = 'none';
        }, 300); // Duration should match the CSS transition time
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === BACK-TO-TOP END ====