
document.addEventListener("DOMContentLoaded", () => {
  // === FORMULARIO (Solo si existe) ===
  const form = document.getElementById("booking-form");
  const submitBtn = document.getElementById("submit-btn");
  const termsCheckbox = document.getElementById("terms");
  const confirmationMessage = document.getElementById("confirmation-message");
  // === ANIMACIÓN AL SCROLLEAR ===
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Si quieres que solo se ejecute una vez:
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2 // porcentaje del elemento visible antes de activar la animación
  });

  fadeElements.forEach(el => observer.observe(el));


  if (form && submitBtn && termsCheckbox && confirmationMessage) {
    const requiredFields = ["first-name", "email", "phone", "quantity", "terms"];

    // Activar o desactivar botón
    termsCheckbox.addEventListener("change", () => {
      submitBtn.disabled = !termsCheckbox.checked;
    });

    // Enviar formulario
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let valid = true;
      requiredFields.forEach((id) => {
        const field = document.getElementById(id);
        if ((field.type === "checkbox" && !field.checked) || (field.type !== "checkbox" && !field.value.trim())) {
          field.style.border = "2px solid red";
          valid = false;
        } else {
          field.style.border = "";
        }
      });

      if (!valid) {
        alert("Please complete all required fields marked with *.");
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          form.style.display = "none";
          confirmationMessage.style.display = "block";
        } else {
          alert("There was an error submitting the form. Please try again.");
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    });
  }


  


// === MENÚ HAMBURGUESA ===
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  console.log("✅ Clic en el botón hamburguesa");

  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  overlay.classList.toggle("show");
  document.body.classList.toggle("no-scroll");

  // ✅ Actualiza el atributo aria-expanded para accesibilidad
  hamburger.setAttribute("aria-expanded", hamburger.classList.contains("open"));
});

overlay.addEventListener("click", () => {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");

  // ✅ Cierra el estado accesible también
  hamburger.setAttribute("aria-expanded", "false");
});



  const imagenes = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg", "img6.jpeg"];
  let indice = 0;
  const imgElement = document.getElementById("imagen-reco");

  setInterval(() => {
    indice = (indice + 1) % imagenes.length;
    imgElement.src = imagenes[indice];
  }, 4000);

  // === FLATPICKR ===
  if (typeof flatpickr !== "undefined") {
    flatpickr("#pickup-date", {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "F j, Y"
    });

    flatpickr("#return-date", {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "F j, Y"
    });
  }

  // === MODAL ===
  window.openModal = function () {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  };

  window.closeModal = function () {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  };

  // === CAROUSEL ===
  const track = document.getElementById("carousel-track");

  if (track) {
    const images = Array.from(track.children);
    let currentIndex = 0;
    const visibleCount = 4;
    const moveEveryMs = 3000;
    const imageWidth = images[0].getBoundingClientRect().width + 20;

    function moveCarousel() {
      currentIndex++;
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateX(-${imageWidth * currentIndex}px)`;

      if (currentIndex === images.length - visibleCount) {
        setTimeout(() => {
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
          currentIndex = 0;
        }, 600);
      }
    }

    setInterval(moveCarousel, moveEveryMs);
  }

});