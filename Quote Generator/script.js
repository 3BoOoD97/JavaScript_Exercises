let apiQuotes = [];

function getRandomQuote() {
    //Pick Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
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

getQuotes();