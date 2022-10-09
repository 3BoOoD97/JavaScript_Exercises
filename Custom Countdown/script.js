const input = document.getElementById('inputc-container');
const countDowm = document.getElementById('countdownForm');
const dateEl= document.getElementById('date-picker');

//Set Date Input Min with Today's Date
const todat = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', todat);