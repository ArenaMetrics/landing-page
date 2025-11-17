document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initHeroNavigation();
    initButtons();
    initFeatureCards();
    initAudienceCards();
    initInteractions();
});

// Navbar Search
function initNavbar() {
    const searchInput = document.querySelector('.navbar-search');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            console.log('Búsqueda activada');
            this.style.background = 'rgba(255, 255, 255, 0.12)';
        });
        searchInput.addEventListener('blur', function() {
            this.style.background = 'rgba(255, 255, 255, 0.08)';
        });
    }

    // Crear cuenta
    const userBtn = document.querySelector('.navbar-user');
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            alert('Redirigiendo a registro...');
            console.log('Click en crear cuenta');
        });
    }
}

// Hero Section Navigation
function initHeroNavigation() {
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            console.log('Slide anterior:', currentSlide);
            animateNavigation(this);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            console.log('Slide siguiente:', currentSlide);
            animateNavigation(this);
        });
    }
}

function animateNavigation(btn) {
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 150);
}

// Ver demo button
function initButtons() {
    const demoBtn = document.querySelector('.btn-watch');
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDemoModal();
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 300);
        });
    }
}

function showDemoModal() {
    alert('🎬 Demo iniciando...');
    console.log('Demo modal abierto');
}

// Social Icons
function initInteractions() {
    const socialIcons = document.querySelectorAll('.social-icons .icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const social = this.getAttribute('data-social');
            console.log('Social compartido:', social);

            // Animación
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);

            showNotification(`Compartiendo en ${social}...`);
        });

        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Feature Cards - Click interaction
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            removeActiveClass('.feature-card');
            this.classList.add('active');
            console.log('Feature seleccionada:', this.getAttribute('data-feature'));
        });

        // Hover effect con detalles
        card.addEventListener('mouseenter', function() {
            console.log('Hover feature:', index + 1);
        });
    });
}

// Audience Cards - Click interaction
function initAudienceCards() {
    const audienceCards = document.querySelectorAll('.audience-card');
    audienceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            removeActiveClass('.audience-card');
            this.classList.add('active');
            const type = this.getAttribute('data-type');
            console.log('Audiencia seleccionada:', type);
            showNotification(`Mostrando contenido para ${type}`);
        });
    });
}

// Utilities
function removeActiveClass(selector) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.remove('active');
    });
}

function showNotification(message) {
    console.log('Notificación:', message);
    // Aquí se podría implementar un toast/notification visual
}

// Scroll effects
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;

    // Parallax effect en hero
    const heroImage = document.querySelector('.character-placeholder');
    if (heroImage && scrollTop < 600) {
        heroImage.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
});

// Intersection Observer para animaciones en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar elementos al entrar en vista
document.querySelectorAll('.feature-card, .audience-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

console.log('🚀 Landing page iniciada');