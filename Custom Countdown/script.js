const input = document.getElementById('inputc-container');
const countDowmForm = document.getElementById('countdownForm');
const dateEl= document.getElementById('date-picker');

let countDownTitle = '';
let countDownDate = '';
//Set Date Input Min with Today's Date
const todat = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', todat);

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    console.log(countDownTitle, countDownDate);
}

//Event Listeners
countDowmForm.addEventListener('submit', updateCountdown);