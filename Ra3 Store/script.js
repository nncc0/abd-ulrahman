document.addEventListener('DOMContentLoaded', () => {
    initializeDarkModeToggle();
    initializeMobileMenuToggle();
    initializeProjectSlider();
    initializeScrollAnimation();
    initializeFormSubmission();
    createParticles();
    initializeIntersectionObserver();
    initializeSkillCardsAnimation();
    initializeSmoothScroll();
    animateSkillBarsOnLoad();
});

/* Toggle Dark Mode */
function initializeDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

/* Toggle Mobile Menu */
function initializeMobileMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    menuToggle.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    const icon = menuToggle.querySelector('i');
    mobileMenu.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
}
document.addEventListener('DOMContentLoaded', function() {
    const revealElement = document.querySelector('.reveal-effect');

    // إضافة الفئة revealed عند تحميل الصفحة
    setTimeout(() => {
        revealElement.classList.add('revealed');
    }, 1000); // يمكنك تغيير الوقت حسب الحاجة
});

/* Project Slider */
function initializeProjectSlider() {
    const projects = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentProject = 0;

    function showProject(index) {
        projects.forEach(project => project.classList.remove('active'));
        projects[index].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentProject = (currentProject - 1 + projects.length) % projects.length;
        showProject(currentProject);
    });

    nextButton.addEventListener('click', () => {
        currentProject = (currentProject + 1) % projects.length;
        showProject(currentProject);
    });

    showProject(currentProject);
}

/* Scroll Animation */
function initializeScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveLink() {
        const currentScroll = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

/* Form Submission */
function initializeFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم إرسال الرسالة بنجاح!');
        contactForm.reset();
    });
}

/* Particle Effect */
function createParticles() {
    const existingParticles = document.querySelector('.particles');
    if (existingParticles) existingParticles.remove(); // Remove existing particles

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = Math.random() * 2 + 4 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

/* Intersection Observer for Sections */
function initializeIntersectionObserver() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

/* Skill Cards Animation */
function initializeSkillCardsAnimation() {
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progress = item.getAttribute('data-progress');
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.setProperty('--progress', `${progress}%`);
        });
    });
}

/* Smooth Scroll */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* Dynamic Skill Bar Animation */
function animateSkillBarsOnLoad() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const progress = bar.parentElement.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

window.addEventListener('load', animateSkillBarsOnLoad);



document.querySelectorAll('.tech-item').forEach(item => {
    const progressValue = parseInt(item.getAttribute('data-progress')); // تحويل القيمة إلى عدد صحيح
    const progressNumber = item.querySelector('.progress-number');
    
    let currentValue = 0;
    const increment = Math.ceil(progressValue / 100); // تعديل القيمة حسب النسبة

    const interval = setInterval(() => {
        if (currentValue < progressValue) {
            currentValue += increment;
            if (currentValue > progressValue) currentValue = progressValue; // تأكد من عدم تجاوز القيمة المحددة
            progressNumber.textContent = currentValue + '%';
            progressNumber.style.opacity = 0; // اجعل النص شفافًا
            setTimeout(() => {
                progressNumber.style.opacity = 1; // اجعل النص مرئيًا بعد فترة
            }, 50); // تأخير بسيط لجعل التأثير مرئيًا
        } else {
            clearInterval(interval); // توقف عن زيادة القيمة بعد الوصول
        }
    }, 20); // كل 20 مللي ثانية
});
