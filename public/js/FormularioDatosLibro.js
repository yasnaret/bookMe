firebase.initializeApp({
    apiKey: "AIzaSyC7nuA5-QZDkhNnH6FBxoepllvmtkqDuMo",
    authDomain: "bookme-78399.firebaseapp.com",
    projectId: "bookme-78399"
});
//Inicializa una instancia de Cloud Firestore
let db = firebase.firestore();

//aca guardamos los datos ingresador por donante
function donateBook() {
    const title = document.getElementById('bookTitleBox').value;
    const author = document.getElementById('bookAuthorBox').value;
    const place = document.getElementById('place').value;
    const code = document.getElementById('code').value;
    var user = firebase.auth().currentUser;
    if (user) {

        db.collection('users').doc(user.uid).collection('librosDonados').doc(code).set({

            
                    Title: title,
                    Author: author,
                    Place: place,
                    ISBN: code
                
            }, {
                merge: true
        })
        

        db.collection('Libros Donados').doc(code).set({
                Title: title,
                Author: author,
                Place: place,
                ISBN: code
        }, {
            merge: true
    })

        console.log("libro correctamente añadido");
        document.getElementById('bookTitleBox').value = '';
        document.getElementById('bookAuthorBox').value = '';
        document.getElementById('place').value = '';
        document.getElementById('code').value = '';
    }
}
