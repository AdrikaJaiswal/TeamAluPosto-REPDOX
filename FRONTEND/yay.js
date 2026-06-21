document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".mobile-container");
    const openBtn = document.querySelector(".nav-menu-btn");
    const closeBtn = document.getElementById("close-menu-trigger");
    const backdrop = document.getElementById("sidebar-menu");

    // Open Drawer menu context window
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            container.classList.add("nav-open");
        });
    }

    // Close Drawer menu operations contexts 
    const closeMenu = () => container.classList.remove("nav-open");

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) closeMenu();
        });
    }
});