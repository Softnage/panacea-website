// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfjOH7Z-5yuGZ6Rw_WUPpM59r65BgryR4",
    authDomain: "panaceagh.firebaseapp.com",
    projectId: "panaceagh",
    storageBucket: "panaceagh.appspot.com",
    messagingSenderId: "1031765898065",
    appId: "1:1031765898065:web:150363850ec689aa4c9970"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to format date
function formatDate(timestamp) {
    const date = timestamp.toDate();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to load blog posts
async function loadBlogPosts() {
    try {
        const blogsContainer = document.querySelector('.latesNewsContainer');
        if (!blogsContainer) return;

        // Clear existing content
        blogsContainer.innerHTML = '';

        // Get blog posts from Firestore
        const querySnapshot = await db.collection('News')
            .orderBy('timestamp', 'desc')
            .limit(3)
            .get();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const blogCard = `
                <div class="col-md-4">
                    <div class="card news-card">
                        <img src="${data.thumbnail}" class="card-img-top" alt="${data.tittle}">
                        <div class="card-body news-card-body">
                            <h5 class="card-title text-dark">
                                ${data.tittle}
                            </h5>
                            <p class="card-text"><small class="text-muted">${formatDate(data.timestamp)}</small></p>
                            <a href="newsDetails.html?id=${doc.id}" class="button">Read More<i class="bi bi-arrow-right-short"></i></a>
                        </div>
                    </div>
                </div>
            `;
            blogsContainer.innerHTML += blogCard;
        });
    } catch (error) {
        console.error("Error loading blog posts:", error);
    }
}

// Load blog posts when the document is ready
document.addEventListener('DOMContentLoaded', loadBlogPosts);
