document.addEventListener("DOMContentLoaded", function() {

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
})
const whatsappfloat = document.querySelector(".whatsapp")
const qrfloat = document.querySelector(".qrIcon")
const whaText = document.querySelector(".whatsappIconText")
const qrText = document.querySelector(".qrIconText")

whatsappfloat.addEventListener("mouseover", function(){
    whaText.style.display="flex"
})

whatsappfloat.addEventListener("mouseout", function(){
    whaText.style.display="none"
})
qrfloat.addEventListener("mouseover", function(){
    qrText.style.display="flex"
})

qrfloat.addEventListener("mouseout", function(){
    qrText.style.display="none"
})
