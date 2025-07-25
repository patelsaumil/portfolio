// Typewriter effect for hero section
const roles = ['Full-Stack Developer', 'UX Designer', 'Project Manager'];
let currentRole = 0;
let currentChar = 0;
let isDeleting = false;
let typewriterElement;

function typeWriter() {
    // Get the element each time to ensure it exists
    typewriterElement = document.getElementById('typewriter');
    
    if (!typewriterElement) {
        // If element doesn't exist yet, try again in 100ms
        setTimeout(typeWriter, 100);
        return;
    }
    
    const currentText = roles[currentRole];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typewriterElement.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentChar === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % roles.length;
        typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(typeWriter, typeSpeed);
}

// Initialize typewriter with safety check
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        typeWriter();
    } else {
        console.log('Typewriter element not found, retrying...');
        setTimeout(initializeTypewriter, 100);
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Scroll animations for sections
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.section-fade');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Navigation link smooth scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Form submission handler
function initializeContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
            
            // Reset form
            this.reset();
        });
    }
}

// Skill icons hover effect
function initializeSkillIcons() {
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Intersection Observer for better performance
function initializeIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.section-fade').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', handleScrollAnimations);
    }
}

// Create SVG images for case study
function createCaseStudyImages() {
    // Hero image SVG
    const heroImageContainer = document.querySelector('#case-study .bg-gradient-to-r');
    if (heroImageContainer) {
        heroImageContainer.innerHTML = `
            <svg viewBox="0 0 800 200" class="w-full h-full">
                <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="800" height="200" fill="url(#heroGrad)"/>
                <circle cx="150" cy="100" r="40" fill="rgba(255,255,255,0.2)"/>
                <circle cx="350" cy="60" r="25" fill="rgba(255,255,255,0.15)"/>
                <circle cx="650" cy="140" r="35" fill="rgba(255,255,255,0.1)"/>
                <rect x="50" y="80" width="120" height="40" rx="20" fill="rgba(255,255,255,0.3)"/>
                <rect x="200" y="120" width="80" height="30" rx="15" fill="rgba(255,255,255,0.25)"/>
                <rect x="500" y="70" width="150" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
                <text x="400" y="110" text-anchor="middle" fill="white" font-size="24" font-weight="bold">🎨 Nuit Blanche Toronto 2025</text>
            </svg>
        `;
    }

    // Process images
    createProcessImages();
    
    // Before/After images
    createBeforeAfterImages();
}

function createProcessImages() {
    // Research process image
    const researchContainer = document.querySelector('img[alt="Research Process"]')?.parentElement;
    if (researchContainer) {
        researchContainer.innerHTML = `
            <svg viewBox="0 0 100 100" class="w-12 h-12">
                <circle cx="50" cy="50" r="45" fill="#f3f4f6" stroke="#6366f1" stroke-width="2"/>
                <circle cx="40" cy="40" r="15" fill="none" stroke="#6366f1" stroke-width="3"/>
                <line x1="52" y1="52" x2="70" y2="70" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
                <circle cx="25" cy="25" r="3" fill="#8b5cf6"/>
                <circle cx="75" cy="25" r="3" fill="#8b5cf6"/>
                <circle cx="25" cy="75" r="3" fill="#8b5cf6"/>
            </svg>
        `;
    }

    // Planning process image
    const planningContainer = document.querySelector('img[alt="Planning Process"]')?.parentElement;
    if (planningContainer) {
        planningContainer.innerHTML = `
            <svg viewBox="0 0 100 100" class="w-12 h-12">
                <rect x="20" y="15" width="60" height="70" rx="5" fill="#f3f4f6" stroke="#6366f1" stroke-width="2"/>
                <line x1="30" y1="30" x2="70" y2="30" stroke="#6366f1" stroke-width="2"/>
                <line x1="30" y1="45" x2="60" y2="45" stroke="#8b5cf6" stroke-width="2"/>
                <line x1="30" y1="60" x2="65" y2="60" stroke="#6366f1" stroke-width="2"/>
                <circle cx="25" cy="30" r="2" fill="#6366f1"/>
                <circle cx="25" cy="45" r="2" fill="#8b5cf6"/>
                <circle cx="25" cy="60" r="2" fill="#6366f1"/>
            </svg>
        `;
    }

    // Prototyping process image
    const prototypingContainer = document.querySelector('img[alt="Prototyping Process"]')?.parentElement;
    if (prototypingContainer) {
        prototypingContainer.innerHTML = `
            <svg viewBox="0 0 100 100" class="w-12 h-12">
                <rect x="15" y="25" width="70" height="50" rx="8" fill="#f3f4f6" stroke="#6366f1" stroke-width="2"/>
                <rect x="25" y="35" width="20" height="15" rx="3" fill="#8b5cf6"/>
                <rect x="55" y="35" width="20" height="15" rx="3" fill="#6366f1"/>
                <rect x="25" y="55" width="50" height="8" rx="4" fill="#e5e7eb"/>
                <circle cx="35" cy="15" r="8" fill="#fbbf24"/>
                <path d="M35 7 L39 15 L31 15 Z" fill="#f59e0b"/>
            </svg>
        `;
    }

    // Iteration process image
    const iterationContainer = document.querySelector('img[alt="Iteration Process"]')?.parentElement;
    if (iterationContainer) {
        iterationContainer.innerHTML = `
            <svg viewBox="0 0 100 100" class="w-12 h-12">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#6366f1" stroke-width="3"/>
                <path d="M 50 15 A 35 35 0 0 1 75 35" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
                <polygon points="70,25 80,30 75,40" fill="#8b5cf6"/>
                <circle cx="50" cy="50" r="8" fill="#6366f1"/>
                <circle cx="30" cy="30" r="4" fill="#fbbf24"/>
                <circle cx="70" cy="70" r="4" fill="#10b981"/>
            </svg>
        `;
    }
}

function createBeforeAfterImages() {
    // Before image
    const beforeContainer = document.querySelector('img[alt="Nuit Blanche Website Before Redesign"]')?.parentElement;
    if (beforeContainer) {
        beforeContainer.innerHTML = `
            <svg viewBox="0 0 400 200" class="w-full h-full rounded-2xl">
                <rect width="400" height="200" fill="#f9fafb"/>
                <rect x="0" y="0" width="400" height="40" fill="#e5e7eb"/>
                <rect x="20" y="10" width="60" height="20" rx="3" fill="#9ca3af"/>
                <rect x="320" y="10" width="60" height="20" rx="3" fill="#9ca3af"/>
                <rect x="20" y="60" width="360" height="20" rx="3" fill="#d1d5db"/>
                <rect x="20" y="90" width="280" height="15" rx="3" fill="#e5e7eb"/>
                <rect x="20" y="115" width="200" height="15" rx="3" fill="#e5e7eb"/>
                <rect x="20" y="150" width="100" height="30" rx="5" fill="#9ca3af"/>
                <text x="200" y="195" text-anchor="middle" fill="#6b7280" font-size="12">Old Design - Poor UX</text>
            </svg>
        `;
    }

    // After image
    const afterContainer = document.querySelector('img[alt="Nuit Blanche Website After Redesign"]')?.parentElement;
    if (afterContainer) {
        afterContainer.innerHTML = `
            <svg viewBox="0 0 400 200" class="w-full h-full rounded-2xl">
                <defs>
                    <linearGradient id="afterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ddd6fe;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#e0e7ff;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="400" height="200" fill="url(#afterGrad)"/>
                <rect x="0" y="0" width="400" height="50" fill="#6366f1" opacity="0.9"/>
                <rect x="20" y="15" width="80" height="20" rx="10" fill="white" opacity="0.9"/>
                <circle cx="350" cy="25" r="15" fill="white" opacity="0.8"/>
                <rect x="50" y="70" width="300" height="25" rx="12" fill="#8b5cf6" opacity="0.8"/>
                <rect x="80" y="105" width="240" height="15" rx="7" fill="#6366f1" opacity="0.6"/>
                <rect x="120" y="130" width="160" height="15" rx="7" fill="#8b5cf6" opacity="0.6"/>
                <rect x="150" y="160" width="100" height="25" rx="12" fill="#6366f1"/>
                <text x="200" y="195" text-anchor="middle" fill="#6366f1" font-size="12" font-weight="bold">Enhanced Design - Great UX</text>
            </svg>
        `;
    }
}

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
        
        // Enter key on buttons
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typewriter effect with safety check
    initializeTypewriter();
    
    // Initialize all components
    initializeMobileMenu();
    initializeNavigation();
    initializeContactForm();
    initializeSkillIcons();
    initializeIntersectionObserver();
    initializeLazyLoading();
    initializeKeyboardNavigation();
    
    // Create case study images
    createCaseStudyImages();
    
    // Initial scroll animation check
    handleScrollAnimations();
});

// Handle window events
window.addEventListener('load', function() {
    // Ensure all animations are triggered after full load
    handleScrollAnimations();
    
    // Double-check typewriter in case it didn't start
    if (!document.getElementById('typewriter').textContent) {
        initializeTypewriter();
    }
});

// Debounced scroll handler for older browsers
window.addEventListener('scroll', debounce(handleScrollAnimations, 10));

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
}, 250));

// Export functions for potential external use
window.portfolioFunctions = {
    scrollToSection,
    typeWriter,
    handleScrollAnimations
};