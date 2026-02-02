// // js for greeting the user by name
// document.addEventListener('DOMContentLoaded', () => {
//     const savedData = localStorage.getItem('registeredUser');
//     const userData = savedData ? JSON.parse(savedData) : null;

//     // 1. Target the Greeting (First Name only)
//     const greetingElement = document.getElementById('user-greeting'); 
    
//     // 2. Target the Profile Name (Full Name)
//     const profileNameElement = document.querySelector('.profile-title h6');

//     if (userData && userData.name) {
//         const fullName = userData.name;
        
//         // Extract First Name: Split by space and take the first part
//         const firstName = fullName.split(' ')[0];

//         // Update Greeting: "Hi Ella,"
//         if (greetingElement) {
//             greetingElement.textContent = `Hi ${firstName},`;
//         }

//         // Update Profile: "Ella Johnson"
//         if (profileNameElement) {
//             profileNameElement.textContent = fullName;
//         }
//     }
// });


// // 1. Select ALL elements with the class 'theme-toggle'
// const themeToggles = document.querySelectorAll('.theme-toggle');

// // 2. Loop through each one and add the click event
// themeToggles.forEach(btn => {
//     btn.addEventListener('click', () => {
//         // Toggle the theme
//         const isDark = document.body.getAttribute('data-theme') === 'dark';
//         const newTheme = isDark ? 'light' : 'dark';
        
//         document.body.setAttribute('data-theme', newTheme);
        
//         // Save to local storage so it stays when you refresh
//         localStorage.setItem('themeChoice', newTheme);
        
//         // Optional: Update the circles for all toggles at once
//         updateToggleCircles(newTheme);
//     });
// });

// function updateToggleCircles(theme) {
//     // This ensures both circles move even if you only clicked one
//     const innerCircles = document.querySelectorAll('.inner-circle');
//     innerCircles.forEach(circle => {
//         if (theme === 'dark') {
//             circle.style.transform = 'translateX(18px)';
//         } else {
//             circle.style.transform = 'translateX(0px)';
//         }
//     });
// }


// // js for calendar dropdown
// const calendarTrigger = document.getElementById('calendar-trigger');
// const calendarMenu = document.getElementById('calendar-menu');
// const calendarText = calendarTrigger.querySelector('p');

// // Toggle the dropdown when clicking the calendar section
// calendarTrigger.addEventListener('click', (e) => {
//     e.stopPropagation(); // Prevents immediate closing
//     calendarMenu.classList.toggle('active');
// });



// // Update text when an option is selected
// calendarMenu.querySelectorAll('li').forEach(item => {
//     item.addEventListener('click', () => {
//         calendarText.innerText = item.innerText;
//         calendarMenu.classList.remove('active');
//     });
// });

// // Close menu if clicking outside
// window.addEventListener('click', () => {
//     calendarMenu.classList.remove('active');
// });



// // 1. Data (Keep this at the top)
// const monthlyAnalytics = {
//     "Jan": { earn: "₦12.5", redY: 100, greenY: 120, dotX: 14,  barH: 60  },
//     "Feb": { earn: "₦18.2", redY: 80,  greenY: 95,  dotX: 72,  barH: 85  },
//     "Mar": { earn: "₦15.0", redY: 90,  greenY: 110, dotX: 130, barH: 75  },
//     "Apr": { earn: "₦25.4", redY: 60,  greenY: 75,  dotX: 188, barH: 110 },
//     "May": { earn: "₦40.7", redY: 45,  greenY: 25,  dotX: 246, barH: 140 },
//     "Jun": { earn: "₦32.1", redY: 55,  greenY: 65,  dotX: 304, barH: 125 },
//     "Jul": { earn: "₦28.8", redY: 75,  greenY: 85,  dotX: 362, barH: 115 },
//     "Aug": { earn: "₦22.0", redY: 85,  greenY: 95,  dotX: 420, barH: 95  },
//     "Sep": { earn: "₦19.5", redY: 95,  greenY: 105, dotX: 478, barH: 88  }
// };

// // 2. The Director Function
// function updateChart(monthName) {
//     const data = monthlyAnalytics[monthName];
//     if (!data) return;

//     // 1. Detect Screen Size
//     const isMobile = window.innerWidth <= 480;
    
//     // 2. Set hard numbers for both views so they never disappear
//     // Desktop: 680px wide | Mobile: 100% of the screen (around 350px)
//     const scale = isMobile ? 0.5 : 1; 
//     const chartAreaWidth = isMobile ? (window.innerWidth - 40) : 680;

//     // 3. Update Curves (The 'd' attribute)
//     const redPath = document.getElementById('red-path');
//     const greenPath = document.getElementById('green-path');
    
//     if (redPath && greenPath) {
//         const redD = `M0,${130*scale} C${50*scale},${130*scale} ${150*scale},${data.redY*scale} ${data.dotX*scale},${data.redY*scale} S${chartAreaWidth * 0.8},${110*scale} ${chartAreaWidth},${110*scale}`;
//         const greenD = `M0,${110*scale} C${50*scale},${110*scale} ${150*scale},${data.greenY*scale} ${data.dotX*scale},${data.greenY*scale} S${chartAreaWidth * 0.8},${80*scale} ${chartAreaWidth},${80*scale}`;
//         redPath.setAttribute('d', redD);
//         greenPath.setAttribute('d', greenD);
//     }

//     // 4. Move Dot and Tooltip
//     const dot = document.getElementById('expense-dot');
//     if (dot) {
//         dot.style.display = "block"; 
//         dot.style.left = `${(data.dotX * scale) - (6 * scale)}px`; 
//         dot.style.top = `${(data.redY * scale) - (6 * scale)}px`;
//     }

//     const tooltip = document.getElementById('chart-tooltip');
//     if (tooltip) {
//         tooltip.style.left = `${(data.dotX * scale) - (26 * scale)}px`; 
//         tooltip.style.top = `${(data.redY * scale) - (50 * scale)}px`;
//         document.getElementById('earn-amount').innerText = data.earn;
//         tooltip.style.transform = isMobile ? 'scale(0.8)' : 'scale(1)';
//     }

//     // 5. Update Bars
//     document.querySelectorAll('.chart-bar').forEach(bar => {
//         bar.classList.remove('active-bar'); 
//         bar.style.height = `${64 * scale}px`; 
//     });

//     const activeBar = document.querySelector(`[data-month="${monthName}"] .chart-bar`);
//     if (activeBar) {
//         activeBar.classList.add('active-bar'); 
//         activeBar.style.height = `${data.barH * scale}px`;
//     }
// }

// // Attach listeners correctly
// const chartBars = document.querySelectorAll('.single-bar');
// chartBars.forEach(bar => {
//     bar.addEventListener('click', () => {
//         updateChart(bar.getAttribute('data-month'));
//     });
// });

// // Initial load
// updateChart("May");

// // js for profile dropdown
// document.addEventListener('DOMContentLoaded', () => {
//     // --- 1. LOGIN GUARD ---
//     const sessionData = localStorage.getItem('activeSession');
//     if (!sessionData) {
//         window.location.href = "login.html";
//         return;
//     }

//     // --- 2. GREETING & NAME SYNC ---
//     const userData = JSON.parse(sessionData);
//     const greetingElement = document.getElementById('user-greeting'); 
//     const allProfileNames = document.querySelectorAll('.profile-title h6');

//     if (userData && userData.name) {
//         const firstName = userData.name.split(' ')[0];
//         if (greetingElement) greetingElement.textContent = `Hi ${firstName},`;
//         allProfileNames.forEach(el => el.textContent = userData.name);
//     }

//     // --- 3. MULTI-VIEW DROPDOWN TOGGLE ---
//     const allProfileSections = document.querySelectorAll('.profile-section');
//     allProfileSections.forEach(section => {
//         section.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const dropdown = section.querySelector('.profile-dropdown');
//             if (dropdown) {
//                 section.classList.toggle('active');
//                 dropdown.classList.toggle('active');
//             }
//         });
//     });

//     // Close on outside click
//     window.addEventListener('click', () => {
//         allProfileSections.forEach(section => {
//             section.classList.remove('active');
//             const dropdown = section.querySelector('.profile-dropdown');
//             if (dropdown) dropdown.classList.remove('active');
//         });
//     });

//     // --- 4. LOGOUT (Clears Session, Keeps Account) ---
//     const allLogoutBtns = document.querySelectorAll('.logout-text');
//     allLogoutBtns.forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             localStorage.removeItem('activeSession'); // Only remove the session!
//             window.location.href = "login.html";
//         });
//     });
// });

// // Js for developer dropdown

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Grab ALL arrows and ALL dropdown menus (mobile + desktop)
//     const developer = document.querySelectorAll('.developer-section');
//     const allArrows = document.querySelectorAll('.dev-arrow-down');
//     const allMenus = document.querySelectorAll('.dev-dropdown');

//     // 2. Attach a listener to every single arrow found on the page
//     developer.forEach((arrow) => {
//         arrow.addEventListener('click', () => {
//             console.log("Universal Click Detected!");

//             // 3. Toggle 'active' on ALL menus so they stay in sync
//             allMenus.forEach(menu => menu.classList.toggle('active'));

//             // 4. Toggle 'rotate' on ALL arrows
//             allArrows.forEach(arr => arr.classList.toggle('rotate'));
//         });
//     });
// });


// // js for mobile navbar

// const menuBtn = document.querySelector('.menu-icon');
// const closeBtn = document.querySelector('.close-icon');
// const mobileNav = document.querySelector('.mobile-navbar');
// const menuContent = document.querySelector('.mobile-nav-content');

// menuBtn.addEventListener("click", () => {
//   mobileNav.classList.add('open');
//   menuContent.classList.add('open');
// });

// closeBtn.addEventListener("click", () => {
//   mobileNav.classList.remove('open');
//   menuContent.classList.remove('open');
// });



/**
 * --- 1. THE BOUNCER (IMMEDIATE SECURITY) ---
 * Checks if a session exists BEFORE the page even loads.
 */
const sessionData = localStorage.getItem('activeSession');
if (!sessionData) {
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 2. GREETING & NAME SYNC ---
    // We pull the data from the ACTIVE session
    const userData = JSON.parse(sessionData);
    // const greetingElement = document.getElementById('user-greeting'); 
    const allGreetings = document.querySelectorAll ('.user-greeting-target');
    const allProfileNames = document.querySelectorAll('.profile-title h6');

    if (userData && userData.name) {
        const fullName = userData.name;
        const firstName = fullName.split(' ')[0];

        // 2. Loop through all greeting elements (Mobile + Desktop)
        allGreetings.forEach(el => {
            el.textContent = `Hi ${firstName},`;
        });

        // Update all profile names
        allProfileNames.forEach(el => el.textContent = fullName);
    }

    // --- 3. THEME TOGGLE LOGIC ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const savedTheme = localStorage.getItem('themeChoice') || 'light';
    
    document.body.setAttribute('data-theme', savedTheme);
    updateToggleCircles(savedTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('themeChoice', newTheme);
            updateToggleCircles(newTheme);
        });
    });

    function updateToggleCircles(theme) {
        const innerCircles = document.querySelectorAll('.inner-circle');
        innerCircles.forEach(circle => {
            circle.style.transform = (theme === 'dark') ? 'translateX(18px)' : 'translateX(0px)';
        });
    }

    // --- 4. DROPDOWN LOGIC (Profile, Calendar, Developer) ---
    
    // Profile Dropdown & Logout
    const allProfileSections = document.querySelectorAll('.profile-section');
    allProfileSections.forEach(section => {
        section.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = section.querySelector('.profile-dropdown');
            if (dropdown) {
                section.classList.toggle('active');
                dropdown.classList.toggle('active');
            }
        });
    });

    const allLogoutBtns = document.querySelectorAll('.logout-text');
    allLogoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.removeItem('activeSession');
            window.location.href = "login.html";
        });
    });

    // Calendar Dropdown
    const calendarTrigger = document.getElementById('calendar-trigger');
    const calendarMenu = document.getElementById('calendar-menu');
    const calendarText = calendarTrigger?.querySelector('p');

    if (calendarTrigger) {
        calendarTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            calendarMenu.classList.toggle('active');
        });
    }

    calendarMenu?.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            if (calendarText) calendarText.innerText = item.innerText;
            calendarMenu.classList.remove('active');
        });
    });

    // Developer Dropdown
    const developerSections = document.querySelectorAll('.developer-section');
    const allArrows = document.querySelectorAll('.dev-arrow-down');
    const allMenus = document.querySelectorAll('.dev-dropdown');

    developerSections.forEach((section) => {
        section.addEventListener('click', () => {
            allMenus.forEach(menu => menu.classList.toggle('active'));
            allArrows.forEach(arr => arr.classList.toggle('rotate'));
        });
    });

    // --- 5. NAVIGATION & UTILS ---
    
    // Mobile Navbar
    const menuBtn = document.querySelector('.menu-icon');
    const closeBtn = document.querySelector('.close-icon');
    const mobileNav = document.querySelector('.mobile-navbar');
    const menuContent = document.querySelector('.mobile-nav-content');

    menuBtn?.addEventListener("click", () => {
        mobileNav.classList.add('open');
        menuContent.classList.add('open');
    });

    closeBtn?.addEventListener("click", () => {
        mobileNav.classList.remove('open');
        menuContent.classList.remove('open');
    });

    // Global click to close all menus
    window.addEventListener('click', () => {
        calendarMenu?.classList.remove('active');
        allProfileSections.forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.profile-dropdown').forEach(d => d.classList.remove('active'));
    });

    // Initial Chart Load
    updateChart("May");

    // Attach listeners correctly
    const chartBars = document.querySelectorAll('.single-bar');
    chartBars.forEach(bar => {
        bar.addEventListener('click', () => {
            updateChart(bar.getAttribute('data-month'));
        });
});
});

// Keep your Chart data and updateChart function exactly as they were at the bottom...

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