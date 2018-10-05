let  db = firebase.firestore();
// funcion para Ingresar con usuario y contraseña ya hecho el registro
function signIn() {
    let email1 = document.getElementById("email1").value;
    let password1 = document.getElementById("password1").value;
    firebase.auth().signInWithEmailAndPassword(email1, password1)
  .then(function(){
    window.location.href = 'botonera.html';
  })
   .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
}

function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            let user = result.user;
            db.collection('users').doc(user.uid).set({
                profile:{
                name: user.displayName,
                email: user.email  
                }
                
            }).then(user => {
                window.location.href = 'botonera.html';
            });

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
        });
}

function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            let user = result.user;
            db.collection('users').doc(user.uid).set({
                profile:{
                name: user.displayName,
                email: user.email  
                }
            }).then(user => {
                console.log('estas loggeado con fb ')
                window.location.href = 'botonera.html';
            });

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
        });
}


function sendPasswordResetEmail() {
    let email1 = document.getElementById("email1").value;
    let auth = firebase.auth();
    let emailAddress = email1;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
    }).catch(function(error) {
        // An error happened.
    });
}

//(funcionalidad boostrap&jquery)
$(function() {
    $('[data-toggle="popover"]').popover();
});

$('.popover-dismiss').popover({
    trigger: 'focus'
});