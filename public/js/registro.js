// Get a reference to the database service
let database = firebase.database();
//funcionalidad de bootstrap con jquery
$(function () {
  $('[data-toggle="popover"]').popover();
});

$('.popover-dismiss').popover({
  trigger: 'focus'
});

// selector de edades 
var select = '';
select += '<option disable>Edad</option>'
for (i=10;i<=100;i++){
    select += '<option val=' + i + '>' + i + '</option>';
}
$('.form-control').html(select);

// ------------------------------------------------------------
// variables a validar y a  utilizar para validación de registro.

let nameInput = document.getElementById('inputNombre');
let validarName = false;
let lastInput = document.getElementById('inputApellido');
let validarLastName = false;
let nicknameInput = document.getElementById('inputNickname');
let validarNickname = false;
let emailInput = document.getElementById('inputEmail');
let validarEmail = false;
let passwordInput = document.getElementById('inputPassword');
let validarPassword = false;
let passwordInput2 = document.getElementById('inputPassword2');
let validarPassword2 = false;
let regBtn = document.getElementById('btnCrearCuenta');

//para construir estructura de control
function validacionRegistroExitoso() {
  if (validarName && validarLastName && validarNickname && validarEmail && validarPassword && validarPassword2) {
    regBtn.removeAttribute('disabled');
  }
}

function noValidarRegistroFallido() {
  regBtn.setAttribute('disabled', true);
}

// Funciones para los input de nombre, apellido,email y password
//validacion Nombre
nameInput.addEventListener('input', function () {
  if (nameInput.value.length >= 3) {
    validarName = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido()
  }
});

//validacion Apellido
lastInput.addEventListener('input', function () {
  if (lastInput.value.length >= 3) {
    validarLastName = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//validacion Nickname
nicknameInput.addEventListener('input', function () {
  if (nicknameInput.value.length >= 3) {
    validarNickname= true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//validacion Email
emailInput.addEventListener('input', function () {
  let patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (patron.test(emailInput.value)) {
    validarEmail = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//validacion Contraseña
passwordInput.addEventListener('input', function () {
  let patronPass = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\0-9]{6,}$/;
  if (patronPass.test(passwordInput.value)) {
    validarPassword = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//validacion Contraseña2
passwordInput2.addEventListener('input', function () {
  let patronPass = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\0-9]{6,}$/;
  if ((patronPass.test(passwordInput2.value))&&(passwordInput.value===passwordInput2.value)) {
    validarPassword2 = true;
    validacionRegistroExitoso();
  } else {
    noValidarRegistroFallido();
  }
});

//cuando se cumplen todas las validaciones se activa la fx
function register() {
  let emailRegister = emailInput.value;
  let passwordRegister = passwordInput.value;
  let nombre = nameInput.value;
  let apellido = lastInput.value;
  let username = `${nombre} ${apellido}`;
  let nickname= nicknameInput.value;

  // Registro de Usuario (NUEVO) con FIREBASE
  firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister)
  .then(function(){
    let user = result.user;
         firebase.database().ref('users/' + user.uid).set({
          name: username,
          email:emailRegister,
          nickname:nickname
           }).then(user => {
             console.log ('estas loggeado con fb ')
             window.location.href = 'index.html';
           });

    }).catch(function (error) {
      console.error(error)
      noValidarRegistroFallido()
    });


}

