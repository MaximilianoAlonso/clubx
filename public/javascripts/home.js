
function manejarDesplazamiento() {
    if (window.innerWidth > 100) { // Verifica si el ancho de la ventana es mayor a 800px
        let video = document.querySelector('.videoContainer');
        video.classList.add("aparecerVideo");
        let presentacion = document.querySelector(".presentacion");
        presentacion.classList.add("desaparecerPresentacion");
    }
}

document.addEventListener("scroll", manejarDesplazamiento);
document.addEventListener("touchmove", manejarDesplazamiento);

function maquina(contenedor, texto, intervalo) {
    var longitud = texto.length;
    var tagHtml = document.getElementById(contenedor);
    tagHtml.innerHTML = "";
    var i = 0;
    var timer = setInterval(function () {
        tagHtml.innerHTML += texto.charAt(i);
        i++;
        if (i == longitud) {
            clearInterval(timer);
            let video = document.querySelector('.videoContainer');
            video.classList.add("aparecerVideo");
            let presentacion = document.querySelector(".presentacion");
            presentacion.classList.add("desaparecerPresentacion");
        }
    }, intervalo);
}

// Ejemplo de uso
maquina("typer", "Welcome to CLUB X, we present to you the astronauts who descuber new sounds from diferents planets and came to earth to conquer the electronic music. We call them aliens....", 80);

