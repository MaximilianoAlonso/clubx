document.addEventListener("DOMContentLoaded", function() {
    function manejarDesplazamiento() {
        let presentacion = document.querySelector(".presentacion");
        let fechasNuevasContainer = document.getElementById("fechasNuevasContainer");
        let ultimasFotos = document.querySelector(".ultimasFotos");
        let footer = document.querySelector("footer");
        let main = document.querySelector(".desplazamientoAltura");

        let paddingBody; // Variable para el paddingBody

        if (window.innerWidth <= 756) { // Modificado para móviles
            // Establecer paddingBody en -2100 para vista móvil
            paddingBody = -2800;
            // Establecer la altura de main en 1200px para vista móvil
            main.style.height = "2500px";
        } else {
            // Si es una pantalla más grande, se mantienen los valores originales
            paddingBody = -1700;
            main.style.height = "2100px";
        }

        // Calculamos la altura total de las secciones y el footer
        let alturaPresentacion = presentacion.offsetHeight;
        let alturaFechas = fechasNuevasContainer.offsetHeight;
        let alturaUltimasFotos = ultimasFotos.offsetHeight;
        let alturaFooter = footer.offsetHeight;
        let alturaTotal = alturaPresentacion + alturaFechas + alturaUltimasFotos + alturaFooter;

        // Calculamos la altura disponible en la ventana del navegador
        let windowHeight = window.innerHeight;

        // Ajustamos el desplazamiento para que las secciones se muevan justo por encima del footer, sin salir de la ventana del navegador,
        // teniendo en cuenta el espacio de relleno superior del cuerpo
        let alturaDesplazamiento = alturaTotal - windowHeight + paddingBody;

        // Verificamos si el desplazamiento es negativo y lo ajustamos a cero si es necesario para evitar que las secciones se desplacen fuera de la ventana del navegador
        alturaDesplazamiento = Math.max(alturaDesplazamiento, 0);

        // Aplicamos el desplazamiento a ambas secciones
        presentacion.style.opacity = "0";
        presentacion.style.transition = "opacity 1s ease-out";
        fechasNuevasContainer.style.transform = `translateY(-${alturaDesplazamiento}px)`;
        fechasNuevasContainer.style.transition = "transform 1s ease-out";
        ultimasFotos.style.transform = `translateY(-${alturaDesplazamiento}px)`;
        ultimasFotos.style.transition = "transform 1s ease-out";
        main.style.transition = "transform 1s ease-out";
    }

    document.addEventListener("scroll", manejarDesplazamiento);
    document.addEventListener("touchmove", manejarDesplazamiento);

    function maquina(contenedor, texto, intervalo) {
        var longitud = texto.length;
        var tagHtml = document.getElementById(contenedor);
        tagHtml.innerHTML = "";
        var i = 0;
        var timer = setInterval(function() {
            tagHtml.innerHTML += texto.charAt(i);
            i++;
            if (i == longitud) {
                clearInterval(timer);
                manejarDesplazamiento(); // Desplaza las secciones una vez finalizada la escritura
            }
        }, intervalo);
    }

    // Ejemplo de uso
    maquina("typer", "Welcome to CLUB X, we present to you the astronauts who descuber new sounds from diferents planets and came to earth to conquer the electronic music. We call them aliens....", 1);
});
