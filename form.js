// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyBkQ5z8Rs5IRP4lHoiWyXV9XVQHjAh-sEI",
    authDomain: "a-eye-for-the-blind.firebaseapp.com",
    projectId: "a-eye-for-the-blind",
    storageBucket: "a-eye-for-the-blind.appspot.com",
    databaseURL: "https://a-eye-for-the-blind-default-rtdb.firebaseio.com/",
    messagingSenderId: "369582010992",
    appId: "1:369582010992:web:b8fa311591a4f5b442fab5"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const rootRef = database.ref('users')
const auth = firebase.auth();

function writeUserData(email, firstname, lastname) {
    var user = firebase.auth().currentUser;
    uid = user.uid;
    rootRef.child(uid).set({
        email: email,
        firstname: firstname,
        lastname: lastname,
    });
}

function signUp() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email2 = document.getElementById("email2");
    var password2 = document.getElementById("password2");
    const promise = auth.createUserWithEmailAndPassword(email2.value, password2.value)
        .then(() => {
            writeUserData(email2.value, fname.value, lname.value)
            alert("Sign-Up Successful!")
        }) 
    promise.catch(e => alert(e.message))
}

function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
            alert("Sign-In Successful!")
            window.location.href = "inner-page.html";
        }) 
    promise.catch(e => alert(e.message))
}
    

function signOut() {
    firebase.auth().signOut();
}

async function loggedin(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          
        } else {
            window.location.href = "index.html";
        }
      });
}


function fullname(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          uid = user.uid;
          database.ref('users/' + uid).once('value').then(function (snapshot) {
            var firstname = snapshot.val().firstname;
            var lastname = snapshot.val().lastname;
            var fullname = firstname + " " + lastname;
            document.getElementById('fullname').innerHTML=fullname;
          })
        } else {
          // User not logged in or has just logged out.
        }
    });
}

function getImages() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          uid = user.uid;
          database.ref('users/' + uid +'/images').once('value').then(function (snapshot) {
            document.getElementById("first").src=snapshot.val().i0;
            document.getElementById("second").src=snapshot.val().i1;
            document.getElementById("third").src=snapshot.val().i2;
            document.getElementById("fourth").src=snapshot.val().i3;
            document.getElementById("fifth").src=snapshot.val().i4;
            document.getElementById("sixth").src=snapshot.val().i5;
            document.getElementById("seventh").src=snapshot.val().i6;
            document.getElementById("eight").src=snapshot.val().i7;
            document.getElementById("ninth").src=snapshot.val().i8;
            document.getElementById("tenth").src=snapshot.val().i9;
          })
        } else {
          // User not logged in or has just logged out.
        }
    });
}


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};



