document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0; // لتخزين موقع التمرير السابق

    function handleScrollDirection() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // التمرير إلى الأسفل
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        } else {
            // التمرير إلى الأعلى
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // تحديد الموقع الحالي
    }

    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = scrolled / documentHeight;
            
            progressBar.style.transform = `scaleX(${progress})`;
            handleScrollDirection(); // استدعاء دالة تحديد الاتجاه
        });
    }

    function createScrollObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                } else {
                    entry.target.classList.remove('scroll-visible');
                }
            });
        }, options);
    
        // Observe all elements with data-scroll attribute
        document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        createScrollObserver();
    });
    

    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
                
            });
            handleScrollDirection();
        });
    }

    function initFloatScroll() {
        const floatElements = document.querySelectorAll('.float-scroll');

        window.addEventListener('scroll', () => {
            floatElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const centerPosition = window.innerHeight / 2;
                const elementCenter = rect.top + rect.height / 2;
                const distance = elementCenter - centerPosition;
                const float = Math.sin(distance * 0.003) * 15;

                element.style.transform = `translateY(${float}px)`;
            });
            handleScrollDirection();
        });
    }

    function initRotateScroll() {
        const rotateElements = document.querySelectorAll('.rotate-scroll');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            rotateElements.forEach(element => {
                const speed = element.dataset.rotate || 0.1;
                const rotation = scrolled * speed;
                element.style.transform = `rotate(${rotation}deg)`;
            });
            handleScrollDirection();
        });
    }

    function initPerspective() {
        const containers = document.querySelectorAll('.perspective-container');

        containers.forEach(container => {
            container.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = container.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;

                const items = container.querySelectorAll('.perspective-item');
                items.forEach(item => {
                    const rotateX = (y - 0.5) * 20;
                    const rotateY = (x - 0.5) * 20;
                    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
            });

            container.addEventListener('mouseleave', () => {
                const items = container.querySelectorAll('.perspective-item');
                items.forEach(item => {
                    item.style.transform = 'rotateX(0) rotateY(0)';
                });
            });
        });
    }

    // Initialize all animations
    createScrollProgress();
    createScrollObserver();
    initParallax();
    initFloatScroll();
    initRotateScroll();
    initPerspective();
});
