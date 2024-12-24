// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to format date
function formatDate(timestamp) {
    const date = timestamp.toDate();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to load news details
async function loadNewsDetails() {
    try {
        const newsId = getUrlParameter('id');
        if (!newsId) {
            console.error('No news ID provided');
            return; // Don't redirect, just return
        }

        // Get reference to Firestore
        const db = firebase.firestore();
        const newsDoc = await db.collection('News').doc(newsId).get();
        
        if (!newsDoc.exists) {
            console.error('News not found');
            return; // Don't redirect, just return
        }

        const data = newsDoc.data();

        // Update the page content
        document.querySelector('.news-title').textContent = data.tittle;
        document.querySelector('.news-date').textContent = formatDate(data.timestamp);
        document.querySelector('.news-image').src = data.thumbnail;
        document.querySelector('.news-image').alt = data.tittle;
        document.querySelector('.news-content').innerHTML = data.content;

        // Update metadata for SEO
        document.title = `${data.tittle} - Panacea Pharmaceuticals`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = data.tittle;
        }
    } catch (error) {
        console.error("Error loading news details:", error);
        // Don't redirect, just log the error
    }
}

// Wait for Firebase to initialize before loading news details
function initializeNewsDetails() {
    // Check if Firebase is initialized
    if (firebase.apps.length) {
        loadNewsDetails();
    } else {
        // If Firebase isn't initialized yet, wait a bit and try again
        setTimeout(initializeNewsDetails, 100);
    }
}

// Load news details when the document is ready
document.addEventListener('DOMContentLoaded', initializeNewsDetails);
