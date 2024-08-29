// 30 days in the future from the moment the visitor views the page:
// converting 30 days:
let distance = 30 * (1000 * 60 * 60 * 24);

// Get the current date and time
const now = new Date().getTime();
// Calculate the date in the future in 30 days (in ISO)
const launchDate = new Date(now + distance);
// Convert ISO to "readable" date format
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
document.getElementById('launch-date').innerText = launchDate.toLocaleDateString('de-DE', options);

// Update the countdown every 1 second (1 sec = 1000)
let x = setInterval(function() {
    distance = distance - 1000;

// Time calculations for days, hours, minutes and seconds
let days = Math.floor(distance / (1000 * 60 * 60 * 24));
let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((distance % (1000 * 60)) / 1000);

// Output the result in an element with id="demo"
document.getElementById("days").innerText = days;
document.getElementById("hours").innerText = hours;
document.getElementById("minutes").innerText = minutes;
document.getElementById("seconds").innerText = seconds;

// If the countdown is over, write some text
if (distance < 0) {
    clearInterval(x);
 } 1000);

 // Custom select element
 const elements = {
    button: document.querySelector('[role="combobox"]'),
    buttonLabel: document.querySelector('label[for="select"]'),
    dropDown: document.querySelector('[role="listbox"]'),
    options: document.querySelectorAll('[role="option"]'),
    announcement: document.querySelector('.announcement'),
 };

 let isDropdownBox = false;
 let currentOptionIndex = 0;
 let lastTypedChar = '';
 let lastMatchingIndex = 0;

const toggleDropdown = () => {
    elements.dropDown.classList.toggle('active');
    isDropdownOpen = !isDropdownOpen;
    elements.button.setAttribute('aria-expanded', isDropdownOpen.toString());

    if (isDropdownOpen) {
        focusCurrentOption();
    } else {
        elements.button.focus();
    }
};

const handleKeyPress = (event) => {
    event.preventDefault();
    const { key } = event;
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ''];

    if (!isDropdownOpen && openKeys.includes(key)) {
        toggleDropdown();
    } else if (isDropdownOpen) {
        switch (key) {
            case 'Escape':
                toggleDropdown();
                break;

            case 'ArrowDown':
                moveFocusDown();
                break;
                
            case 'ArrowUp':
                moveFocusUp();
                break;
                
            case 'Enter':
            case ' ':
                selectCurrentOption();
                break;
            default:
                // Handle alphanumeric key presses for mini-search
                handleAlphaNumericKeyPress(key);
                break;     
        }
    }
};

const handleDocumentInteraction = (event) => {
    const isClickInsideButton = elements.button.contains(event.target);
}





