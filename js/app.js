//####VARIABLES####
const enviarBtn = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Variables para campos.
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    //Inicia la app
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //Campos del formulario
    email.addEventListener("blur", validateForm);
    asunto.addEventListener("blur", validateForm);
    mensaje.addEventListener("blur", validateForm);
    //Enviar formulario.
    enviarBtn.addEventListener("click", enviarMensaje);
    //Reiniciar el formulario
    resetBtn.addEventListener("click", limpiaForm);
}
//####FUNCIONES####

//Se ejecuta al cargar la pagina
function iniciarApp() {
    enviarBtn.disabled = true;
    enviarBtn.classList.add("cursor-not-allowed", "opacity-50");
}

//validar formulario.
function validateForm(e) {
    if (e.target.value.length > 0) {
        //Elimina los errores
        const error = document.querySelector("p.error");
        if (error) {
            error.remove();
        }

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios");
    }

    if (e.target.type === "email") {
        if (er.test(e.target.value)) {
            const error = document.querySelector("p.error");
            if (error) {
                error.remove();
            }

            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
        } else {
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");
            mostrarError("Email no valido.");
        }
    }

    if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
        enviarBtn.disabled = false;
        enviarBtn.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        "border",
        "border-red-500",
        "background-red-100",
        "text-red-500",
        "p-3",
        "mt-5",
        "text-center",
        "error"
    );
    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}
// Envía el email.
function enviarMensaje(e) {
    e.preventDefault();
    //Mostrar spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";
    setTimeout(() => {
        spinner.style.display = "none";

        //Mensaje de exito.
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje fue enviado correctamente.";
        parrafo.classList.add(
            "text-center",
            "my-10",
            "p-2",
            "bg-green-500",
            "text-white",
            "font-bold"
        );
        //Toma el padre (formulario) y lo inserta despues del spinner.
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //Elimina el mensaje de exito despues de 5 segundos.
            formulario.reset();
        }, 5000);
    }, 3000);
}

//Limpia el formulario.
function limpiaForm(e) {
    e.preventDefault();
    formulario.reset();
    const inputs = document.querySelectorAll(".inputs");
    inputs.forEach((element) => {
        element.classList.remove(
            "border",
            "border-green-500",
            "border-red-500"
        );
    });
    iniciarApp();
}
