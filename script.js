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
    } 
}, 1000);

 // Custom select element
 const elements = {
    button: document.querySelector('[role="combobox"]'),
    buttonLabel: document.querySelector('label[for="select"]'),
    dropDown: document.querySelector('[role="listbox"]'),
    options: document.querySelectorAll('[role="option"]'),
    announcement: document.querySelector('.announcement'),
 };

 let isDropdownOpen = false;
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
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

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
                handleAlphanumericKeyPress(key);
                break;     
        }
    }
};

const handleDocumentInteraction = (event) => {
    const isClickInsideButton = elements.button.contains(event.target);
    const isClickInsideDropdown = elements.dropDown.contains(event.target);

    if (isClickInsideButton || (!isClickInsideDropdown && isDropdownOpen)) {
        toggleDropdown();
    }

    // Check if the click Is on an option
    const clickedOption = event.target.closest('[role="option"]');
    if (clickedOption) {
        selectOptionByElement(clickedOption);
    }
};

const moveFocusDown = () => {
    if (currentOptionIndex < elements.options.length - 1) {
        currentOptionIndex++;
    } else {
        currentOptionIndex = 0;
    }
    focusCurrentOption();
};

const moveFocusUp = () => {
    if (currentOptionIndex > 0) {
        currentOptionIndex--;
    } else {
        currentOptionIndex = elements.options.length - 1;
    }
    focusCurrentOption();
};

const focusCurrentOption = () => {
    const currentOption = elements.options[currentOptionIndex];
    const optionLabel = currentOption.textContent;

    currentOption.classList.add('current');
    currentOption.focus();

    // Scroll the current option into view
    currentOption.scrollIntoView({
        block: 'nearest',
    });

    elements.options.forEach((option, index) => {
        if (option !== currentOption) {
            option.classList.remove('current');
        }
    });
    announceOption(`${optionLabel} selected`);//Announce the selected option within a delayed period
};

const selectCurrentOption = () => {
    const selectedOption = elements.options[currentOptionIndex];
    selectOptionByElement(selectedOption);
};

const selectOptionByElement = (optionElement) => {
    const optionValue = optionElement.textContent;

    elements.button.textContent = optionValue;
    elements.buttonLabel.textContent = `Chosen option: ${optionValue}`;
    elements.options.forEach(option => {
        option.classList.remove('active');
        option.setAttribute('aria-selected', 'false');
    });

    optionElement.classList.add('active');
    optionElement.setAttribute('aria-selected', 'true');

    toggleDropdown();
    announceOption(optionValue); // Announce the selected option
};

const handleAlphanumericKeyPress = (key) => {
    const typedChar = key.toLowerCase();

    if (lastTypedChar !== typedChar) {
        lastMatchingIndex = 0;
        
        const matchingOptions = Array.from(elements.options).filter((option => {
            option.textContent.toLowerCase().startsWith(typedChar);
        };

        if (matchingOptions.length) {
            if (lastMatchingIndex === matchingOptions.length) {
                lastMatchingIndex = 0;
            }

            let value = matchingOptions[lastMatchingIndex];
            const index = Array.from(elements.options).indexOf(value);
            currentOptionIndex = index;
            focusCurrentOption();
            lastMatchingIndex += 1;
        }
        lastTypedChar = typedChar;
    };

    const announceOption = (text) => {
        elements.announcement.textContent = text;
        elements.announcement.setAttribute('aria-live', 'assertive');

    // setTimeout(() => {
    //   elements.announcement.textContent = '';
    //   elements.announcement.setAttribute('aria-live', 'off');
    // }, 10000); // Announce and clear after 1 second (adjust as needed)
    };
    elements.button.addEventListener('keydown', (event) => {
        // Tab functionality for keyboard users (works only forth...)
        if (event.key = 'Tab') {
            if (isDropdownOpen) {
                toggleDropdown();
            }
            return
             //return is needed so the handleKeyPress() doesn't run and prevent tab functionality
        }
        handleKeyPress(event);
    });
    document.addEventListener('click', handleDocumentInteraction);
    // ========== End Custom select element =================


    // ========== Form =================

    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    const inputPhone = document.getElementById('phone');
    const inputCompany = document.getElementById('company');
    const inputSelectPack = document.querySelectorAll('#listbox li');

    const successMessage = document.getElementById('success-message');

    // Prevent typing letters in number field
    const oninputNumbers = event => {
        event.target.value = event.target.value.replace(/[^0-9+]/g, '')
    }
    // Allow typing only letters in name field
    const oninputLetters = event => {
        event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, '')
    }

    const showSuccessMessage = () => {
        successMessage.innerText = "Thank you for contacting us!";
        inputName.value = '';
        inputEmail.value = '';
        inputPhone.value = '';
        inputCompany.value = '';
    }

    // Validation
    function validate(inputId, inputType) {
        let n = inputId;   // get input id
        let nInvalidMessage = inputId.parentNode.querySelector('.invalid-message'); 

        function addError(errorText) {
            nInvalidMessage.innerText = `${errorText}`;
            nInvalidMessage.classList.add('activeMessage');
            inputId.classList.add('input-invalid');
        }
        function removeError() {
            nInvalidMessage.classList.remove('activeMessage');
            inputId.classList.remove('input-invalid');
        }

        // Name Validation
        if (inputType === 'name') {
            if (inputId.value === '') {
                addError(`${inputId.name} can't be blank`);
                return false;
            } else {
                removeError();
                return true;
            }
        }

        // Email Validation
        if (inputType === 'email') {
            var rea = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.\w+$/;
            var Email = inputEmail.value;
            var x = rea.test(Email);

            if (inputId.value === '') {
                addError("Email can't be blank");
                return false;
            } else if (!x) {
                addError('Incorrect email format');
            } else {
                removeError();
                return true;
            }
        }

        // Phone Validation
        if (inputType === 'phone') {
            let regex = /^[0-9]+$/;
            let phoneNumber = inputId.value;

            if (phoneNumber === '') {
                addError("Can't be blank");
                return false;
            } else if (!phoneNumber.match(regex)) {
                addError("Phone number must contain only numbers");
                return false;
            } else if (phoneNumber,length < 6) {
                addError("Phone number must contain at least 6 characters");
                return false;
            } else {
                removeError();
                return true;
            }
        }

        // Select Pack Validation
        if (inputType === 'selectPack') {
            let isSelected = false;
            const array = Array.from(inputSelectPack);
            array.forEach((item) => {
                if (ariaSelected) {
                    isSelected = true;
                }
            })
            if (!isSelected) {
                addError('Please select one pack option');
                return false;
            } else {
                removeError();
                return true;
            }
        }
 }

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    successMessage.innerText = '';

    let isValidName = validate(inputName, 'name');
    let isValidEmail = validate(inputEmail, 'email');
    // let isValidPhone = validate(inputPhone, 'phone');
    // let isValidCompany = validate(inputCompany, 'company');
    let isValidSelectPack = validate(listbox, 'selectPack');

    // If all fields are valid, show success message
    if (isValidName && isValidEmail && isValidSelectPack) {
        showSuccessMessage();
        // Submit userData(this)
    }
})



