        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav_links');

        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add fade-in animation to elements as they scroll into view
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });



        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
        
                const section = button.dataset.section;
        
                // Handle navigation based on button clicked
                if (section === 'all') {
                    // Scroll to top of events section
                    document.querySelector('.events-section').scrollIntoView({ behavior: 'smooth' });
                } else if (section === 'ongoing') {
                    document.querySelector('[aria-label="Ongoing events"]').scrollIntoView({ behavior: 'smooth' });
                } else if (section === 'upcoming') {
                    document.querySelector('[aria-label="Upcoming events"]').scrollIntoView({ behavior: 'smooth' });
                } else if (section === 'past') {
                    document.querySelector('[aria-label="Past events"]').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });