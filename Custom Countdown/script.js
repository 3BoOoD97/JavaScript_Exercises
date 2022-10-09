const inputContainer = document.getElementById('input-container');
const countDowmForm = document.getElementById('countdownForm');
const dateEl= document.getElementById('date-picker');

const countdownEl= document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = new Date();

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//Set Date Input Min with Today's Date
const todat = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', todat);

// Populate Countdown / Complete UI
function updateDOM() {
    const now = new Date().getTime();
    const distance = countDownValue - now;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // populate countdown
    countdownTitle.textContent = `${countDownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;


    // Hide Input
    inputContainer.hidden = true;
    //show countdown
    countdownEl.hidden = false;
}
// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    console.log(countDownTitle, countDownDate);
    //Get number version of current Date, updateDOM
    countDownValue = new Date(countDownDate).getTime();
    console.log(countDownValue);
    updateDOM();
}


//Event Listeners
countDowmForm.addEventListener('submit', updateCountdown);