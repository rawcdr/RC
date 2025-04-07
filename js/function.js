/*Navbar*/

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav_links a");
    const sections = document.querySelectorAll("section, .our_socials"); // Include "our_socials"
    const observerOptions = {
        threshold: 0.5,
    };

    let isScrolling = false; // Manage click-triggered scrolling

    const removeActiveClass = () => {
        navLinks.forEach(link => link.classList.remove("active"));
    };

    const handleIntersect = (entries) => {
        if (isScrolling) return; // Skip observer updates during smooth scrolling

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                if (id) {
                    removeActiveClass();
                    const activeLink = document.querySelector(`.nav_links a[href$="#${id}"]`);
                    if (activeLink) activeLink.classList.add("active");
                }
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetHref = link.getAttribute("href");

            // Handle internal links (e.g., #about, #contact)
            if (targetHref.includes("#")) {
                event.preventDefault();

                const [baseUrl, sectionId] = targetHref.split("#");
                if (baseUrl && !window.location.href.includes(baseUrl)) {
                    // Redirect to the base URL (e.g., index.html)
                    window.location.href = `${baseUrl}#${sectionId}`;
                } else {
                    // Smooth scrolling for same-page links
                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        removeActiveClass();
                        link.classList.add("active");

                        isScrolling = true;
                        targetSection.scrollIntoView({ behavior: "smooth" });

                        setTimeout(() => {
                            isScrolling = false; // Reset scrolling state
                        }, 1000); // Adjust timeout to match scroll animation duration
                    }
                }
            } else {
                // Allow default behavior for external links
                removeActiveClass();
                link.classList.add("active");
            }
        });
    });

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute("id") || section.classList.contains("our_socials")) {
            observer.observe(section);
        }
    });
});

/*Slider*/


document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slides img');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function init() {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.classList.remove('active');
        });
        slides[0].classList.add('active');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[0].classList.add('active');
    }

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].style.opacity = '0';

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    const slideContainer = document.querySelector('.slide_container');
    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    slideContainer.addEventListener('mouseleave', startAutoSlide);

    init();
    startAutoSlide();
});