// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfjOH7Z-5yuGZ6Rw_WUPpM59r65BgryR4",
  authDomain: "panaceagh.firebaseapp.com",
  projectId: "panaceagh",
  storageBucket: "panaceagh.appspot.com",
  messagingSenderId: "1031765898065",
  appId: "1:1031765898065:web:150363850ec689aa4c9970",
};
firebase.initializeApp(firebaseConfig);

// Handle login form submission
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("useremail").value;
    const password = document.getElementById("userpassword").value;

    // Sign in with Firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Redirect or perform actions after successful login
        window.location.href = "postBlog.html"; // Change to your desired page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage); // Display error message
      });
  });
