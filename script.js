
document.addEventListener("DOMContentLoaded", () => {
    const pages = [...document.querySelectorAll(".page")];
    const indicator = document.getElementById("pageIndicator");
    const heartsContainer = document.getElementById("hearts");
    const finalMessage = document.getElementById("finalMessage");

    let currentPage = 0;

    function showPage(pageId) {
        const nextIndex = pages.findIndex(page => page.id === pageId);
        if (nextIndex === -1) return;

        currentPage = nextIndex;

        pages.forEach((page, index) => {
            page.classList.toggle("active", index === currentPage);
        });

        indicator.textContent = `${currentPage + 1} / ${pages.length}`;
        finalMessage.textContent = "";

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Next-page buttons
    document.querySelectorAll("[data-next]").forEach(button => {
        button.addEventListener("click", () => {
            showPage(button.dataset.next);
        });
    });

    // Previous-page buttons
    document.querySelectorAll("[data-prev]").forEach(button => {
        button.addEventListener("click", () => {
            showPage(button.dataset.prev);
        });
    });

    // Create floating hearts in the background
    const heartSymbols = ["♡", "♥", "💕", "💗", "💖"];

    function createFloatingHeart() {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent =
            heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${14 + Math.random() * 19}px`;

        const duration = 7 + Math.random() * 7;
        heart.style.animationDuration = `${duration}s`;

        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // Start with a few hearts and continue gently
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 450);
    }

    setInterval(createFloatingHeart, 1100);

    // Make a heart burst for the virtual hug
    function createHeartBurst() {
        const symbols = ["💗", "💕", "❤️", "💖", "🫶"];

        for (let i = 0; i < 28; i++) {
            const heart = document.createElement("span");
            heart.className = "burst-heart";
            heart.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            heart.style.left = `${35 + Math.random() * 30}%`;
            heart.style.top = `${40 + Math.random() * 20}%`;
            heart.style.fontSize = `${17 + Math.random() * 17}px`;
            heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 420}px`);
            heart.style.setProperty("--dy", `${-60 - Math.random() * 300}px`);
            heart.style.setProperty("--rot", `${Math.random() * 100 - 50}deg`);

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    }

    // Talk button: shows a gentle, no-pressure message
    document.getElementById("talkBtn").addEventListener("click", () => {
        finalMessage.textContent =
            "Whenever you're ready, my love. I'll listen, honestly and patiently. ❤️";
        createHeartBurst();
    });

    // Virtual hug button
    document.getElementById("hugBtn").addEventListener("click", () => {
        finalMessage.textContent =
            "Sending you the biggest, warmest virtual hug ever! 🫂💕";
        createHeartBurst();
    });

    // Restart the experience
    document.getElementById("restartBtn").addEventListener("click", () => {
        showPage("page1");
    });

    // Initialize the first page
    showPage("page1");
});
