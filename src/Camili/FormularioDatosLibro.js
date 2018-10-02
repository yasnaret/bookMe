// Get a reference to the database service
var db = firebase.firestore();

//aca guardamos los datos ingresador por donante
function saveBookData() {
    const title = document.getElementById('bookTitleBox').value;
    const author = document.getElementById('bookAuthorBox').value;
    const place = document.getElementById('place').value;
    const review = document.getElementById('reviewBox').value;

    db.collection("Libros").add({
        title = Title,
        author = Author,
        place = Place,
        review = Review
    })


}