// Select DOM elements
const button = document.getElementById('btn');
const backBtn = document.getElementById('backBtn');
const title = document.getElementById('title');

// Event listener to show animated glowing text
button.addEventListener('click', () => {
    const text = 'Hello, JavaScript!';
    title.innerHTML = ''; // Clear previous text content

    // Split text into individual characters and wrap each in a span tag
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        // Preserve spaces as non-breaking space entity
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.classList.add('glowing-letter');

        // Stagger the animation delay for a wave effect
        span.style.animationDelay = `${index * 0.1}s`;

        title.appendChild(span);
    });

    button.style.display = 'none'; // Hide the primary trigger button
    backBtn.style.display = 'inline-block'; // Show the return button
});

// Event listener to reset the view state
backBtn.addEventListener('click', () => {
    title.innerHTML = '';
    button.style.display = 'inline-block'; // Restore the primary trigger button
    backBtn.style.display = 'none'; // Hide the return button again
});
