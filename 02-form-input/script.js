// Select DOM elements
const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const strengthBar = document.getElementById('strengthBar');

// Password elements
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');

// Confirm Password elements
const confirmPasswordInput = document.getElementById('confirmPassword');
const toggleConfirmPasswordBtn = document.getElementById(
    'toggleConfirmPassword',
);
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Cards & Navigation
const formCard = document.getElementById('formCard');
const dashboardCard = document.getElementById('dashboardCard');
const welcomeHeader = document.getElementById('welcomeHeader');
const logoutBtn = document.getElementById('logoutBtn');

// Error displays
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Form controls & Actions
const submitBtn = document.getElementById('submitBtn');
const termsCheckbox = document.getElementById('termsCheckbox');
const greetingDisplay = document.getElementById('greetingDisplay');
const themeToggle = document.getElementById('themeToggle');

// Validation rule configuration
const MIN_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Initialize To-Do elements
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

/**
 * Validates the Username field
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
// Toggle main password visibility
const mainToggleBtn = document.getElementById('togglePassword');
const mainPasswordInput = document.getElementById('password');

if (mainToggleBtn && mainPasswordInput) {
    mainToggleBtn.addEventListener('click', () => {
        const isPassword = mainPasswordInput.type === 'password';
        mainPasswordInput.type = isPassword ? 'text' : 'password';
        mainToggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
}

// Toggle confirm password visibility

if (toggleConfirmPasswordBtn && confirmPasswordInput) {
    toggleConfirmPasswordBtn.addEventListener('click', () => {
        const isPassword = confirmPasswordInput.type === 'password';
        confirmPasswordInput.type = isPassword ? 'text' : 'password';
        toggleConfirmPasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
}
// Live validation on every keystroke
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Handle form submission
userForm.addEventListener('submit', (event) => {
    // Prevent the default browser form submission
    event.preventDefault();

    // Validate all fields
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid =
        typeof validateConfirmPassword === 'function'
            ? validateConfirmPassword()
            : true;
    const isTermsChecked = termsCheckbox ? termsCheckbox.checked : true;

    if (
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmValid &&
        isTermsChecked
    ) {
        // 1. Get the username before resetting the form
        const username = usernameInput ? usernameInput.value.trim() : '';

        // 2. Update the welcome header text in the Dashboard
        if (welcomeHeader) {
            welcomeHeader.textContent = `Welcome, ${username}!`;
        }

        // 3. Hide the registration form and display the Dashboard card
        if (formCard) formCard.classList.add('hidden');
        if (dashboardCard) dashboardCard.classList.remove('hidden');

        // 4. Reset form inputs and remove validation classes safely
        userForm.reset();
        if (usernameInput) usernameInput.classList.remove('valid');
        if (emailInput) emailInput.classList.remove('valid');
        if (passwordInput) passwordInput.classList.remove('valid');
        if (confirmPasswordInput)
            confirmPasswordInput.classList.remove('valid');
        if (greetingDisplay) greetingDisplay.textContent = '';
    } else {
        // Display error message if validation fails
        if (greetingDisplay) {
            greetingDisplay.textContent = 'Please fix the errors above.';
            greetingDisplay.style.color = '#f43f5e';
        }
    }
});

// Handle logout action
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // 1. Hide dashboard and show form card
        if (dashboardCard) dashboardCard.classList.add('hidden');
        if (formCard) formCard.classList.remove('hidden');

        // 2. Reset standard form fields
        userForm.reset();

        // 3. Clear global error message and valid/invalid CSS classes
        if (greetingDisplay) {
            greetingDisplay.textContent = '';
            greetingDisplay.style.color = '';
        }

        [
            usernameInput,
            emailInput,
            passwordInput,
            confirmPasswordInput,
        ].forEach((input) => {
            if (input) {
                input.classList.remove('valid', 'invalid');
            }
        });

        // 4. Reset password inputs back to type="password" and button text to "Show"
        if (passwordInput) passwordInput.type = 'password';
        if (confirmPasswordInput) confirmPasswordInput.type = 'password';
        if (togglePasswordBtn) togglePasswordBtn.textContent = 'Show';
        if (toggleConfirmPasswordBtn)
            toggleConfirmPasswordBtn.textContent = 'Show';
    });
}

// Theme toggle functionality with persistent state
if (themeToggle) {
    // Check for previously saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Dark Mode';
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.textContent = '☀️ Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        if (isLight) {
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Enable or disable the submit button based on the checkbox state
termsCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !termsCheckbox.checked;
});

// Password strength indicator
passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    // Reset all strength classes
    strengthBar.className = 'strength-bar';
    // Add appropriate class based on password length
    if (value.length === 0) {
        // Leave empty if there is no input
        return;
    } else if (value.length < 6) {
        strengthBar.classList.add('strength-weak');
    } else if (value.length < 10) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
});

// Function to validate Confirm Password matching
function validateConfirmPassword() {
    if (!confirmPasswordInput || !passwordInput) return false;

    const passwordVal = passwordInput.value;
    const confirmVal = confirmPasswordInput.value;

    // Check if confirm password is not empty and matches the main password
    if (confirmVal !== '' && confirmVal === passwordVal) {
        confirmPasswordInput.classList.add('valid');
        confirmPasswordInput.classList.remove('invalid');
        if (confirmPasswordError) confirmPasswordError.textContent = '';
        return true;
    } else {
        confirmPasswordInput.classList.remove('valid');
        if (confirmVal !== '') {
            confirmPasswordInput.classList.add('invalid');
            if (confirmPasswordError)
                confirmPasswordError.textContent = 'Passwords do not match.';
        } else {
            confirmPasswordInput.classList.remove('invalid');
            if (confirmPasswordError) confirmPasswordError.textContent = '';
        }
        return false;
    }
}

// Event listeners for realtime confirm password validation
if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
}

// Re-validate confirm password if main password changes
if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        if (confirmPasswordInput && confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });
}

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

// Load saved tasks from localStorage on page initialization
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Helper function to update empty state visibility
function updateEmptyState() {
    let emptyMsg = document.getElementById('emptyMsg');
    const tasks = todoList.querySelectorAll('li');

    if (tasks.length === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement('p');
            emptyMsg.className = 'empty-msg';
            emptyMsg.id = 'emptyMsg';
            emptyMsg.textContent = 'No tasks added yet. Start by creating one!';
            todoList.appendChild(emptyMsg);
        }
        emptyMsg.style.display = 'block';
    } else if (emptyMsg) {
        emptyMsg.style.display = 'none';
    }
}

// Function to render a task item in the DOM
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
        updateEmptyState();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// Add task event listener
if (addTodoBtn && todoInput) {
    addTodoBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text !== '') {
            createTaskElement(text);
            todoInput.value = '';
            saveTasks();
            updateEmptyState();
        }
    });
}

// Save current task list array to localStorage
function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll('li').forEach((li) => {
        // Extract task text excluding the Delete button label
        const taskText = li.childNodes[0].textContent;
        tasks.push(taskText);
    });
    localStorage.setItem('userTasks', JSON.stringify(tasks));
}

// Retrieve and display saved tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('userTasks');
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach((task) => createTaskElement(task));
    }
    updateEmptyState();
}
