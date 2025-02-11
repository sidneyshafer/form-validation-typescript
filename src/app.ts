const form = document.getElementById('form') as HTMLFormElement;
const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const confirmPassword = document.getElementById('confirm') as HTMLInputElement;

const showError = (input: HTMLInputElement, message: string): void => {
    const formControl = input.parentElement!;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')!;
    small.innerText = message;
}

const showSuccess = (input: HTMLInputElement): void => {
    const formControl = input.parentElement!;
    formControl.className = 'form-control success';
}

const checkRequired = (inputArr: HTMLInputElement[]): void => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is a required field`);
        } else {
            showSuccess(input);
        }
    });
}

const getFieldName = (input: HTMLInputElement): string => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const checkLength = (input: HTMLInputElement, minLength: number, maxLength: number) => {
    const value = input.value.trim();
    const name = getFieldName(input);

    if (value.length < minLength) {
        showError(input, `${name} must be at least ${minLength} characters`);
        return;
    }

    if (value.length > maxLength) {
        showError(input, `${name} must be less than ${maxLength} characters`);
        return;
    }

    showSuccess(input);
}

const validateUsername = (): void => {
    checkLength(username, 3, 15);
}

const validateEmail = (): void => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email, 'Email is not valid');
    }
}

const validatePassword = (): void => {
    checkLength(password, 6, 25);
    validateConfirm();
}

const validateConfirm = (): void => {
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
}


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