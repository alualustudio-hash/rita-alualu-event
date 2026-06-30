// ======================================
// ALÚ ALÚ x RITA MILLER
// SCRIPT PRINCIPAL
// ======================================

// Contador del sorteo
let contador = 1;

// ======================================
// ELEMENTOS HTML
// ======================================

const btn3 = document.getElementById("btn3");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const instagram = document.getElementById("instagram");
const consentimiento = document.getElementById("consentimiento");
const error = document.getElementById("error");
const numero = document.getElementById("numero");

// ======================================
// FUNCIONES
// ======================================

// Cambiar de pantalla
function mostrarPantalla(numeroPantalla){

    document.querySelectorAll(".pantalla").forEach(pantalla => {

        pantalla.classList.remove("activa");

    });

    document
        .getElementById("pantalla" + numeroPantalla)
        .classList.add("activa");

}

// Generar número del sorteo
function generarNumero(){

    numero.textContent = contador.toString().padStart(3, "0");

    contador++;

}

// Limpiar formulario
function limpiarFormulario(){

    nombre.value = "";
    email.value = "";
    instagram.value = "";

    consentimiento.checked = false;

    error.textContent = "";

}

async function enviarDatos() {

    const datos = {

        nombre: nombre.value,
        email: email.value,
        instagram: instagram.value,
        consentimiento: consentimiento.checked ? "Sí" : "No"

    };

    const respuesta = await fetch(
        "https://script.google.com/macros/s/AKfycbxxW451N_XmUtm1OG0BKQSJOzkPcjCCWvS1IrAg3wTcwQ3HMKH8QRNDQbeHK9XWw2z-/exec",
        {
            method: "POST",
            body: JSON.stringify(datos)
        }
    );

    const resultado = await respuesta.json();

    numero.textContent = resultado.numero
        .toString()
        .padStart(3, "0");

}

// ======================================
// BOTÓN 1
// ======================================

document.getElementById("btn1").onclick = () => {

    mostrarPantalla(2);

};

// ======================================
// BOTÓN 2
// ======================================

document.getElementById("btn2").onclick = () => {

    mostrarPantalla(3);

};

// ======================================
// BOTÓN 3
// ======================================

document.getElementById("btn3").onclick = async () => {

    error.textContent = "";

    if(nombre.value.trim() === ""){

        error.textContent = "Introduce tu nombre.";
        return;

    }

    if(email.value.trim() === ""){

        error.textContent = "Introduce tu correo electrónico.";
        return;

    }

    if(instagram.value.trim() === ""){

        error.textContent = "Introduce tu usuario de Instagram.";
        return;

    }

    if(!consentimiento.checked){

        error.textContent = "Debes aceptar el consentimiento.";
        return;

    }

    btn3.disabled = true;

    btn3.textContent = "PREPARANDO TU WELCOME PACK...";

    await enviarDatos();

    mostrarPantalla(4);

};

// ======================================
// BOTÓN 4
// ======================================

document.getElementById("btn4").onclick = () => {

    limpiarFormulario();

    mostrarPantalla(1);

    btn3.disabled = false;

    btn3.textContent = "CONTINUAR";

};