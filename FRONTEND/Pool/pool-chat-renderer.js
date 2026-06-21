document.addEventListener("DOMContentLoaded", () => {
    // Read unique string parameter configurations passed from feed row anchors
    const params = new URLSearchParams(window.location.search);
    
    const user = params.get("user") || "Owner";
    const crop = params.get("crop") || "FREIGHT";
    const weight = params.get("weight") || "--";
    const packageType = params.get("package") || "--";
    const route = params.get("route") || "-- to --";
    const time = params.get("time") || "--";
    const date = params.get("date") || "--/--/----";
    const status = params.get("status") || "pending"; // 'pending', 'accepted', 'rejected'

    // Interpolate string targets cleanly into preview blocks
    document.getElementById("chat-username-title").textContent = user;
    document.getElementById("preview-crop").textContent = crop.toUpperCase();
    document.getElementById("preview-weight").textContent = weight;
    document.getElementById("preview-package").textContent = packageType;
    document.getElementById("preview-route").textContent = route;
    document.getElementById("preview-time").textContent = time;
    document.getElementById("preview-date").textContent = date;

    // Optional phone number widgets dynamic fallback mapping logic
    const lbl = document.getElementById("widget-user-lbl");
    const phoneNum = document.getElementById("widget-owner-phone");
    if (lbl) lbl.textContent = user;
    if (phoneNum && user === "Raju S.") phoneNum.textContent = "+91 12345 67890";
    if (phoneNum && user === "Bikram B.") phoneNum.textContent = "+91 98765 43210";

    // Toggle baseline states via class injection
    const chatPanel = document.getElementById("main-chat-panel");
    if (chatPanel) {
        chatPanel.className = "chat-panel"; // Reset structural baseline
        chatPanel.classList.add(`is-${status}`);
    }

    // Clipboard interface integration
    const copyBtn = document.getElementById("btn-copy-action");
    if (copyBtn && phoneNum) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(phoneNum.textContent);
            alert("Contact details copied to clipboard!");
        });
    }
});