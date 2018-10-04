firebase.initializeApp({
    apiKey: "AIzaSyC7nuA5-QZDkhNnH6FBxoepllvmtkqDuMo",
    authDomain: "bookme-78399.firebaseapp.com",
    projectId: "bookme-78399"
});
//Inicializa una instancia de Cloud Firestore
var db = firebase.firestore();

//aca guardamos los datos ingresador por donante
function donateBook() {
    const title = document.getElementById('bookTitleBox').value;
    const author = document.getElementById('bookAuthorBox').value;
    const place = document.getElementById('place').value;
    const code = document.getElementById('code').value;

    db.collection("Libros a Donar").add({
            Title: title,
            Author: author,
            Place: place,
            Code: code

        })
        .then(function(bookRef) {
            console.log("libro correctamente añadido");

            document.getElementById('bookTitleBox').value = '';
            document.getElementById('bookAuthorBox').value = '';
            document.getElementById('place').value = '';
            document.getElementById('code').value = '';
        })
        .catch(function(error) {

        });
}