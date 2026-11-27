// ==================== Menu Category Filter ====================
// Get the category filters, menu items, and empty-state message from the DOM.
const categoryFilters = document.querySelectorAll('input[name="menu-category"]');
const menuItems = document.querySelectorAll(".menu-item[data-category]");
const emptyState = document.querySelector("#menu-empty-state");

// Run the filter again whenever a different category is selected.
categoryFilters.forEach((filter) => {
    filter.addEventListener("change", () => {
        let visibleCount = 0;

        // Show all items for "all"; otherwise, match each item's category.
        menuItems.forEach((item) => {
            const isVisible = filter.value === "all" || item.dataset.category === filter.value;
            // Add or remove Bootstrap's d-none class to hide or show the item.
            item.classList.toggle("d-none", !isVisible);

            if (isVisible) {
                visibleCount += 1;
            }
        });

        // Show the empty-state message when no items match.
        emptyState.hidden = visibleCount > 0;
    });
});

// ==================== My Orders Filter ====================
// Get the order status filters, order records, and empty-state message.
const orderFilters = document.querySelectorAll('input[name="order-status"]');
const orderRecords = document.querySelectorAll(".order-record[data-order-status]");
const ordersEmptyState = document.querySelector("#orders-empty-state");

// Show orders that match the selected status.
orderFilters.forEach((filter) => {
    filter.addEventListener("change", () => {
        let visibleCount = 0;

        orderRecords.forEach((order) => {
            const isVisible =
                filter.value === "all" || order.dataset.orderStatus === filter.value;
            order.classList.toggle("d-none", !isVisible);

            if (isVisible) {
                visibleCount += 1;
            }
        });

        // Show a message when there are no orders in the selected status.
        if (ordersEmptyState) {
            ordersEmptyState.hidden = visibleCount > 0;
        }
    });
});

// ==================== Back-to-Top Button ====================
// Get the back-to-top link; not every page includes one.
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    const navbarOffcanvas = document.querySelector("#offcanvasNavbar");
    const deliveryAppsLink = document.querySelector(".delivery-apps-link");
    let isOffcanvasOpen = false;

    // Update its visibility based on scrolling, the menu, and the delivery link.
    const updateBackToTopVisibility = () => {
        let overlapsDeliveryLink = false;

        if (deliveryAppsLink) {
            // Temporarily show it so its position on the page can be measured.
            const backToTopWasHidden = backToTop.classList.contains("d-none");
            backToTop.classList.remove("d-none");
            const backToTopBounds = backToTop.getBoundingClientRect();

            // Restore its previous hidden state after measuring.
            if (backToTopWasHidden) {
                backToTop.classList.add("d-none");
            }

            // Check whether the two elements overlap on screen.
            const deliveryLinkBounds = deliveryAppsLink.getBoundingClientRect();
            overlapsDeliveryLink =
                deliveryLinkBounds.left < backToTopBounds.right &&
                deliveryLinkBounds.right > backToTopBounds.left &&
                deliveryLinkBounds.top < backToTopBounds.bottom &&
                deliveryLinkBounds.bottom > backToTopBounds.top;
        }

        // Hide it near the top, while the mobile menu is open, or when it overlaps the link.
        const shouldHide = window.scrollY < 200 || isOffcanvasOpen || overlapsDeliveryLink;
        backToTop.classList.toggle("d-none", shouldHide);
    };

    // Update when the page scrolls or the window is resized.
    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    window.addEventListener("resize", updateBackToTopVisibility, { passive: true });

    if (navbarOffcanvas) {
        // Hide the back-to-top link while the Bootstrap offcanvas menu is open.
        navbarOffcanvas.addEventListener("show.bs.offcanvas", () => {
            isOffcanvasOpen = true;
            updateBackToTopVisibility();
        });

        navbarOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
            isOffcanvasOpen = false;
            updateBackToTopVisibility();
        });
    }

    // Set the correct visibility as soon as the page loads.
    updateBackToTopVisibility();
}

// ==================== Contact Form ====================
// Set up the contact form only on pages where it exists.
const contactForm = document.querySelector("#contact-form");

if (contactForm instanceof HTMLFormElement) {
    const contactFormStatus = contactForm.querySelector("#contact-form-status");

    if (!(contactFormStatus instanceof HTMLElement)) {
        throw new Error("Contact form status element is missing.");
    }

    // Prevent normal submission because no contact service is connected yet.
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactFormStatus.textContent =
            "Your message was not sent. The contact service is not connected yet.";
        contactFormStatus.hidden = false;
    });
}

// ==================== Password Visibility Toggle ====================
// Get all Show/Hide password buttons on the sign-in and create-account pages.
const passwordToggles = document.querySelectorAll(".signin-password-toggle[data-password-target]");

passwordToggles.forEach((toggle) => {
    // Confirm the element is a button before using its button properties.
    if (!(toggle instanceof HTMLButtonElement)) {
        return;
    }

    // Read the password input's ID from data-password-target.
    const targetId = toggle.dataset.passwordTarget;
    const passwordInput = targetId ? document.getElementById(targetId) : null;

    if (!(passwordInput instanceof HTMLInputElement)) {
        throw new Error("Password toggle target is missing or is not an input.");
    }

    // Toggle the input type and update the accessible label.
    toggle.addEventListener("click", () => {
        const shouldShowPassword = passwordInput.type === "password";
        passwordInput.type = shouldShowPassword ? "text" : "password";
        toggle.textContent = shouldShowPassword ? "Hide" : "Show";
        toggle.setAttribute("aria-label", shouldShowPassword ? "Hide password" : "Show password");
        toggle.setAttribute("aria-pressed", String(shouldShowPassword));
    });
});

// ==================== Sign-In Form ====================
// Set up the sign-in form only on pages where it exists.
const signinForm = document.querySelector("#signin-form");

if (signinForm instanceof HTMLFormElement) {
    const signinStatus = signinForm.querySelector("#signin-status");

    if (!(signinStatus instanceof HTMLElement)) {
        throw new Error("Sign-in form status element is missing.");
    }

    // Explain that the details were not sent because no backend is connected yet.
    signinForm.addEventListener("submit", (event) => {
        event.preventDefault();
        signinStatus.textContent =
            "Sign-in is not connected yet. Your account details were not sent.";
        signinStatus.hidden = false;
    });
}

// ==================== Create-Account Form ====================
// Set up the create-account form only on pages where it exists.
const createAccountForm = document.querySelector("#create-account-form");

if (createAccountForm instanceof HTMLFormElement) {
    const createAccountStatus = createAccountForm.querySelector("#create-account-status");
    const accountPassword = createAccountForm.querySelector("#create-account-password");
    const confirmPassword = createAccountForm.querySelector("#create-account-confirm-password");

    if (!(createAccountStatus instanceof HTMLElement)) {
        throw new Error("Create account form status element is missing.");
    }

    if (!(accountPassword instanceof HTMLInputElement) || !(confirmPassword instanceof HTMLInputElement)) {
        throw new Error("Create account password fields are missing.");
    }

    // Show a validation error when the password fields do not match.
    const validatePasswordMatch = () => {
        const passwordsMatch =
            !confirmPassword.value || confirmPassword.value === accountPassword.value;
        confirmPassword.setCustomValidity(passwordsMatch ? "" : "Passwords do not match.");
    };

    accountPassword.addEventListener("input", validatePasswordMatch);
    confirmPassword.addEventListener("input", validatePasswordMatch);

    // Explain that the details were not sent because no backend is connected yet.
    createAccountForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createAccountStatus.textContent =
            "Account creation is not connected yet. Your details were not sent.";
        createAccountStatus.hidden = false;
    });
}
