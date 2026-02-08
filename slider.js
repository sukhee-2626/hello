// ===== HERO BANNER SLIDER =====
let currentSlideIndex = 0;
let slideInterval;

// Initialize slider
function initSlider() {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) return;

    // Wrap around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }

    // Trigger content animation
    const slideContent = slides[currentSlideIndex].querySelector('.slide-content');
    if (slideContent) {
        slideContent.style.animation = 'none';
        setTimeout(() => {
            slideContent.style.animation = 'slideContentIn 0.8s ease';
        }, 10);
    }
}

// Change slide (next/prev)
function changeSlide(direction) {
    stopAutoSlide();
    showSlide(currentSlideIndex + direction);
    startAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    stopAutoSlide();
    showSlide(index);
    startAutoSlide();
}

// Auto slide
function startAutoSlide() {
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        changeSlide(-1);
    }
}

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSlider);

console.log('🎬 Hero slider initialized!');
