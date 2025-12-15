document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Accordion functionality for Grid Tiles
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', (e) => {
            const isActive = accordion.classList.contains('active');
            
            // Close all others? (Optional, but keeps the grid cleaner)
            // Keeping "Stay Open" request from user, but in grid layout, 
            // single-active is usually better UX. 
            // Assuming simple toggle for now as per "Stay Open" request.

            if (isActive) {
                accordion.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                
                // Scroll into view after a slight delay for transition
                setTimeout(() => {
                    accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    });

    // Scroll to Top functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
