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