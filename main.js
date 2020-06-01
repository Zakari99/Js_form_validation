// Input Fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
// Form
const form = document.getElementById('myForm');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';

// Handle form on submit
form.addEventListener('submit', function (event) {
  // prevent default behaviour of outputting our data to the address bar
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) {
    const name = firstName.value;
    const container = document.querySelector('div.container');
    const loader = document.createElement('div');
    loader.className = 'progress';
    const loadingBar = document.createElement('div');
    loadingBar.className = 'indeterminate';
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    setTimeout(function () {
      const loaderDiv = document.querySelector('div.progress');
      const panel = document.createElement('div');
      panel.className = 'card-panel green';
      const text = document.createElement('span');
      text.className = 'white-text';
      text.appendChild(
        document.createTextNode(
          `Sign up successful, welcome to SocialBird ${name}`
        )
      );
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);
  }
});

// Validators i.e our validator functions
function validateFirstName() {
  // check if it's empty
  if (checkIfEmpty(firstName)) return;
  // check if it has only letters
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}
function validateLastName() {
  // check if it's empty
  if (checkIfEmpty(lastName)) return;
  // check if it has only letters
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}
function validatePassword() {
  if (checkIfEmpty(password)) return;
  // Set the desired minmax length of password
  if (!meetLength(password, 5, 20)) return;
  /* check password against any 1 our character sets with the below function
    which can be adjusted picking any from 1 - 4 cases. */
  // 1st case- a
  // 2- a 1
  // 3- A a 1
  // 4- A a 1 @
  if (!containsCharacters(password, 1)) return;
  return true;
}
function validateConfirmPassword() {
  if (password.className !== 'valid') {
    setInvalid(confirmPassword, 'Password must be valid');
    return;
  }
  // If they match
  if (password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, 'Passwords must match');
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}

// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}

function isEmpty(value) {
  if (value === '') {
    return true;
  } else return false;
}

function setInvalid(field, message) {
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  //   field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}

function meetLength(field, minLength, maxLength) {
  if (field.value.length >= minLength && field.value.length < maxLength) {
    setValid(field);
    return true;
  } else if (field.value.length < minLength) {
    setInvalid(
      field,
      `${field.name} must be at least ${minLength} characters long`
    );
  } else {
    setInvalid(
      field,
      `${field.name} must be shorter than ${maxLength} characters`
    );
    return false;
  }
}

function containsCharacters(field, code) {
  // case 1 - 5 are the code for the above argument
  let regEx;
  switch (code) {
    case 1:
      // must take a letter at least
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Password must contain at least one letter'
      );
    case 2:
      // At least one letter and one number
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Password must contain at least one letter and one number'
      );
    case 3:
      //  At least one uppercase , one lowercase  and one number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Password must contain at least one uppercase, one lowercase and one number'
      );
    case 4:
      // At least one uppercase , one lowercase, one number and one special character
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
      );
    case 5:
      // Email validation pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, 'Must be a valid email address');

    default:
      return false;
  }
}

function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}
