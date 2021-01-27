function slider({
    container,
    slide,
    nextArrow,
    prewArrow,
    currentCounter,
    totalCounter,
    wrapper,
    field
}) {
    const arrowPrew = document.querySelector(prewArrow),
        arrowNext = document.querySelector(nextArrow),
        currentSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter),
        slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
    }

    if (slides.length < 10) {
        totalSlides.innerHTML = `0${slides.length}`;
        upgradeSlideIndex();
    } else {
        totalSlides.innerHTML = slides.length;
        upgradeSlideIndex();
    }

    slidesField.style.width = 100 * slides.length + '%';

    slides.forEach(slides => {
        slides.style.width = width;
    });

    const indictors = document.createElement('ol'),
        dots = [];

    indictors.classList.add('carousel-indicators');

    slider.append(indictors);


    for (let index = 0; index < slides.length; index++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', index + 1);

        if (index == 0) {
            dot.classList.add('dot_active');
        }

        indictors.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = deleteNoDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translatex(-${offset}px)`;

            upgradeSlideIndex();

            determineActiveDot();
        });
    });

    arrowNext.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoDigits(width);
        }

        slidesField.style.transform = `translatex(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++
        }

        upgradeSlideIndex();

        determineActiveDot();
    });

    arrowPrew.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width);
        }

        slidesField.style.transform = `translatex(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--
        }

        upgradeSlideIndex();

        determineActiveDot();
    });

    function determineActiveDot() {
        dots.forEach(dot => dot.classList.remove('dot_active'));
        dots[slideIndex - 1].classList.add('dot_active');
    }

    function upgradeSlideIndex() {
        if (slides.length < 10) {
            currentSlide.innerHTML = `0${slideIndex}`;
        } else {
            currentSlide.innerHTML = slideIndex;
        }
    }
}

export default slider;