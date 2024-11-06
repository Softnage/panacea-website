// Array of background images
const images = [
    'assets/img/Portfolio/i5.jpg',
    'assets/img/Portfolio/i6.jpg',

];

// Initial index
let currentIndex = 0;

// Function to change background image
function changeBackground() {
    document.getElementById('hero-area').style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length; // Loop back to the beginning if at the end
}

// Change background image every x seconds (e.g., 5 seconds)
const interval = setInterval(changeBackground, 5000); // Change every 5 seconds
changeBackground();
