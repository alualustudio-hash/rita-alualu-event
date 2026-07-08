// ======================================
// ALÚ ALÚ x RITA MILLER
// SCRIPT PRINCIPAL
// ======================================


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

const accesoSorteo = document.getElementById("accesoSorteo");
const btnSorteo = document.getElementById("btnSorteo");
const btnVolver = document.getElementById("btnVolver");

const URL_GOOGLE =
"https://script.google.com/macros/s/AKfycbxxW451N_XmUtm1OG0BKQSJOzkPcjCCWvS1IrAg3wTcwQ3HMKH8QRNDQbeHK9XWw2z-/exec";


// ======================================
// FUNCIONES GENERALES
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


// Limpiar formulario

function limpiarFormulario(){

    nombre.value = "";
    email.value = "";
    instagram.value = "";

    consentimiento.checked = false;

    error.textContent = "";

}


// ======================================
// ENVIAR PARTICIPACIÓN A GOOGLE SHEETS
// ======================================

async function enviarDatos(){

    const datos = {

        nombre: nombre.value,
        email: email.value,
        instagram: instagram.value,
        consentimiento: consentimiento.checked ? "Sí" : "No"

    };

    const respuesta = await fetch(

        URL_GOOGLE,

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

btn3.onclick = async () => {

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


// ======================================
// ACCESO SECRETO AL SORTEO
// ======================================

let temporizadorSorteo;


function iniciarAccesoSorteo(){

    temporizadorSorteo = setTimeout(() => {

        mostrarPantalla(5);

    }, 4000);

}


function cancelarAccesoSorteo(){

    clearTimeout(temporizadorSorteo);

}


// Ordenador

accesoSorteo.addEventListener(
    "mousedown",
    iniciarAccesoSorteo
);

accesoSorteo.addEventListener(
    "mouseup",
    cancelarAccesoSorteo
);

accesoSorteo.addEventListener(
    "mouseleave",
    cancelarAccesoSorteo
);


// Tablet

accesoSorteo.addEventListener("touchstart", (event) => {

    event.preventDefault();

    iniciarAccesoSorteo();

}, { passive: false });


accesoSorteo.addEventListener("touchend", (event) => {

    event.preventDefault();

    cancelarAccesoSorteo();

}, { passive: false });


accesoSorteo.addEventListener("touchcancel", (event) => {

    event.preventDefault();

    cancelarAccesoSorteo();

}, { passive: false });


// ======================================
// BOTÓN VOLVER
// ======================================

btnVolver.onclick = () => {

    mostrarPantalla(1);

};


// ======================================
// REALIZAR SORTEO
// ======================================

btnSorteo.onclick = async () => {

    // Evitar dobles pulsaciones

    btnSorteo.disabled = true;

    btnSorteo.textContent = "PREPARANDO SORTEO...";


    // Pedir ganador a Google Sheets

    const respuesta = await fetch(

        URL_GOOGLE,

        {

            method: "POST",

            body: JSON.stringify({

                accion: "sortear"

            })

        }

    );


    const ganador = await respuesta.json();


    // Comprobar errores

    if(ganador.error){

        btnSorteo.disabled = false;

        btnSorteo.textContent = ganador.error;

        return;

    }


    // Crear zona visual del sorteo

    const pantallaSorteo =
        document.getElementById("pantalla5");


    btnSorteo.style.display = "none";

    btnVolver.style.display = "none";


    const descripcion =
        pantallaSorteo.querySelector(".descripcion");

    descripcion.textContent =
        "Y LA PERSONA GANADORA ES";


    const titulo =
        pantallaSorteo.querySelector("h1");

    titulo.textContent = "";


    // Crear número animado

    const numeroSorteo =
        document.createElement("div");

    numeroSorteo.className = "numero";

    numeroSorteo.textContent = "001";


    // Crear nombre ganador

    const nombreGanador =
        document.createElement("p");

    nombreGanador.className = "mensaje";

    nombreGanador.textContent = "";


    pantallaSorteo.appendChild(numeroSorteo);

    pantallaSorteo.appendChild(nombreGanador);


    // ======================================
    // ANIMACIÓN DE NÚMEROS
    // ======================================

    let velocidad = 60;

    let cambios = 0;

    const maxCambios = 35;


    function cambiarNumero(){

        cambios++;


        // Número visual aleatorio

        const numeroAleatorio =
            Math.floor(Math.random() * ganador.totalParticipantes) + 1;


        numeroSorteo.textContent =
            numeroAleatorio
                .toString()
                .padStart(3, "0");


        // Ralentizar progresivamente

        velocidad += 12;


        if(cambios < maxCambios){

            setTimeout(
                cambiarNumero,
                velocidad
            );

        }

        else{

            // Mostrar ganador real

            numeroSorteo.textContent =
                ganador.numero
                    .toString()
                    .padStart(3, "0");


            // Mostrar nombre un poco después

            setTimeout(() => {

                nombreGanador.textContent =
                    ganador.nombre;

            }, 700);

        }

    }


    cambiarNumero();

};