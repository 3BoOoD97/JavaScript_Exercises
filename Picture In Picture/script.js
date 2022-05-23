const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };

        videoElement.srcObject = stream;
        videoElement.play();
    } catch (error) {
        console.log(error);
    }
}
button.addEventListener('click', async() => {
    //Disable button
    button.disabled = true;
    //Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Rest Button
    button.disabled = false;
});

//On Load
selectMediaStream();