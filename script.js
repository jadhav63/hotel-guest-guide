// Execute immediately when loaded
(function() {
    
    // --- 1. Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Date and Time ---
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        
        const dateEl = document.getElementById('currentDate');
        const timeEl = document.getElementById('currentTime');

        if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', dateOptions);
        if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }
    
    // Run immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // --- 3. Weather ---
    async function fetchWeather() {
        const weatherTemp = document.getElementById('weatherTemp');
        const weatherIcon = document.getElementById('weatherIcon');
        
        // Tombstone, AZ Coordinates
        const url = "https://api.open-meteo.com/v1/forecast?latitude=31.7215&longitude=-110.0684&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FPhoenix";

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('API Error');
            
            const data = await response.json();
            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weather_code;

            // Simple WMO Code Mapping
            let icon = '☀️'; 
            if (code > 2) icon = '⛅';
            if (code > 50) icon = '🌧️';
            if (code > 70) icon = '❄️';
            if (code > 95) icon = '⛈️';

            if (weatherTemp) weatherTemp.textContent = temp + "°F";
            if (weatherIcon) weatherIcon.textContent = icon;
            
        } catch (e) {
            console.error("Weather fetch failed:", e);
            if (weatherTemp) weatherTemp.textContent = "--";
        }
    }

    fetchWeather();
    // Update weather every 15 minutes
    setInterval(fetchWeather, 15 * 60 * 1000);

    // --- 4. Accordion Interaction ---
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(acc => {
        const btn = acc.querySelector('.accordion-header');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isActive = acc.classList.contains('active');
            
            // Close others (Accordion behavior)
            accordions.forEach(other => {
                if (other !== acc) {
                    other.classList.remove('active');
                    const otherBtn = other.querySelector('.accordion-header');
                    if(otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isActive) {
                acc.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                acc.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                // Small delay to allow transition to start before scrolling
                setTimeout(() => {
                    acc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });

})();
