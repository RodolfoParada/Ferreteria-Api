
window.initializeCarousel = function () {

    const slidesContainer = document.querySelector(".slides-container");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (!slidesContainer || !slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    // 1. Variable para el ID del intervalo
    let autoScrollInterval;
    // El tiempo en milisegundos (0.5 segundos = 500ms)
    const SCROLL_DELAY = 3000; 

    function updateCarousel() {
        slidesContainer.style.transform =
            `translateX(-${currentIndex * (100 / totalSlides)}%)`;
    }
    
    // Función de avance automático
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // 2. Función para iniciar el avance automático
    function startAutoScroll() {
        // Asegura que no haya otro intervalo corriendo
        stopAutoScroll(); 
        autoScrollInterval = setInterval(nextSlide, SCROLL_DELAY);
    }
    
    // 3. Función para detener el avance automático
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // --- Manejadores de Eventos Manuales ---

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Detiene y reinicia el auto-scroll en interacción manual
        stopAutoScroll(); 
        nextSlide();
        startAutoScroll(); // Vuelve a iniciar después del clic
    });

    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Detiene y reinicia el auto-scroll en interacción manual
        stopAutoScroll(); 
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        startAutoScroll(); // Vuelve a iniciar después del clic
    });
    
    // 4. Iniciar el carrusel y el avance automático
    updateCarousel();
    startAutoScroll();
    
    // Opcional: Pausar el carrusel al pasar el ratón por encima (UX mejorada)
    slidesContainer.addEventListener('mouseenter', stopAutoScroll);
    slidesContainer.addEventListener('mouseleave', startAutoScroll);
};