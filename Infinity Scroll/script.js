//Unsplah API
const count = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;
// 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photoArr = [];

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
        // Put <img> inside <a>, then put them inside imageContainer Elment
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//On Load
getImages();