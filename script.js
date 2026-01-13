const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const isDark = document.body.hasAttribute('data-theme');
  
  if (isDark) {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
  
  // Save user preference so it stays dark even if they refresh!
  const theme = document.body.hasAttribute('data-theme') ? 'dark' : 'light';
  localStorage.setItem('user-theme', theme);
});

// Check for saved theme when the page loads
window.onload = () => {
  const savedTheme = localStorage.getItem('user-theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  }
};

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