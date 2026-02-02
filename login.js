document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELECTIONS ---
    const authModal = document.querySelector('.auth-modal');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const loginBtnModal = document.querySelector('.login-btn-modal');
    const closeBtnModal = document.querySelector('.close-btn-modal');
    
    // Select the Alert elements once at the top
    const alertBox = document.querySelector('.alert-box');
    // We will look for a <p> or <span> inside the alert box
    const alertText = alertBox ? alertBox.querySelector('p, span') : null;
    
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    // --- 2. REUSABLE ALERT FUNCTION ---
    function showAlert(message, isError = false) {
        const alertBox = document.querySelector('.alert-box');
        const alertText = alertBox.querySelector('p, span');
        const alertIcon = alertBox.querySelector('i'); // Targets your <i> tag

        if (!alertBox || !alertText) return;

        alertText.textContent = message;

        if (isError) {
            alertBox.classList.add('error');
            // Swap to error icon
            if (alertIcon) {
                alertIcon.classList.remove('fa-circle-check');
                alertIcon.classList.add('fa-circle-exclamation');
            }
        } else {
            alertBox.classList.remove('error');
            // Swap to success icon
            if (alertIcon) {
                alertIcon.classList.remove('fa-circle-exclamation');
                alertIcon.classList.add('fa-circle-check');
            }
        }

        alertBox.classList.add('show');

        setTimeout(() => {
            alertBox.classList.remove('show');
        }, 4000);
    }

    // --- 3. MODAL & SLIDE LOGIC ---
    if (loginBtnModal) {
        loginBtnModal.addEventListener('click', () => authModal.classList.add('show'));
    }

    if (closeBtnModal) {
        closeBtnModal.addEventListener('click', () => {
            authModal.classList.remove('show', 'slide');
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('slide');
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.remove('slide');
        });
    }

    // --- 4. SIGN UP LOGIC ---
    function handleSignUpSuccess(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value; 

        if (password.length < 8) {
            showAlert("Password must be at least 8 characters long!", true);
            return; 
        }

        const existingAccount = localStorage.getItem('userAccount');
        if (existingAccount && JSON.parse(existingAccount).email === email) {
            showAlert("Error: Email already registered!", true);
            return;
        }

        const userCredentials = { name, email, password };
        localStorage.setItem('userAccount', JSON.stringify(userCredentials));
        
        showAlert("Account Created! Please Login.");

        setTimeout(() => {
            authModal.classList.remove('slide'); 
            event.target.reset();
            if (loginForm) loginForm.reset();
        }, 3000);
    }

    // 4. Pre-fill the Login form with the new email

    // if (loginForm) {

    //     // Automatically put the new email into the login field for them!

    //     loginForm.querySelector('input[type="email"]').value = email;

    // }

    // --- 5. LOGIN LOGIC ---
    function handleLoginSuccess(event) {
        event.preventDefault();
        const inputEmail = event.target.email.value;
        const inputPassword = event.target.password.value;

        const savedAccount = localStorage.getItem('userAccount');
        const accountData = savedAccount ? JSON.parse(savedAccount) : null;

        if (accountData) {
            if (inputEmail === accountData.email && inputPassword === accountData.password) {
                localStorage.setItem('activeSession', JSON.stringify(accountData));
                showAlert("Login Successful!");
                setTimeout(() => { window.location.href = "index.html"; }, 2000);
            } else {
                showAlert("Invalid Email or Password!", true);
            }
        } else {
            showAlert("Account not found. Please Sign Up.", true);
        }
    }

    // --- 6. PASSWORD TOGGLE LOGIC ---
    const toggleIcons = document.querySelectorAll('.input-box i.fa-solid');
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.parentElement.querySelector('input');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            }
        });
    });

    // --- 7. EVENT LISTENERS ---
    if (registerForm) registerForm.addEventListener('submit', handleSignUpSuccess);
    if (loginForm) loginForm.addEventListener('submit', handleLoginSuccess);
});