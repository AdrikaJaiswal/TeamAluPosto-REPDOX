document.addEventListener("DOMContentLoaded", () => {
    const btnModeLogin = document.getElementById("btn-mode-login");
    const btnModeRegister = document.getElementById("btn-mode-register");
    const authViewTitle = document.getElementById("auth-view-title");
    const regFieldsContainer = document.getElementById("registration-only-fields");
    const authForm = document.getElementById("auth-form");
    const geoInput = document.getElementById("geo-coordinates");

    let activeMode = "login"; // Default state

    // 📍 Real-time Geolocation coordinate capture payload matching BE coordinates schema
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                geoInput.value = JSON.stringify(coords);
            },
            (error) => console.warn("Location tracking disabled or denied. Proceeding without vectors."),
            { enableHighAccuracy: true }
        );
    }

    // Dynamic state layout switching engine
    // Updated state layout switching engine (Role validation removed)
    const toggleAuthMode = (mode) => {
    activeMode = mode;
    const nameInput = document.getElementById("reg-name");

    if (mode === "register") {
        btnModeRegister.classList.add("active");
        btnModeLogin.classList.remove("active");
        authViewTitle.textContent = "CREATE ACCOUNT";
        regFieldsContainer.style.display = "block";

        // Enforce name input validation dynamically
        nameInput.setAttribute("required", "true");
    } else {
        btnModeLogin.classList.add("active");
        btnModeRegister.classList.remove("active");
        authViewTitle.textContent = "WELCOME BACK";
        regFieldsContainer.style.display = "none";

        // Lift name validation criteria dynamically
        nameInput.removeAttribute("required");
    }
    };

    btnModeLogin.addEventListener("click", () => toggleAuthMode("login"));
    btnModeRegister.addEventListener("click", () => toggleAuthMode("register"));

    // 🌐 Node.js / Express API Fetch Connection Pipeline
    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(authForm);
        const requestPayload = Object.fromEntries(formData.entries());

        // Parse coordinate string metadata back into objects if available
        if (requestPayload.coordinates) {
            try {
                requestPayload.coordinates = JSON.parse(requestPayload.coordinates);
            } catch (err) {
                requestPayload.coordinates = null;
            }
        }

        // Calibrate correct routing endpoints based on view configuration states
        const targetEndpoint = activeMode === "login" ? "/api/auth/login" : "/api/auth/register";

        try {
            const response = await fetch(targetEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestPayload)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Authentication transmission rejected.");
            }

            // Secure user session authorization token storage
            localStorage.setItem("krishiLink_token", data.token);
            localStorage.setItem("krishiLink_user", JSON.stringify(data.user));

            alert(data.message || "Session authenticated!");
            
            // Access granted -> Redirect seamlessly out of folder back up to main dashboard root
            window.location.href = "../home.html";

        } catch (error) {
            alert(`Authentication Error: ${error.message}`);
        }
    });
});