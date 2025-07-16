// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Fade In Up Animation
const fadeInUpElements = document.querySelectorAll('.service-card, .card, .trust-badge, .accordion-item');
const fadeInUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeInUpObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInUpElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    fadeInUpObserver.observe(element);
});

// Counter Animation for Metrics
const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    };
    
    updateCounter();
};

// Observe metric values
const metricValues = document.querySelectorAll('.metric-value');
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = parseInt(entry.target.textContent);
            if (!isNaN(value)) {
                animateCounter(entry.target, value);
            }
            metricObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

metricValues.forEach(element => {
    metricObserver.observe(element);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.sticky-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-lg)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = 'var(--shadow-md)';
        header.style.backgroundColor = 'var(--color-bg-white)';
    }
    
    lastScroll = currentScroll;
});

// Accordion Functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all accordions
        document.querySelectorAll('.accordion-item').forEach(accordion => {
            accordion.classList.remove('active');
        });
        
        // Open clicked accordion if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Slider Functionality
const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.slider-nav.prev');
const nextBtn = document.querySelector('.slider-nav.next');
const dots = document.querySelectorAll('.slider-dot');

let currentSlide = 0;

const updateSlider = () => {
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
};

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto-play slider
if (slider) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);
}

// Modal Enhancement
const modal = document.getElementById('loginModal');
const modalContent = modal?.querySelector('.modal-content');

if (modal) {
    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalContent.classList.remove('active');
        }
    });
    
    // Add escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modalContent.classList.remove('active');
        }
    });
}

// Form Input Animation
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Loading Animation for Form Submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="loading-spinner"></span> 送信中...';
            submitBtn.disabled = true;
        }
    });
});

// Parallax Effect for Hero Section
const heroSection = document.querySelector('.hero');
const heroImage = heroSection?.querySelector('.hero-bg img');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Service Card Hover Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Initialize AOS-like animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('.section-title').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('animate-fade-in');
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <nav class="mobile-nav">
            <a href="#services" class="mobile-nav-link">サービス</a>
            <a href="#pricing" class="mobile-nav-link">料金・見積り</a>
            <a href="#tracking" class="mobile-nav-link">追跡</a>
            <a href="#cases" class="mobile-nav-link">導入事例</a>
            <a href="#company" class="mobile-nav-link">会社情報</a>
        </nav>
    `;
    document.body.appendChild(mobileMenu);
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    .loading-spinner {
        display: inline-block;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        width: 16px;
        height: 16px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .mobile-menu {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background-color: var(--color-bg-white);
        box-shadow: var(--shadow-lg);
        transform: translateY(-100%);
        transition: transform var(--transition-base);
        z-index: var(--z-index-dropdown);
    }
    
    .mobile-menu.active {
        transform: translateY(0);
    }
    
    .mobile-nav {
        display: flex;
        flex-direction: column;
        padding: var(--spacing-4);
    }
    
    .mobile-nav-link {
        padding: var(--spacing-3) var(--spacing-4);
        color: var(--color-text-primary);
        text-decoration: none;
        border-bottom: 1px solid var(--color-border-light);
        transition: all var(--transition-fast);
    }
    
    .mobile-nav-link:hover {
        background-color: var(--color-bg-off-white);
        color: var(--color-primary-green);
    }
    
    .form-group.focused .form-label {
        color: var(--color-primary-green);
        transform: translateY(-2px);
        transition: all var(--transition-fast);
    }
`;
document.head.appendChild(style);