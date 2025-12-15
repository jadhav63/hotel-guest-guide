document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Date and Time Logic ---
    function updateDateTime() {
        const now = new Date();
        
        // Date Format: Monday, Oct 24
        const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        
        // Time Format: 10:42 AM
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = now.toLocaleTimeString('en-US', timeOptions);

        const dateEl = document.getElementById('currentDate');
        const timeEl = document.getElementById('currentTime');

        if (dateEl) dateEl.textContent = dateString;
        if (timeEl) timeEl.textContent = timeString;
    }

    // Update time every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

    // --- Weather Logic (Open-Meteo API) ---
    // Tombstone Coords: 31.7215° N, 110.0684° W
    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=31.7215&longitude=-110.0684&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FPhoenix";

    async function fetchWeather() {
        const weatherTemp = document.getElementById('weatherTemp');
        const weatherIcon = document.getElementById('weatherIcon');

        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error('Weather data fetch failed');
            
            const data = await response.json();
            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weather_code;

            // Map WMO codes to simple emojis
            let icon = '☀️'; // Default sunny
            if (code >= 1 && code <= 3) icon = '⛅'; // Partly cloudy
            if (code >= 45 && code <= 48) icon = '🌫️'; // Fog
            if (code >= 51 && code <= 67) icon = '🌧️'; // Rain
            if (code >= 71 && code <= 77) icon = '❄️'; // Snow
            if (code >= 80 && code <= 82) icon = '🌦️'; // Showers
            if (code >= 95) icon = '⛈️'; // Thunderstorm

            if (weatherTemp) weatherTemp.textContent = `${temp}°F`;
            if (weatherIcon) weatherIcon.textContent = icon;

        } catch (error) {
            console.log('Weather unavailable (likely offline):', error);
            if (weatherTemp) weatherTemp.textContent = '--';
        }
    }

    // Fetch weather immediately, then every 30 mins
    fetchWeather();
    setInterval(fetchWeather, 30 * 60 * 1000);


    // Accordion functionality for Grid Tiles
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', (e) => {
            const isActive = accordion.classList.contains('active');
            
            // Close all others? (Optional - user requested "buttons to scroll down", likely implies a fresh navigation feel)
            // For older users, keeping one open at a time is often less confusing.
            accordions.forEach(acc => {
                if (acc !== accordion) {
                    acc.classList.remove('active');
                    const h = acc.querySelector('.accordion-header');
                    if (h) h.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle Current
            if (isActive) {
                accordion.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
            } else {
                accordion.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                
                // Scroll into view logic
                // Small timeout allows the CSS transition (expansion) to start so the browser can calculate the new position better
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
