// Get the category radio buttons, product cards, and empty-state message.
const categoryFilters = document.querySelectorAll('input[name="menu-category"]');
const menuItems = document.querySelectorAll(".menu-item[data-category]");
const emptyState = document.querySelector("#menu-empty-state");

// Reapply the filter whenever a different category is selected.
categoryFilters.forEach((filter) => {
    filter.addEventListener("change", () => {
        let visibleCount = 0;

        // Show every item for "all"; otherwise, match the selected category.
        menuItems.forEach((item) => {
            const isVisible = filter.value === "all" || item.dataset.category === filter.value;
            item.classList.toggle("d-none", !isVisible);

            if (isVisible) {
                visibleCount += 1;
            }
        });

        // Show a message when no items match the selected category.
        emptyState.hidden = visibleCount > 0;
    });
});

// Show the back-to-top link after the visitor scrolls down the page.
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    const navbarOffcanvas = document.querySelector("#offcanvasNavbar");
    const deliveryAppsLink = document.querySelector(".delivery-apps-link");
    let isOffcanvasOpen = false;

    const updateBackToTopVisibility = () => {
        let deliveryLinkInBottomZone = false;

        if (deliveryAppsLink && window.innerWidth <= 720) {
            const deliveryLinkBounds = deliveryAppsLink.getBoundingClientRect();
            deliveryLinkInBottomZone =
                deliveryLinkBounds.bottom > window.innerHeight - 72 &&
                deliveryLinkBounds.top < window.innerHeight;
        }

        const shouldHide = window.scrollY < 200 || isOffcanvasOpen || deliveryLinkInBottomZone;
        backToTop.classList.toggle("d-none", shouldHide);
    };

    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    window.addEventListener("resize", updateBackToTopVisibility, { passive: true });

    if (navbarOffcanvas) {
        navbarOffcanvas.addEventListener("show.bs.offcanvas", () => {
            isOffcanvasOpen = true;
            updateBackToTopVisibility();
        });

        navbarOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
            isOffcanvasOpen = false;
            updateBackToTopVisibility();
        });
    }

    updateBackToTopVisibility();
}