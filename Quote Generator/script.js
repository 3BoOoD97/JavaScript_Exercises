const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-qoute');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function getRandomQuote() {
    loading();
    //Pick Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getRandomQuote();
    } catch (err) {

    }
}

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - 
${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();