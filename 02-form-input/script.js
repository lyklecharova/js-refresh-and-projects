// Select DOM elements
const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const togglePasswordBtn = document.getElementById('togglePassword');

const submitBtn = document.getElementById('submitBtn');
const greetingDisplay = document.getElementById('greetingDisplay');

// Validation rule configuration
const MIN_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the username input field
 * @returns {boolean} True if input is valid, false otherwise
 */
/**
 * Validates the Email field using Regex
 */
function validateEmail() {
    const value = emailInput.value.trim();

    if (value === '') {
        emailInput.classList.remove('valid', 'invalid');
        emailError.textContent = '';
        return false;
    }

    if (!EMAIL_REGEX.test(value)) {
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
        emailError.textContent = 'Please enter a valid email address.';
        return false;
    }

    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    emailError.textContent = '';
    return true;
}

/**
 * Validates the Password field
 */

function validateUsername() {
    const value = usernameInput.value.trim();

    if (value === '') {
        usernameInput.classList.remove('valid', 'invalid');
        usernameError.textContent = '';
        return false;
    }

    if (value.length < MIN_LENGTH) {
        usernameInput.classList.remove('valid');
        usernameInput.classList.add('invalid');
        usernameError.textContent = `Username must be at least ${MIN_LENGTH} characters long.`;
        return false;
    }

    usernameInput.classList.remove('invalid');
    usernameInput.classList.add('valid');
    usernameError.textContent = '';
    return true;
}
/**
 * Validates the Password field
 */
function validatePassword() {
    const value = passwordInput.value;

    if (value === '') {
        passwordInput.classList.remove('valid', 'invalid');
        passwordError.textContent = '';
        return false;
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
        passwordError.textContent = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
        return false;
    }

    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    passwordError.textContent = '';
    return true;
}
// Toggle password visibility (Show / Hide)
togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
});
// Live validation on every keystroke
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Handle form submission
userForm.addEventListener('submit', (event) => {
    // Prevent the default browser form submission (page reload)
    event.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isUsernameValid && isEmailValid && isPasswordValid) {
        const username = usernameInput.value.trim();

        // Display animated greeting message
        greetingDisplay.textContent = `Registration Successful! Welcome, ${username}! ✨`;
        greetingDisplay.style.color = '#10b981'; // Neon green success color

        // Reset form inputs and styles after submission
        userForm.reset();
        usernameInput.classList.remove('valid');
        emailInput.classList.remove('valid');
        passwordInput.classList.remove('valid');
    } else {
        greetingDisplay.textContent = 'Please fix the errors above.';
        greetingDisplay.style.color = '#f43f5e';
    }
});
