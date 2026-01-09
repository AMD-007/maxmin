// Enhanced JavaScript with Mobile Support
class PremiumWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoading();
        this.setupMobileMenu();
        this.setupHeader();
        this.setupVideo();
        this.setupSmoothScrolling();
        this.setupObservers();
        this.setupTouchInteractions();
        this.fixTextOverflow();
    }

    setupLoading() {
        const loading = document.getElementById('loading');
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 800);
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const body = document.body;

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    setupHeader() {
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    setupVideo() {
        const video = document.querySelector('.hero-video');
        if (video) {
            // Set video attributes for mobile
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('autoplay', '');
            video.setAttribute('loop', '');
            
            // Handle video playback
            const playVideo = () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay prevented, mute and try again
                        video.muted = true;
                        video.play();
                    });
                }
            };
            
            // Try to play after user interaction
            document.addEventListener('click', playVideo, { once: true });
            
            // Also try on load
            video.addEventListener('loadeddata', playVideo);
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupTouchInteractions() {
        // Add touch-specific interactions
        if ('ontouchstart' in window) {
            // Prevent :hover styles on touch
            document.addEventListener('touchstart', () => {}, true);
            
            // Add tap feedback
            document.querySelectorAll('.btn, .nav-cta, .mobile-nav-link').forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        }
    }

    fixTextOverflow() {
        // Ensure all text containers have proper overflow handling
        const textContainers = document.querySelectorAll('.hero-title, .hero-subtitle, .section-title, .section-subtitle, .step-description');
        textContainers.forEach(container => {
            container.style.wordWrap = 'break-word';
            container.style.overflowWrap = 'break-word';
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PremiumWebsite();
});

// Handle resize events
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Fix for mobile viewport height
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
setViewportHeight();