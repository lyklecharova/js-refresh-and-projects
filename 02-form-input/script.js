// Select DOM elements
const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const errorMsg = document.getElementById('errorMsg');
const submitBtn = document.getElementById('submitBtn');
const greetingDisplay = document.getElementById('greetingDisplay');

// Validation rule configuration
const MIN_LENGTH = 3;

/**
 * Validates the username input field
 * @returns {boolean} True if input is valid, false otherwise
 */
function validateUsername() {
    const value = usernameInput.value.trim();

    if (value === '') {
        // Clear styles and error message when input is empty
        usernameInput.classList.remove('valid', 'invalid');
        errorMsg.textContent = '';
        return false;
    }

    if (value.length < MIN_LENGTH) {
        // Apply invalid state and error message
        usernameInput.classList.remove('valid');
        usernameInput.classList.add('invalid');
        errorMsg.textContent = `Username must be at least ${MIN_LENGTH} characters long.`;
        return false;
    }

    // Apply valid state
    usernameInput.classList.remove('invalid');
    usernameInput.classList.add('valid');
    errorMsg.textContent = '';
    return true;
}

// Live validation on every keystroke
usernameInput.addEventListener('input', validateUsername);

// Handle form submission
userForm.addEventListener('submit', (event) => {
    // Prevent the default browser form submission (page reload)
    event.preventDefault();

    const isValid = validateUsername();

    if (isValid) {
        const username = usernameInput.value.trim();

        // Display animated greeting message
        greetingDisplay.textContent = `Welcome, ${username}! ✨`;
        greetingDisplay.style.color = '#10b981'; // Neon green success color

        // Reset form inputs and styles after submission
        userForm.reset();
        usernameInput.classList.remove('valid', 'invalid');
    } else {
        // Highlight input if user submits without valid data
        usernameInput.classList.add('invalid');
        errorMsg.textContent = `Please enter at least ${MIN_LENGTH} characters before submitting.`;
    }
});
