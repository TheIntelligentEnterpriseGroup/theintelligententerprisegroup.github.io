document.addEventListener("DOMContentLoaded", () => {
    const currentLang = document.documentElement.lang; // e.g. "en", "fr", "de"
    const select = document.getElementById("lang-select");
    if (!select) return;

    // Highlight active language in the dropdown
    [...select.options].forEach(opt => {
        if (opt.value === currentLang) {
            opt.selected = true;
        }
    });

    // Helper: strip any existing language prefix from the path
    function stripLangPrefix(path) {
        return path.replace(/^\/[a-z]{2}(\/|$)/, "/");
    }

    // Build a normalized target path for a given language
    function buildTargetPath(langCode, currentPath) {
        let stripped = stripLangPrefix(currentPath);

        // ✅ Ensure stripped path always starts with "/"
        if (!stripped.startsWith("/")) {
            stripped = "/" + stripped;
        }

        const opt = select.querySelector(`option[value="${langCode}"]`);
        let prefix = opt?.dataset.path || "/";

        // ✅ Ensure prefix ends with exactly one "/"
        if (!prefix.endsWith("/")) {
            prefix += "/";
        }

        // Default language → just return stripped
        if (prefix === "/") {
            return stripped === "" ? "/" : stripped;
        }

        // Other languages → concatenate carefully
        if (stripped === "/") {
            return prefix; // e.g. "/fr/"
        }
        return prefix.replace(/\/$/, "") + stripped; // avoid double slashes
    }

    // Handle language change
    select.addEventListener("change", () => {
        const chosenLang = select.value;
        localStorage.setItem("preferredLang", chosenLang);
        window.location.href = buildTargetPath(chosenLang, window.location.pathname);
    });

    // Auto-redirect based on stored preference
    const storedLang = localStorage.getItem("preferredLang");
    if (storedLang && storedLang !== currentLang) {
        const targetPath = buildTargetPath(storedLang, window.location.pathname);
        if (targetPath !== window.location.pathname) {
            window.location.href = targetPath;
        }
    }

    // Fallback: if no stored preference, redirect based on browser language (only on root)
    if (!storedLang && (window.location.pathname === "/" || window.location.pathname === "/index.html")) {
        const userLang = (navigator.language || navigator.userLanguage || "").slice(0, 2);
        const opt = select.querySelector(`option[value="${userLang}"]`);
        if (opt && currentLang !== userLang) {
            window.location.href = opt.dataset.path || "/";
        }
    }
});
