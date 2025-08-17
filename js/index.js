document.addEventListener("DOMContentLoaded", () => {
  const surfVideo = document.getElementById('surf-video');
  const playBtn   = document.querySelector('.play-toggle');
  if (!(surfVideo && playBtn)) return;

  playBtn.addEventListener('click', async () => {
    if (surfVideo.paused) {
      try { await surfVideo.play(); playBtn.style.display = 'none'; }
      catch { playBtn.style.display = 'block'; }
    } else {
      surfVideo.pause();
      playBtn.style.display = 'block';
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        surfVideo.play().then(() => playBtn.style.display = 'none')
                        .catch(() => playBtn.style.display = 'block');
      } else {
        surfVideo.pause();
        playBtn.style.display = 'block';
      }
    });
  }, { threshold: 0.5 });

  io.observe(surfVideo);
});




document.addEventListener("DOMContentLoaded", () => {
  const imgElement = $("#imagen-reco");
  const imagenes = ["images/img1.jpeg","images/img2.jpeg","images/img3.jpeg","images/img4.jpeg","images/img5.jpeg","images/img6.jpeg"].filter(Boolean);
  if (!(imgElement && imagenes.length)) return;

  let i = 0;
  imagenes.forEach(src => { const im = new Image(); im.src = src; });

  setInterval(() => {
    i = (i + 1) % imagenes.length;
    imgElement.src = imagenes[i];
    imgElement.alt = "Nosara Adventure image " + (i + 1);
  }, 4000);
});




// Abrir/cerrar modales genéricos y de surf
document.addEventListener("DOMContentLoaded", () => {
  const bodyNoScrollOn = () => document.body.classList.add("no-scroll");
  const bodyNoScrollOff = () => document.body.classList.remove("no-scroll");

  window.openModal = function () {
    const m = document.getElementById("modal");
    if (!m) return;
    m.style.display = "flex";
    m.setAttribute("aria-hidden", "false");
    bodyNoScrollOn();
    m.querySelector(".modal-content")?.setAttribute("tabindex", "-1");
    m.querySelector(".modal-content")?.focus();
  };

  window.closeModal = function () {
    const m = document.getElementById("modal");
    if (!m) return;
    m.style.display = "none";
    m.setAttribute("aria-hidden", "true");
    bodyNoScrollOff();
  };

  window.openSurfModal = function () {
    const m = document.getElementById("surfModal");
    if (!m) return;
    m.style.display = "flex";
    m.setAttribute("aria-hidden", "false");
    bodyNoScrollOn();
    m.querySelector(".modal-content")?.setAttribute("tabindex", "-1");
    m.querySelector(".modal-content")?.focus();
  };

  window.closeSurfModal = function () {
    const m = document.getElementById("surfModal");
    if (!m) return;
    m.style.display = "none";
    m.setAttribute("aria-hidden", "true");
    bodyNoScrollOff();
  };

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { window.closeModal(); window.closeSurfModal(); }
  });

  // Cerrar clic fuera (una sola vez, sin duplicados)
  document.querySelectorAll(".modal").forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) {
        if (m.id === "modal") window.closeModal();
        if (m.id === "surfModal") window.closeSurfModal();
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const track = $("#carousel-track");
  if (!track) return;

  const items = Array.from(track.children);
  if (!items.length) return;

  let currentIndex = 0;
  const visibleCount = 4;
  const moveEveryMs  = 3000;

  const getItemWidth = () => {
    const first = items[0];
    if (!first) return 0;
    const rect = first.getBoundingClientRect();
    return (rect.width || first.offsetWidth || 0) + 20; // si gap=20px
  };

  const moveCarousel = () => {
    if (items.length <= visibleCount) return;
    currentIndex++;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${getItemWidth() * currentIndex}px)`;

    if (currentIndex >= items.length - visibleCount) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        currentIndex = 0;
      }, 600);
    }
  };

  setInterval(moveCarousel, moveEveryMs);
});
