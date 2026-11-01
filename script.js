
document.addEventListener("DOMContentLoaded", () => {

    const pages = [...document.querySelectorAll(".page")];
    const pageNumber = document.getElementById("pageNumber");
    const petalsContainer = document.getElementById("petals");
    const hugMessage = document.getElementById("hugMessage");
    const envelope = document.getElementById("envelope");

    let currentPage = 0;

    // PAGE NAVIGATION
    function showPage(id) {
        const index = pages.findIndex(page => page.id === id);

        if (index === -1) return;

        currentPage = index;

        pages.forEach((page, i) => {
            page.classList.toggle("active", i === index);
        });

        pageNumber.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;

        hugMessage.textContent = "";

        window.scrollTo({ top: 0, behavior: "smooth" });

        // Move focus to the new page for keyboard / screen-reader users
        pages[index].setAttribute("tabindex", "-1");
        pages[index].focus({ preventScroll: true });

        if (id === "page1") {
            envelope.classList.remove("open");
        }
    }

    // NEXT PAGE
    document.querySelectorAll("[data-next]").forEach(button => {
        button.addEventListener("click", () => {

            if (button.dataset.next === "page2") {
                envelope.classList.add("open");
            }

            setTimeout(() => {
                showPage(button.dataset.next);
            }, 250);

        });
    });

    // PREVIOUS PAGE
    document.querySelectorAll("[data-prev]").forEach(button => {
        button.addEventListener("click", () => {
            showPage(button.dataset.prev);
        });
    });

    // FALLING ROSE PETALS
    function createPetal() {

        const petal = document.createElement("div");
        petal.className = "petal";

        petal.style.left = Math.random() * 100 + "vw";

        const duration = 9 + Math.random() * 9;

        petal.style.animationDuration = duration + "s";
        petal.style.animationDelay = Math.random() * 2 + "s";

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + 2) * 1000);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        for (let i = 0; i < 12; i++) {
            setTimeout(createPetal, i * 450);
        }
    }

    // Petals: skip for reduced-motion users, pause when the tab is hidden
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let petalTimer = null;

    function startPetals() {
        if (reduceMotion || petalTimer) return;
        petalTimer = setInterval(createPetal, 1200);
    }

    function stopPetals() {
        clearInterval(petalTimer);
        petalTimer = null;
    }

    document.addEventListener("visibilitychange", () => {
        document.hidden ? stopPetals() : startPetals();
    });

    startPetals();

    // HEART ANIMATION
    function heartBurst() {

        const symbols = ["♥", "♡", "❤", "💗"];

        for (let i = 0; i < 35; i++) {

            const heart = document.createElement("span");

            heart.className = "burst-heart";

            heart.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            heart.style.left = "50%";
            heart.style.top = "55%";

            heart.style.color =
                Math.random() > 0.5 ? "#d8b77b" : "#c97887";

            heart.style.setProperty(
                "--dx",
                (Math.random() - 0.5) * 450 + "px"
            );

            heart.style.setProperty(
                "--dy",
                (-80 - Math.random() * 350) + "px"
            );

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1000);
        }
    }

    // VIRTUAL HUG
    document.getElementById("hugButton").addEventListener("click", () => {

        hugMessage.textContent =
            "A warm hug, a thousand kisses, and all my love. ♥";

        heartBurst();

    });

    // RESTART WEBSITE
    document.getElementById("restartButton").addEventListener("click", () => {
        showPage("page1");
    });

    // INITIALIZE
    showPage("page1");

});
