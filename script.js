

// 1. Select ALL elements with the class 'theme-toggle'
const themeToggles = document.querySelectorAll('.theme-toggle');

// 2. Loop through each one and add the click event
themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle the theme
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        
        // Save to local storage so it stays when you refresh
        localStorage.setItem('themeChoice', newTheme);
        
        // Optional: Update the circles for all toggles at once
        updateToggleCircles(newTheme);
    });
});

function updateToggleCircles(theme) {
    // This ensures both circles move even if you only clicked one
    const innerCircles = document.querySelectorAll('.inner-circle');
    innerCircles.forEach(circle => {
        if (theme === 'dark') {
            circle.style.transform = 'translateX(18px)';
        } else {
            circle.style.transform = 'translateX(0px)';
        }
    });
}


// js for calendar dropdown
const calendarTrigger = document.getElementById('calendar-trigger');
const calendarMenu = document.getElementById('calendar-menu');
const calendarText = calendarTrigger.querySelector('p');

// Toggle the dropdown when clicking the calendar section
calendarTrigger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents immediate closing
    calendarMenu.classList.toggle('active');
});

// Update text when an option is selected
calendarMenu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        calendarText.innerText = item.innerText;
        calendarMenu.classList.remove('active');
    });
});

// Close menu if clicking outside
window.addEventListener('click', () => {
    calendarMenu.classList.remove('active');
});



// 1. Data (Keep this at the top)
const monthlyAnalytics = {
    "Jan": { earn: "₦12.5", redY: 100, greenY: 120, dotX: 14,  barH: 60  },
    "Feb": { earn: "₦18.2", redY: 80,  greenY: 95,  dotX: 72,  barH: 85  },
    "Mar": { earn: "₦15.0", redY: 90,  greenY: 110, dotX: 130, barH: 75  },
    "Apr": { earn: "₦25.4", redY: 60,  greenY: 75,  dotX: 188, barH: 110 },
    "May": { earn: "₦40.7", redY: 45,  greenY: 25,  dotX: 246, barH: 140 },
    "Jun": { earn: "₦32.1", redY: 55,  greenY: 65,  dotX: 304, barH: 125 },
    "Jul": { earn: "₦28.8", redY: 75,  greenY: 85,  dotX: 362, barH: 115 },
    "Aug": { earn: "₦22.0", redY: 85,  greenY: 95,  dotX: 420, barH: 95  },
    "Sep": { earn: "₦19.5", redY: 95,  greenY: 105, dotX: 478, barH: 88  }
};

// 2. The Director Function
function updateChart(monthName) {
    const data = monthlyAnalytics[monthName];
    if (!data) return;

    // 1. Detect Screen Size
    const isMobile = window.innerWidth <= 480;
    
    // 2. Set hard numbers for both views so they never disappear
    // Desktop: 680px wide | Mobile: 100% of the screen (around 350px)
    const scale = isMobile ? 0.5 : 1; 
    const chartAreaWidth = isMobile ? (window.innerWidth - 40) : 680;

    // 3. Update Curves (The 'd' attribute)
    const redPath = document.getElementById('red-path');
    const greenPath = document.getElementById('green-path');
    
    if (redPath && greenPath) {
        const redD = `M0,${130*scale} C${50*scale},${130*scale} ${150*scale},${data.redY*scale} ${data.dotX*scale},${data.redY*scale} S${chartAreaWidth * 0.8},${110*scale} ${chartAreaWidth},${110*scale}`;
        const greenD = `M0,${110*scale} C${50*scale},${110*scale} ${150*scale},${data.greenY*scale} ${data.dotX*scale},${data.greenY*scale} S${chartAreaWidth * 0.8},${80*scale} ${chartAreaWidth},${80*scale}`;
        redPath.setAttribute('d', redD);
        greenPath.setAttribute('d', greenD);
    }

    // 4. Move Dot and Tooltip
    const dot = document.getElementById('expense-dot');
    if (dot) {
        dot.style.display = "block"; 
        dot.style.left = `${(data.dotX * scale) - (6 * scale)}px`; 
        dot.style.top = `${(data.redY * scale) - (6 * scale)}px`;
    }

    const tooltip = document.getElementById('chart-tooltip');
    if (tooltip) {
        tooltip.style.left = `${(data.dotX * scale) - (26 * scale)}px`; 
        tooltip.style.top = `${(data.redY * scale) - (50 * scale)}px`;
        document.getElementById('earn-amount').innerText = data.earn;
        tooltip.style.transform = isMobile ? 'scale(0.8)' : 'scale(1)';
    }

    // 5. Update Bars
    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.classList.remove('active-bar'); 
        bar.style.height = `${64 * scale}px`; 
    });

    const activeBar = document.querySelector(`[data-month="${monthName}"] .chart-bar`);
    if (activeBar) {
        activeBar.classList.add('active-bar'); 
        activeBar.style.height = `${data.barH * scale}px`;
    }
}

// Attach listeners correctly
const chartBars = document.querySelectorAll('.single-bar');
chartBars.forEach(bar => {
    bar.addEventListener('click', () => {
        updateChart(bar.getAttribute('data-month'));
    });
});

// Initial load
updateChart("May");




// js for mobile navbar

const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-icon');
const mobileNav = document.querySelector('.mobile-navbar');
const menuContent = document.querySelector('.mobile-nav-content');

menuBtn.addEventListener("click", () => {
  mobileNav.classList.add('open');
  menuContent.classList.add('open');
});

closeBtn.addEventListener("click", () => {
  mobileNav.classList.remove('open');
  menuContent.classList.remove('open');
});