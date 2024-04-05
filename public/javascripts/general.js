const menu = document.querySelector("header ul")
const bars = document.querySelector(".barsMenu")
bars.addEventListener("click", function(){
    menu.classList.toggle("verMenu")
})

document.addEventListener("scroll", function(){
    menu.style.display="none"
})


document.addEventListener("scroll", function(){
    if (window.innerWidth > 100) { // Verifica si el ancho de la ventana es mayor a 800px
       
}
});