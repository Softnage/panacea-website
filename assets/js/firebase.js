document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the inView class to trigger the animation
        entry.target.classList.add("inView");
        // Optionally, stop observing once animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px', // Adjust to control when the animation is triggered
    threshold: 0.1 // 10% of the div is visible to trigger
  });

  // Observe each div with the animation class
  const animatedElements = document.querySelectorAll(".fromLeft, .fromRight");
  animatedElements.forEach((el) => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', function() {
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
  var db = firebase.firestore();


// Function to check if user is logged in
function checkIfLoggedIn() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User is logged in:', user);
     // Redirect or perform further actions
     window.location.href = "/postBlog.html"; 
    } else {
      console.log('No user is logged in');
      // Redirect to login page or show logged-out content
      window.location.href = "/login.html"; // Example redirect to login page
    }
  });
}


// Call this function to check if a user is logged in
//checkIfLoggedIn(); // 

  // Reference to the container where news items will be populated
  const newsContainer = document.getElementById('newsItems');
  
  function limitContent(content, maxLength) {
    if (content.length <= maxLength) {
      return content;
    } else {
      // Find the last space within the maxLength characters
      const lastSpaceIndex = content.lastIndexOf(' ', maxLength);
      // Return the content up to the last space
      return content.substring(0, lastSpaceIndex) + '...';
    }
  }
  
  function handleAnchorClick(event, data) {
    // Prevent default anchor tag behavior
    event.preventDefault();
    // Encode the data to be passed as URL parameter
    const encodedData = encodeURIComponent(JSON.stringify(data));
    // Redirect to newsDetails.html page with the data as URL parameter
    window.location.href = `newsDetails.html?data=${encodedData}`;
  }
  function fetchRecentNews()
{
  const ulElement = document.querySelector(".newsRow");
  try {
      db.collection("News").limit(3).orderBy('timestamp', 'desc').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const li = document.createElement("li");
          li.className = "col-lg-4 col-md-5 image-block full-width p-3";

          const html = `
          <div class="image-block-inner" ">
              <a class="mh-100" href="#">
                  <img src="${data.thumbnail}" alt="${data.tittle}" class="img-responsive w-100">
              </a>
              <span class="hp-posts-cat">${data.date}</span>
              <h5 class=mx-4 my-0 text-center" style="padding:20px;">
                  <a style="text-transform: uppercase;color:#000" href="blog.html">${data.tittle}</a>
              </h5>
              <a href="blog.html" class="read-more">Read more ></a>
          </div>
      `;

      li.innerHTML = html;
      ulElement.appendChild(li);
        });

      });
     
  } catch (error) {
      console.error("Error fetching News collection:", error);
  }
}

 

//fetchRecentNews();
   // Function to fetch news data from Firestore
  function fetchNews() {
    db.collection("News").orderBy('timestamp', 'desc').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Create HTML elements for each news item
          const newsItem = document.createElement('div');
  newsItem.classList.add('col-lg-4', 'col-md-6');
  newsItem.innerHTML = `
  <div class="single-blog-gied">
    <div class="se-img">
      <img src="${data.thumbnail}" alt="">
    </div>
    <div class="blog-gied-text">
      <div class="datee">
        <a href="#" id="date"><i class="icofont-calendar"></i>${data.date}</a>
        <a href="#"><i class="fal fa-user"></i>By Admin</a>
      </div>
      <div class="gied-ttx">
        <h3>${data.tittle}</h3>
        <p>${limitContent(data.content, 200)}</p> <!-- Adjust 200 to the desired number of characters -->
        <div class="angle-left">
          <a href="" class="full-content-link"><i class="fas fa-angle-double-right"></i></a>
        </div>
      </div>
    </div>
  </div>
  `;
  // Get the anchor tag within the news item
  const fullContentLink = newsItem.querySelector('.full-content-link');
  // Add click event listener to the anchor tag
  fullContentLink.addEventListener('click', (event) => {
  // Call the function to handle anchor tag click and pass the data
  handleAnchorClick(event, data);
  });
  
          // Append news item to the container
          newsContainer.appendChild(newsItem);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  
  
  // Call the function to fetch news data
  if (newsContainer) {
    fetchNews();
} else {
    console.error("Error: 'newsContainer' is null.");
}
  
   
  // Function to retrieve data from URL parameter
  function getDataFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('data');
  return JSON.parse(decodeURIComponent(data));
  }
  
  // Get the data from URL parameter
  const data = getDataFromUrl();
  
  // Display the full content
  document.getElementById('title').innerText = data.tittle;
  document.getElementById('content').innerText = data.content;
  document.getElementById('date').innerText = data.date;
  document.getElementById('thumbnail').src = data.thumbnail;
  
 
  
  
  // Create Blog post
  
  document.getElementById("blogForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  // Get form values
  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const thumbnail = document.getElementById("imageurl").value;
  var PTimestamp = firebase.firestore.FieldValue.serverTimestamp();
  
  // Add data to Firestore
  db.collection("News").add({
      date: date,
      tittle: title,
      content: content,
      thumbnail: thumbnail,
      timestamp: PTimestamp
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Blog post added successfully!");
      // Optionally, you can redirect the user or show a success message here
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Blog post Failed!");
      // Optionally, you can show an error message to the user here
  });
  });

  
});



  // Function to authenticate user
function loginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Logged in successfully
      console.log('User logged in:', userCredential.user);
      // Redirect or perform further actions
      window.location.href = "/postBlog.html"; 
    })
    .catch((error) => {
      // Handle login errors
      console.error('Error logging in:', error.message);
      alert('Login failed: ' + error.message);
    });
}
// Event listener for the login form
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting traditionally

  var email = document.getElementById('useremail').value;
  var password = document.getElementById('userpassword').value;

  loginUser(email, password); // Authenticate user
});





// //Recent News
// Fetch and display the first 3 documents from the "News" collection

