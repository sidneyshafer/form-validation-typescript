"use strict";
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm');
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};
const checkRequired = (inputArr) => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is a required field`);
        }
        else {
            showSuccess(input);
        }
    });
};
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
const validateUsername = () => {
    const input = username.value.trim();
    if (input.length < 3) {
        showError(username, 'Username must be at least 3 characters');
        return;
    }
    else if (input.length > 15) {
        showError(username, 'Username must be less than 15 characters');
        return;
    }
    else {
        showSuccess(username);
    }
};
const validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
    }
    else {
        showError(email, 'Email is not valid');
    }
};
const validatePassword = () => {
    const input = password.value.trim();
    if (input.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        return;
    }
    else if (input.length > 25) {
        showError(password, 'Password must be less than 25 characters');
        return;
    }
    else {
        showSuccess(password);
    }
    validateConfirm();
};
const validateConfirm = () => {
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    if (passwordValue !== confirmPasswordValue) {
        showError(confirmPassword, 'Passwords do not match');
        return;
    }
    if (confirmPasswordValue === '') {
        showError(confirmPassword, 'Passwords do not match');
        return;
    }
    showSuccess(confirmPassword);
};
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', () => {
    validatePassword();
    validateConfirm();
});
confirmPassword.addEventListener('input', validateConfirm);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, confirmPassword]);
});
