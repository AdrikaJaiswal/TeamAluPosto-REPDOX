document.addEventListener("DOMContentLoaded", () => {
    const languageForm = document.getElementById("language-form");

    if (languageForm) {
        languageForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop standard page refreshing behavior

            // Capture the currently checked radio element option value
            const selectedLanguage = languageForm.querySelector('input[name="language"]:checked').value;

            // Retain choice across local storage session memory
            localStorage.setItem("krishiLink_lang", selectedLanguage);

            // Redirect smoothly to the authentication portal within the same directory level
            window.location.href = "auth.html";
        });
    }
});