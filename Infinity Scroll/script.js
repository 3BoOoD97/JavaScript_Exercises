//Unsplah API
const count = 30;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photoArr = [];
let ready = false;
let imgLoaded = 0;
let totalImage = 30;

// Check if all Images are loaded
function imageLoaded() {
    console.log('Image Loaded');
    imgLoaded++;
    if (imgLoaded === totalImage) {
        loader.hidden = true;
        ready = true;
        console.log('ready=', ready);
    }
}
//Get the images from the API
async function getImages() {
    try {
        const response = await fetch(apiUrl);
        photoArr = await response.json();
        showImages();

    } catch (error) {}
}

//Helper funcation to setAttribute in DOM elements
function setAttribute(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }

}
//Create elements for Links, Photos, Add to DOM 
function showImages() {
    imgLoaded = 0;
    totalImage = photoArr.length;
    console.log('totalImage=', totalImage);
    //Run funcation to get each image in the array
    photoArr.forEach((photo) => {
        // Create <a> to link to the Unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            herf: photo.links.html,
            target: '_blank'
        });
        // Create <img> to show the photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event listener to check when each is finished loading 
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put them inside imageContainer Elment
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Check if scrolling near bottom of the page, then Load more images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImages();
    }
});
//On Load
getImages();