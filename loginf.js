// setting up firebase with our website
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCKcUKp_RyAW78fIrCOvD1woGvFLfj4r3A",
    authDomain: "calmsphere-a2ab4.firebaseapp.com",
    databaseURL: "https://calmsphere-a2ab4-default-rtdb.asia-southeast1.firebasedatabase.app",
    
    projectId: "calmsphere-a2ab4",
    storageBucket: "calmsphere-a2ab4.appspot.com",
    messagingSenderId: "1011226687033",
    appId: "1:1011226687033:web:8c62719362a330524bbfe8",
    measurementId: "G-PVE1X9R50Y"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
// var provider = new firebase.auth.GoogleAuthProvider();


// Sign up function
const signUp = () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if name, age, email, and password are entered
    if (!name || !age || !email || !password) {
        alert("Please enter all details.");
        return;
    }

    // Check if the age is a positive integer
    if (!Number.isInteger(parseInt(age, 10)) || parseInt(age, 10) <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    // Check if the password is at least 6 characters
    if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return;
    }

    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    // firebase code
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed up
            alert("You are Signed Up");
            window.location.href = "signIN.html";
            console.log(result);
            const user = result.user;
            // db.ref("users/" + user.uid).set({
            //     name: name,
            //     age: age,
            //     email: email,
            //     // Add other details as needed
            // })
            // .then(() => {
            //     console.log("User details stored in the Realtime Database");
            // })
            // .catch((error) => {
            //     console.error("Error storing user details:", error);
            // });
        

        })
        .catch((error) => {
            // Handle specific error cases
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("Email is already registered. Please proceed to sign in.");
                    break;
                case "auth/invalid-email":
                    alert("Please enter a valid email address.");
                    break;
                default:
                    alert("An error occurred during sign up. Please try again.");
            }
            console.log(error.code);
            console.log(error.message);
        });
}


// Google Sign Up function
const signUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Signed in with Google
            alert("You are Signed Up with Google");
            window.location.href = "signIN.html";
            console.log(result);
            // Additional logic if needed
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            alert(error.message);
        });
}

// Sign In function
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in successfully
            alert("You are Signed In");
            window.location.href = "index.html";
            console.log(result);
            // Additional logic if needed
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            alert(error.message);
        });
}


// Function to sign in with Google
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token
        var token = result.credential.accessToken;
        
        // This gives you the signed-in user
        var user = result.user;
        alert("You are Signed In");
        window.location.href = "index.html";
        // You can access user information like user.displayName, user.email, etc.
  
        // Add your additional logic after signing in with Google
        console.log("Successfully signed in with Google:", user);
      })
      .catch(function (error) {
        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
  
        console.error("Google Sign In Error:", errorCode, errorMessage);
      });
  }

// function logOut(){
//     firebase.auth.signOut()
//     console.log("user is signed out");
// }


// Function to check authentication state

// Function to check authentication state
// function checkAuthState() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         var profile = document.getElementById("profileTab");
//         var safeSpace = document.getElementById("safeSpaceTab");
//         var loginButton = document.getElementById("loginBtn");

//         if (user) {
//             // User is signed in
//             console.log("User is signed in:", user);

//             // Show additional tabs for logged-in users
//             profile.style.display = "block";
//             safeSpace.style.display = "block";
            
//             // Update login button dynamically
//             loginButton.innerHTML = `
//                 <span>
//                     Logout
//                 </span>
//                 <i class="fa fa-user" aria-hidden="true"></i>
//             `;

//             // Add click event listener for logout
//             loginButton.addEventListener('click', function () {
//                 firebase.auth().signOut().then(function () {
//                     console.log("User signed out successfully");
//                     location.reload();
//                     // Additional logic if needed
//                 }).catch(function (error) {
//                     console.error("Sign out error", error);
//                 });
//             });
//         } else {
//             // User is signed out
//             console.log("User is signed out");

//             // Hide additional tabs for logged-out users
//             profileTab.style.display = "none";
//             safeSpaceTab.style.display = "none";

//             // Update login button dynamically
//             loginButton.innerHTML = `
//                 <span>
//                     Login
//                 </span>
//                 <i class="fa fa-user" aria-hidden="true"></i>
//             `;

//             // Add click event listener for login
//             loginButton.addEventListener('click', function () {
//                 console.log("Login button clicked");
//                 // Your login logic goes here
//                 // e.g., redirect to the login page
//                 window.location.href = './loginf.html';
//             });
//         }
//     });
// }

// // Call the checkAuthState function on page load
// document.addEventListener("DOMContentLoaded", function () {
//     checkAuthState();
// });

function checkAuthState() {
    firebase.auth().onAuthStateChanged(function (user) {
        var profileTab = document.getElementById("profileTab");
        var safeSpaceTab = document.getElementById("safeSpaceTab");
        var loginButton = document.getElementById("loginBtn");

        if (user) {
            // User is signed in
            console.log("User is signed in:", user);

            // Show additional tabs for logged-in users
            profileTab.style.display = "block";
            safeSpaceTab.style.display = "block";

            // Update login button dynamically
            loginButton.innerHTML = `
                <span>
                    Logout
                </span>
                <i class="fa fa-user" aria-hidden="true"></i>
            `;

            // Add click event listener for logout
            loginButton.addEventListener('click', function () {
                firebase.auth().signOut().then(function () {
                    console.log("User signed out successfully");
                    location.reload();
                    // Additional logic if needed
                }).catch(function (error) {
                    console.error("Sign out error", error);
                });
            });

            // Retrieve user data from the Realtime Database
            const userId = user.uid;
            const userRef = firebaseApp.database().ref("users/" + userId);

            userRef.once("value")
                .then(snapshot => {
                    const userData = snapshot.val();
                    console.log("User data from the Realtime Database:", userData);
                    // Use the userData as needed
                })
                .catch(error => {
                    console.error("Error retrieving user data:", error);
                });

        } else {
            // User is signed out
            console.log("User is signed out");

            // Hide additional tabs for logged-out users
            profileTab.style.display = "none";
            safeSpaceTab.style.display = "none";

            // Update login button dynamically
            loginButton.innerHTML = `
                <span>
                    Login
                </span>
                <i class="fa fa-user" aria-hidden="true"></i>
            `;

            // Add click event listener for login
            loginButton.addEventListener('click', function () {
                console.log("Login button clicked");
                // Your login logic goes here
                // e.g., redirect to the login page
                window.location.href = './loginf.html';
            });
        }
    });
}

// Call the checkAuthState function on page load
document.addEventListener("DOMContentLoaded", function () {
    checkAuthState();
});

  






firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed up successfully
    const user = userCredential.user;

    // Set the display name for the user
    user.updateProfile({
      displayName: "John Doe"
    }).then(() => {
      // Display name updated successfully
    }).catch((error) => {
      // Handle errors while updating display name
    });
  })
  .catch((error) => {
    // Handle errors during sign-up
  });

const user = firebase.auth().currentUser;

if (user) {
  const displayName = user.displayName;
  console.log("User's display name:", displayName);
}
