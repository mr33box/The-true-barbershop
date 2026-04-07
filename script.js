document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hero Video Fallback Logic
    const heroVideo = document.getElementById('hero-video');
    const heroFallback = document.getElementById('hero-fallback');

    if (heroVideo && heroFallback) {
        let isVideoPlaying = false;

        const showFallback = () => {
            if (!isVideoPlaying) {
                heroFallback.style.display = 'block';
                heroVideo.style.display = 'none';
            }
        };

        // If an error occurs loading the video
        heroVideo.addEventListener('error', showFallback, true);

        // Check if video plays successfully
        heroVideo.addEventListener('playing', () => {
            isVideoPlaying = true;
        });

        // Autoplay fallback check (if browser blocks autoplay, or if it's too slow)
        setTimeout(() => {
            if (heroVideo.readyState < 3 || !isVideoPlaying) {
                showFallback();
            }
        }, 3000);
        
        // Attempt manual play to catch Promise rejections (autoplay blocks)
        try {
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    showFallback();
                });
            }
        } catch (e) {
            showFallback();
        }
    }

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon (list to x)
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (!isActive) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
    }

    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animations using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});
