
 // Deslogearse
 function signOutClose(){
  firebase.auth().signOut()
  .then(function (){
      console.log('Cerrando Sesion...')
      window.location.href = 'index2.html';
  })
  .catch(error=>{
      console.log(error)
  })
 }
