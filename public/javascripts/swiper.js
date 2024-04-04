        var swiper = new Swiper(".mySwiper", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 5000, // Intervalo de tiempo entre cada slide (en milisegundos)
            },
            loop: true,
        });