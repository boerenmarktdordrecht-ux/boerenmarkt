function createSlider(slideSelector, prevSelector, nextSelector, intervalTime) {
    const slides = document.querySelectorAll(slideSelector);
    const prevButton = document.querySelector(prevSelector);
    const nextButton = document.querySelector(nextSelector);
    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[i].classList.add('active');
    }

    if (nextButton) {
        nextButton.onclick = () => {
            index = (index + 1) % slides.length;
            showSlide(index);
        };
    }

    if (prevButton) {
        prevButton.onclick = () => {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        };
    }

    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, intervalTime);
}


createSlider('.hero-slider .slide', '.hero-prev', '.hero-next', 5000);
createSlider('.agenda-slide', '.agenda-prev', '.agenda-next', 4500);