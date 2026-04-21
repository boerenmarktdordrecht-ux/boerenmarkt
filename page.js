function createSlider(slideSelector, prevSelector, nextSelector, intervalTime, enableScroll = false) {
    const slides = document.querySelectorAll(slideSelector);
    const prevButton = document.querySelector(prevSelector);
    const nextButton = document.querySelector(nextSelector);
    const sliderContainer = slides[0].parentElement;
    var index = 0;
    var lastChange = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[i].classList.add('active');
    }

    function changeSlide(direction) {
        const now = Date.now();
        if (now - lastChange < 500) return; // Debounce to 500ms
        lastChange = now;
        if (direction === 'next') {
            index = (index + 1) % slides.length;
        } else {
            index = (index - 1 + slides.length) % slides.length;
        }
        showSlide(index);
    }

    if (nextButton) {
        nextButton.onclick = () => {
            changeSlide('next');
        };
    }

    if (prevButton) {
        prevButton.onclick = () => {
            changeSlide('prev');
        };
    }

    if (enableScroll) {
        // Scroll-based active slide
        function updateActiveOnScroll() {
            let bestIndex = 0;
            let bestDistance = Infinity;
            slides.forEach((slide, i) => {
                const rect = slide.getBoundingClientRect();
                // Set opacity based on visibility
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    slide.style.opacity = '1';
                } else {
                    slide.style.opacity = '0';
                }
                // Find the active one (closest to center)
                const center = rect.top + rect.height / 2;
                const screenCenter = window.innerHeight / 2;
                const distance = Math.abs(center - screenCenter);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestIndex = i;
                }
            });
            if (bestIndex !== index) {
                index = bestIndex;
                showSlide(index);
            }
        }
        window.addEventListener('scroll', updateActiveOnScroll);
        // Initial check
        updateActiveOnScroll();
    }

    if (intervalTime > 0) {
        setInterval(() => {
            index = (index + 1) % slides.length;
            showSlide(index);
        }, intervalTime);
    }
}


createSlider('.hero-slider .slide', '.hero-prev', '.hero-next', 5000);
createSlider('.agenda-slide', '.agenda-prev', '.agenda-next', 0, true);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.agenda-card');
    const directions = ['left', 'right'];
    cards.forEach((card, index) => {
        let color;
        if (index < 3) color = 'green';
        else if (index < 6) color = 'blue';
        else color = 'grey';
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        card.classList.add('color-' + color, randomDirection + '-arrow');
    });
});