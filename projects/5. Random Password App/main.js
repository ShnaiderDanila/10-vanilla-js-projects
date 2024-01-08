const passwordInput = document.getElementById('password');
const generateButton =  document.querySelector('.password-generator__button');
const copyButton = document.querySelector('.password-generator__copy-img');
const tooltip = document.querySelector('.password-generator__tooltip');

const randomPasswordLength = 16;

const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789'
const symbols = '@#$%^&*()_+~|}{[]></-=';

const allChars = upperCase + lowerCase + numbers + symbols;

function generateRandomPassword() {
  let password = '';
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  while(randomPasswordLength > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  passwordInput.value = password;
}

function copyPassword() {
  navigator.clipboard.writeText(passwordInput.value);
  tooltip.style.opacity = 1;
  setTimeout(() => {
    tooltip.style.opacity = 0;
  }, 2000)
}

generateButton.addEventListener('click', generateRandomPassword);
copyButton.addEventListener('click', copyPassword);


