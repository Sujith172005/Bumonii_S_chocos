// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// ============================================
// Navbar Shadow on Scroll
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ============================================
// Form Validation and Submission
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
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
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});

// ============================================
// Add smooth scroll behavior for better UX (fallback)
// ============================================
// Ensure smooth scrolling is supported
if (!('scrollBehavior' in document.documentElement.style)) {
    // Fallback for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Chocolate Card -> Modal + WhatsApp Integration
// ============================================
const chocolateCards = document.querySelectorAll('.chocolate-card');
const chocolateModal = document.getElementById('chocolateModal');
const chocoModalClose = document.getElementById('chocoModalClose');
const chocoModalImage = document.getElementById('chocoModalImage');
const chocoModalTitle = document.getElementById('chocoModalTitle');
const chocoModalDescription = document.getElementById('chocoModalDescription');
const chocoModalProductName = document.getElementById('chocoModalProductName');
const chocoModalWhatsappBtn = document.getElementById('chocoModalWhatsappBtn');

// Change this to your actual WhatsApp number (with country code, no +)
const WHATSAPP_NUMBER = '91XXXXXXXXXX';

function openChocolateModal(card) {
    const img = card.querySelector('.card-image img');
    const titleEl = card.querySelector('.card-content h3');
    const descEl = card.querySelector('.card-content p');

    if (!img || !titleEl || !descEl) return;

    const title = titleEl.textContent.trim();
    const description = descEl.textContent.trim();

    // Fill modal content
    chocoModalImage.src = img.src;
    chocoModalImage.alt = img.alt || title;
    chocoModalTitle.textContent = title;
    chocoModalDescription.textContent = description;
    chocoModalProductName.textContent = title;

    // Build WhatsApp URL with pre-filled message
    const baseWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
    const message = `Hi Bumonii'S Chocolates, I would like to know more about your "${title}".`;
    chocoModalWhatsappBtn.href = `${baseWhatsappUrl}?text=${encodeURIComponent(message)}`;

    // Show modal
    chocolateModal.classList.add('open');
    chocolateModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeChocolateModal() {
    chocolateModal.classList.remove('open');
    chocolateModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Attach click listeners to each chocolate card
chocolateCards.forEach(card => {
    card.addEventListener('click', () => openChocolateModal(card));
});

// Close button
chocoModalClose.addEventListener('click', () => {
    closeChocolateModal();
});

// Close when clicking outside content
chocolateModal.addEventListener('click', (e) => {
    if (e.target === chocolateModal) {
        closeChocolateModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chocolateModal.classList.contains('open')) {
        closeChocolateModal();
    }
});