
document.addEventListener("DOMContentLoaded", () => {
  // === FORMULARIO (Solo si existe) ===
  const form = document.getElementById("booking-form");
  const submitBtn = document.getElementById("submit-btn");
  const termsCheckbox = document.getElementById("terms");
  const confirmationMessage = document.getElementById("confirmation-message");

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


  
// === MENÚ HAMBURGUESA CON OVERLAY ===
const hamburgerBtn = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".overlay");

function toggleMenu() {
  navLinks.classList.toggle("show");
  overlay.classList.toggle("show");
  document.body.classList.toggle("no-scroll");
}

function closeMenu() {
  navLinks.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

if (hamburgerBtn && navLinks && overlay) {
  // Abrir / cerrar al hacer clic en hamburguesa
  hamburgerBtn.addEventListener("click", toggleMenu);

  // Cerrar al hacer clic en un enlace del menú y redirigir con delay
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Previene la redirección inmediata
      const href = link.getAttribute("href");
      closeMenu(); // Cierra visualmente
      setTimeout(() => {
        window.location.href = href; // Redirige después del cierre
      }, 300); // Tiempo para transición visual
    });
  });

  // Cerrar al hacer clic en el fondo oscuro
  overlay.addEventListener("click", closeMenu);
}


function toggleMenu() {
  navLinks.classList.toggle("show");
  overlay.classList.toggle("show");
  document.body.classList.toggle("no-scroll");
}

function closeMenu() {
  navLinks.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

if (hamburgerBtn && navLinks && overlay) {
  // Abrir / cerrar al hacer clic en hamburguesa
  hamburgerBtn.addEventListener("click", toggleMenu);

  // Cerrar al hacer clic en un enlace del menú
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Cerrar al hacer clic en el fondo oscuro
  overlay.addEventListener("click", closeMenu);
}

  const imagenes = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg"];
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
