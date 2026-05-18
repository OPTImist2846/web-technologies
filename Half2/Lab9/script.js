'use strict';

const tabSignup = document.getElementById('tab-signup');
const tabLogin = document.getElementById('tab-login');
const formSignup = document.getElementById('form-signup');
const formLogin = document.getElementById('form-login');

function switchTab(showForm, hideForm, activeTab, inactiveTab) {
    showForm.classList.add('active');
    hideForm.classList.remove('active');
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
}

tabSignup.addEventListener('click', () => switchTab(formSignup, formLogin, tabSignup, tabLogin));
tabLogin.addEventListener('click', () => switchTab(formLogin, formSignup, tabLogin, tabSignup));


const togglePwdBtns = document.querySelectorAll('.toggle-pwd');
togglePwdBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    });
});


const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

const cities = {
    ukraine: ['Kyiv', 'Chernivtsi', 'Lviv'],
    poland: ['Warsaw', 'Krakow', 'Wroclaw']
};

countrySelect.addEventListener('change', function() {
    const selectedCountry = this.value;
    citySelect.innerHTML = '<option value="">Choose...</option>';
    
    if (selectedCountry && cities[selectedCountry]) {
        citySelect.disabled = false;
        // Заповнюємо новими містами
        cities[selectedCountry].forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase();
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        citySelect.disabled = true;
    }
});


function setError(input, message) {
    const group = input.closest('.input-group');
    const errorDisplay = group.querySelector('.error-msg');
    
    errorDisplay.innerText = message;
    errorDisplay.style.color = '#dc3545';
    
    input.classList.remove('success');
    input.classList.add('error');
}

function setSuccess(input) {
    const group = input.closest('.input-group');
    const errorDisplay = group.querySelector('.error-msg');
    
    errorDisplay.innerText = 'Looks good!';
    errorDisplay.style.color = '#198754';
    
    input.classList.remove('error');
    input.classList.add('success');
}


formSignup.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;

    const firstName = document.getElementById('firstName');
    const fNameVal = firstName.value.trim();
    if (fNameVal.length < 3 || fNameVal.length > 15) {
        setError(firstName, 'Must be 3-15 characters');
        isValid = false;
    } else {
        setSuccess(firstName);
    }

    const lastName = document.getElementById('lastName');
    const lNameVal = lastName.value.trim();
    if (lNameVal.length < 3 || lNameVal.length > 15) {
        setError(lastName, 'Must be 3-15 characters');
        isValid = false;
    } else {
        setSuccess(lastName);
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        setError(email, 'Please provide a valid email');
        isValid = false;
    } else {
        setSuccess(email);
    }

    const password = document.getElementById('password');
    if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 chars');
        isValid = false;
    } else {
        setSuccess(password);
    }

    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword.value === '' || confirmPassword.value !== password.value) {
        setError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess(confirmPassword);
    }

    const phone = document.getElementById('phone');
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        setError(phone, 'Format: +380XXXXXXXXX');
        isValid = false;
    } else {
        setSuccess(phone);
    }

    const dob = document.getElementById('dob');
    if (!dob.value) {
        setError(dob, 'Date is required');
        isValid = false;
    } else {
        const birthDate = new Date(dob.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (birthDate > today) {
            setError(dob, 'Date cannot be in the future');
            isValid = false;
        } else if (age < 12) {
            setError(dob, 'You must be at least 12 years old');
            isValid = false;
        } else {
            setSuccess(dob);
        }
    }

    const selects = ['sex', 'country', 'city'];
    selects.forEach(id => {
        const selectEl = document.getElementById(id);
        if (selectEl.value === '') {
            setError(selectEl, 'Please select an option');
            isValid = false;
        } else {
            setSuccess(selectEl);
        }
    });

    if (isValid) {
        alert('Реєстрація успішна!');
        
        this.reset();
        
        const allInputs = this.querySelectorAll('input, select');
        const allErrors = this.querySelectorAll('.error-msg');
        
        allInputs.forEach(input => {
            input.classList.remove('success', 'error');
        });
        allErrors.forEach(msg => {
            msg.innerText = '';
        });
        
        citySelect.disabled = true; 
        citySelect.innerHTML = '<option value="">Select country first...</option>';
    }
});


formLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const username = document.getElementById('login-username');
    if (username.value.trim() === '') {
        setError(username, 'Please choose a username');
        isValid = false;
    } else {
        setSuccess(username);
    }

    const password = document.getElementById('login-password');
    if (password.value.length < 6) {
        setError(password, 'Password must be at least 6 chars');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (isValid) {
        const remember = document.getElementById('remember').checked;
        alert(`Успішний вхід! Remember me: ${remember}`);
        
        this.reset();
        const allInputs = this.querySelectorAll('input');
        const allErrors = this.querySelectorAll('.error-msg');
        allInputs.forEach(input => input.classList.remove('success', 'error'));
        allErrors.forEach(msg => msg.innerText = '');
    }
});