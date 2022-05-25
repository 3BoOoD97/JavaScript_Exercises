const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Get Jokes from JOKE API
async function getJokes() {
    let joke = '';
    const response = await fetch('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist');
    try {
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text to speech
        tellJokes(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        console.log(error);
    }
}
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)

function tellJokes(joke) {
    console.log(joke);
    VoiceRSS.speech({
        key: 'YOUR_API_KEY',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
getJokes();