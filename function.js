function updateChart(monthName) {
    const data = monthlyAnalytics[monthName];
    if (!data) return;

    // 1. Red Path (Expenses) - The 'S' command helps it twist smoothly
    const redD = `M0,130 C100,130 150,${data.redY} ${data.dotX},${data.redY} S380,110 680,110`;
    
    // 2. Green Path (Income) - Offsetting slightly to create the crossover
    const greenD = `M0,110 C100,110 150,${data.greenY} ${data.dotX},${data.greenY} S380,80 680,80`;
    
    document.getElementById('red-path').setAttribute('d', redD);
    document.getElementById('green-path').setAttribute('d', greenD);

    // 3. The Dot (Moves to the Red Peak)
    const dot = document.getElementById('expense-dot');
    dot.style.left = `${data.dotX - 6}px`; 
    dot.style.top = `${data.redY - 6}px`;

    // 4. The Earn Box (Tooltip)
    const tooltip = document.getElementById('chart-tooltip');
    tooltip.style.left = `${data.dotX - 26}px`; 
    tooltip.style.top = `${data.redY - 50}px`;
    document.getElementById('earn-amount').innerText = data.earn;

    // 5. Update Grey Bars
    document.querySelectorAll('.single-bar .chart-bar').forEach(bar => {
        bar.classList.remove('active-bar'); 
        bar.style.height = "64px"; // Return to small height
        bar.style.opacity = "0.7";
    });

    const activeBar = document.querySelector(`[data-month="${monthName}"] .chart-bar`);
    if(activeBar) {
        // Add highlight only to the clicked month
        activeBar.classList.add('active-bar'); 
        activeBar.style.height = `${data.barH}px`; // Grow to data height
        activeBar.style.opacity = "0.8";
    }

    
}

// Attach clicks to all month containers
bars.forEach(bar => {
    bar.addEventListener('click', () => {
        const month = bar.getAttribute('data-month');
        updateChart(month);
    });
});

// Initialize with May showing
updateChart("May");
