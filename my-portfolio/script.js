/* =========================================================
   SHARED SITE COMPONENTS
   =========================================================

   This file handles:
   1. Shared navigation
   2. Shared footer
   3. Mobile navigation
   4. Automatically highlighting the current page

   This means you only need to modify the navigation/footer
   in this file instead of editing every HTML page separately.
   ========================================================= */


/* =========================================================
   1. SHARED HEADER
   ========================================================= */

const headerHTML = `
<header class="site-header">

    <div class="nav-container">

        <!-- Website logo / name -->
        <a href="index.html" class="logo">
            He Minni
        </a>


        <!-- Mobile menu button -->
        <button
            class="menu-button"
            id="menuButton"
            aria-label="Open navigation menu"
            aria-expanded="false"
        >
            ☰
        </button>


        <!-- Main navigation -->
        <nav aria-label="Main navigation">

            <ul class="nav-links" id="navLinks">

                <li>
                    <a href="index.html" data-page="index.html">
                        Home
                    </a>
                </li>

                <li>
                    <a href="portfolio.html" data-page="portfolio.html">
                        Portfolio
                    </a>
                </li>

                <li>
                    <a href="blog.html" data-page="blog.html">
                        Blog
                    </a>
                </li>

                <li>
                    <a href="about.html" data-page="about.html">
                        About
                    </a>
                </li>

            </ul>

        </nav>

    </div>

</header>
`;


/* =========================================================
   2. SHARED FOOTER
   ========================================================= */

const footerHTML = `
<footer class="site-footer">

    <div class="footer-container">

        <div class="footer-brand">

            <h2>
                He Minni
            </h2>

            <p>
                Designer, developer, and creator building thoughtful
                digital experiences.
            </p>

        </div>


        <nav aria-label="Footer navigation">

            <ul class="footer-links">

                <li>
                    <a href="index.html">
                        Home
                    </a>
                </li>

                <li>
                    <a href="portfolio.html">
                        Portfolio
                    </a>
                </li>

                <li>
                    <a href="blog.html">
                        Blog
                    </a>
                </li>

                <li>
                    <a href="about.html">
                        About
                    </a>
                </li>

                <li>
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </li>

            </ul>

        </nav>

    </div>


    <div class="footer-bottom">

        © <span id="currentYear"></span> Your Name.
        All rights reserved.

    </div>

</footer>
`;


/* =========================================================
   3. INSERT SHARED COMPONENTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const headerContainer =
        document.getElementById("site-header");

    const footerContainer =
        document.getElementById("site-footer");


    // Insert the shared header
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }


    // Insert the shared footer
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }


    // Initialize the rest of the functionality
    initializeNavigation();
    initializeCurrentYear();
    highlightCurrentPage();

});


/* =========================================================
   4. MOBILE NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    // Stop if the navigation is not available
    if (!menuButton || !navLinks) {
        return;
    }


    menuButton.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");


        // Update accessibility state
        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        // Change the icon
        menuButton.textContent =
            isOpen ? "×" : "☰";

    });


    /*
     * Close the mobile navigation after
     * clicking one of the navigation links.
     */
    const links =
        navLinks.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   5. CURRENT YEAR
   ========================================================= */

function initializeCurrentYear() {

    const yearElement =
        document.getElementById("currentYear");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   6. ACTIVE NAVIGATION LINK
   ========================================================= */

function highlightCurrentPage() {

    /*
     * Get the current file name from the URL.
     *
     * Example:
     * /portfolio.html
     *
     * becomes:
     * portfolio.html
     */

    let currentPage =
        window.location.pathname.split("/").pop();


    /*
     * When the website is opened at the root URL,
     * browsers may return an empty string.
     *
     * In that case, treat it as index.html.
     */

    if (
        currentPage === "" ||
        currentPage === "/"
    ) {
        currentPage = "index.html";
    }


    /*
     * Find the navigation link that matches
     * the current page.
     */

    const currentLink =
        document.querySelector(
            `[data-page="${currentPage}"]`
        );


    if (currentLink) {
        currentLink.classList.add("active");
    }

}