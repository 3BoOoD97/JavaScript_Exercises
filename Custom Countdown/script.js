const inputContainer = document.getElementById('input-container');
const countDowmForm = document.getElementById('countdownForm');
const dateEl= document.getElementById('date-picker');

const countdownEl= document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = new Date();
let countdownActive;
let saveCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//Set Date Input Min with Today's Date
const todat = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', todat);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive= setInterval(() => {
        const now = new Date().getTime();
    const distance = countDownValue - now;
    

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // Hide Input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if (distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
        completeEl.hidden = false;
    } else {
    // Else, show the countdown in progress
    countdownTitle.textContent = `${countDownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    completeEl.hidden = true;
    countdownEl.hidden = false;
    }
    }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    saveCountdown = {
        title: countDownTitle,
        date: countDownDate,
    };
    console.log(saveCountdown);
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));
    // Check for valid date
    if (countDownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get number version of current Date, update DOM
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
 // Get countdown from localStorage if available
 if (localStorage.getItem('countdown')) {
     inputContainer.hidden = true;
     saveCountdown = JSON.parse(localStorage.getItem('countdown'));
     countDownTitle = saveCountdown.title;
     countDownDate = saveCountdown.date;
     countDownValue = new Date(countDownDate).getTime();
     updateDOM();
 }
}
//Event Listeners
countDowmForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();