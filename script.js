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
        let overlapsDeliveryLink = false;

        if (deliveryAppsLink) {
            const backToTopWasHidden = backToTop.classList.contains("d-none");
            backToTop.classList.remove("d-none");
            const backToTopBounds = backToTop.getBoundingClientRect();

            if (backToTopWasHidden) {
                backToTop.classList.add("d-none");
            }

            const deliveryLinkBounds = deliveryAppsLink.getBoundingClientRect();
            overlapsDeliveryLink =
                deliveryLinkBounds.left < backToTopBounds.right &&
                deliveryLinkBounds.right > backToTopBounds.left &&
                deliveryLinkBounds.top < backToTopBounds.bottom &&
                deliveryLinkBounds.bottom > backToTopBounds.top;
        }

        const shouldHide = window.scrollY < 200 || isOffcanvasOpen || overlapsDeliveryLink;
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

const contactForm = document.querySelector("#contact-form");

if (contactForm instanceof HTMLFormElement) {
    const contactFormStatus = contactForm.querySelector("#contact-form-status");

    if (!(contactFormStatus instanceof HTMLElement)) {
        throw new Error("Contact form status element is missing.");
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactFormStatus.textContent =
            "Your message was not sent. The contact service is not connected yet.";
        contactFormStatus.hidden = false;
    });
}

const passwordToggles = document.querySelectorAll(".signin-password-toggle[data-password-target]");

passwordToggles.forEach((toggle) => {
    if (!(toggle instanceof HTMLButtonElement)) {
        return;
    }

    const targetId = toggle.dataset.passwordTarget;
    const passwordInput = targetId ? document.getElementById(targetId) : null;

    if (!(passwordInput instanceof HTMLInputElement)) {
        throw new Error("Password toggle target is missing or is not an input.");
    }

    toggle.addEventListener("click", () => {
        const shouldShowPassword = passwordInput.type === "password";
        passwordInput.type = shouldShowPassword ? "text" : "password";
        toggle.textContent = shouldShowPassword ? "Hide" : "Show";
        toggle.setAttribute("aria-label", shouldShowPassword ? "Hide password" : "Show password");
        toggle.setAttribute("aria-pressed", String(shouldShowPassword));
    });
});

const signinForm = document.querySelector("#signin-form");

if (signinForm instanceof HTMLFormElement) {
    const signinStatus = signinForm.querySelector("#signin-status");

    if (!(signinStatus instanceof HTMLElement)) {
        throw new Error("Sign-in form status element is missing.");
    }

    signinForm.addEventListener("submit", (event) => {
        event.preventDefault();
        signinStatus.textContent =
            "Sign-in is not connected yet. Your account details were not sent.";
        signinStatus.hidden = false;
    });
}

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

    const validatePasswordMatch = () => {
        const passwordsMatch =
            !confirmPassword.value || confirmPassword.value === accountPassword.value;
        confirmPassword.setCustomValidity(passwordsMatch ? "" : "Passwords do not match.");
    };

    accountPassword.addEventListener("input", validatePasswordMatch);
    confirmPassword.addEventListener("input", validatePasswordMatch);

    createAccountForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createAccountStatus.textContent =
            "Account creation is not connected yet. Your details were not sent.";
        createAccountStatus.hidden = false;
    });
}