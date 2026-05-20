document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const slides = Array.from(document.querySelectorAll(".hero-slider .slide"));
    const previousButton = document.querySelector(".hero-prev");
    const nextButton = document.querySelector(".hero-next");
    let activeIndex = 0;
    let timerId;

    function updateHeaderState() {
        header?.classList.toggle("is-scrolled", window.scrollY > 80);
    }

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    if (!slides.length) {
        return;
    }

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === activeIndex);
        });
    }

    function restartTimer() {
        window.clearInterval(timerId);
        timerId = window.setInterval(() => showSlide(activeIndex + 1), 6000);
    }

    previousButton?.addEventListener("click", () => {
        showSlide(activeIndex - 1);
        restartTimer();
    });

    nextButton?.addEventListener("click", () => {
        showSlide(activeIndex + 1);
        restartTimer();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showSlide(activeIndex - 1);
            restartTimer();
        }

        if (event.key === "ArrowRight") {
            showSlide(activeIndex + 1);
            restartTimer();
        }
    });

    restartTimer();
});
