// MaxMin — script.js v2.0

document.addEventListener('DOMContentLoaded', () => {

    // ===== CUSTOM CURSOR =====
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        });
    }

    // ===== LOADER =====
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 600);
    });

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');

    const openMenu = () => {
        hamburger.classList.add('active');
        nav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
        nav.classList.contains('active') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${entry.target.dataset.fadeIndex * 0.1}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .why-point, .contact-item, .process-step, .faq-item, .testimonial-card, .maintenance-card, .about-stat, .pricing-factor')
    .forEach(el => {
        el.classList.add('fade-in');
        // Calculate stagger index once, grouped by parent
        const siblings = Array.from(el.parentElement.querySelectorAll('.fade-in'));
        el.dataset.fadeIndex = siblings.indexOf(el);
        observer.observe(el);
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            const target = document.querySelector(href);
            if (target && href !== '#') {
                e.preventDefault();
                const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
                const offset = target.getBoundingClientRect().top + window.scrollY - headerH;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-q');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            // Open clicked (unless it was open)
            if (!isOpen) item.classList.add('open');
        });
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    if (!link.classList.contains('nav-cta')) link.classList.add('nav-active');
                }
            });
        }
    });
}, { threshold: 0.3 });

    sections.forEach(s => navObserver.observe(s));

    // ===== COUNTER ANIMATION =====
    // Bug fix: SSM stat contains no digits — skip counter, apply fade instead
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const num = parseFloat(text);
                const hasDigits = /\d/.test(text);

                if (hasDigits && !isNaN(num) && num > 1) {
                    // Numeric stat — animate counter
                    const duration = 1500;
                    const startTime = performance.now();
                    const suffix = text.includes('%') ? '%' : text.includes('+') ? '+' : '';
                    const update = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * num) + suffix;
                        if (progress < 1) requestAnimationFrame(update);
                        else el.textContent = text;
                    };
                    requestAnimationFrame(update);
                } else {
                    // Text-only stat (e.g. "SSM") — just fade in smoothly
                    el.style.opacity = '0';
                    el.style.transition = 'opacity 0.8s ease';
                    requestAnimationFrame(() => { el.style.opacity = '1'; });
                }
                counterObserver.unobserve(el);
            }
        });
    });
    counters.forEach(c => counterObserver.observe(c));

    // ===== WHATSAPP FORM =====
    // Bug fix: moved inside DOMContentLoaded so waBtn is always ready
    const waBtn = document.getElementById('wa-btn');
    if (waBtn) {
        waBtn.addEventListener('click', () => {
            // Honeypot check — if filled, it's a bot
            const honeypot = document.getElementById('honeypot');
            if (honeypot && honeypot.value !== '') return;

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceEl = document.getElementById('service');
            const service = serviceEl ? serviceEl.value : '';
            const message = document.getElementById('message').value.trim();

            if (!name || !phone) {
                alert('Sila isi nama dan no. WhatsApp anda.\nPlease fill in your name and WhatsApp number.');
                return;
            }

            // Bug fix: phone number validation
            if (!/^[0-9+\s\-]{9,15}$/.test(phone)) {
                alert('Sila masukkan nombor telefon yang sah.\nPlease enter a valid phone number.');
                return;
            }

            if (!message) {
                alert('Sila isi mesej anda.\nPlease fill in your message.');
                return;
            }

            // Button cooldown — prevent spam clicking
            waBtn.disabled = true;
            waBtn.querySelector('span').textContent = 'Sending...';
            setTimeout(() => {
                waBtn.disabled = false;
                waBtn.querySelector('span').textContent = 'Send via WhatsApp 📱';
            }, 5000);

            let text = `Salam MaxMin! 👋\n\n`;
            text += `*Nama:* ${name}\n`;
            text += `*No. WhatsApp:* ${phone}\n`;
            if (service) text += `*Perkhidmatan:* ${service}\n`;
            text += `\n*Mesej:*\n${message}\n\n`;
            text += `_Dihantar dari laman web maxmin.com.my_`;

            const waNumber = '60109464866';
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
        });
    }

});