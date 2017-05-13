    var config = {
        apiKey: "AIzaSyAap6jgbmIg6B8xpI8XwK0o2BH3VaexXN4",
        authDomain: "zack-1.firebaseapp.com",
        databaseURL: "https://zack-1.firebaseio.com",
        projectId: "zack-1",
        storageBucket: "zack-1.appspot.com",
        messagingSenderId: "295740861099"
    };
    firebase.initializeApp(config);

    var user = firebase.auth().currentUser;


    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');


$("#google").click(function(event) {

  event.preventDefault();


    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      window.location = "http://localhost:3000/index.html";
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});


var email;
var password;

$("#sign-in").click(function(event) {

  event.preventDefault();

  email = $("#email").val();

  password = $("#password").val();

  window.location = "http://localhost:3000/index.html"

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

    // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
    // ...
  });

});






var providerF = new firebase.auth.FacebookAuthProvider();

$("#facebook").click(function(event) {


  event.preventDefault();


  firebase.auth().signInWithPopup(providerF).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;

  window.location = "http://localhost:3000/index.html";
  
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(errorCode);
  console.log(errorMessage);
});

});

var providerT = new firebase.auth.TwitterAuthProvider();

$("#twitter").click(function(event) {

  event.preventDefault();

  firebase.auth().signInWithPopup(providerT).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  // The signed-in user info.
  var user = result.user;
  window.location = "http://sawaby.github.io/MyDash/index";  
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

});


firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log(user);
    if (window.location.href === "http://localhost:3000/sign-in.html") {
      window.location = "http://localhost:3000/index.html";
      } 
  } else {
    if((window.location.href === "http://localhost:3000/index.html") && (user === null)) {
      window.location = "http://localhost:3000/sign-in.html";
      alert("Must Sign In");
      }
    console.log("error");
  }
});



$("#signOut").click(function(event) {

    event.preventDefault();

    firebase.auth().signOut().then(function() {

    window.location = "http://localhost:3000/sign-in.html";
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
});


// if((window.location.href === "http://localhost:3000/index.html") && (user === null)) {
//   window.location = "http://localhost:3000/sign-in.html";
//   alert("Must Sign In");
// } else if((window.location.href === "http://localhost:3000/sign-in.html") && (user !== null)) {
//   window.location = "http://localhost:3000/index.html";
// } else {
//   console.log("error");
// };


