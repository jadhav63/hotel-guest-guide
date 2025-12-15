document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Accordion functionality
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');
            
            // Close all others (Optional: comment this out if you want multiple open)
            /* 
            accordions.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            */

            // Toggle current
            if (isActive) {
                accordion.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
