console.log('[nav-mobile] cargado');

document.addEventListener('DOMContentLoaded', () => {
  // ====== Elementos
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu       = document.getElementById('mobile-menu');
  const mobileOverlay    = document.getElementById('mobile-overlay');
  const dropdownButton   = document.getElementById('mobile-dropdown-button');
  const dropdownMenu     = document.getElementById('mobile-dropdown-menu');

  // Validación básica
  if (!mobileMenuButton || !mobileMenu || !mobileOverlay) {
    console.warn('[nav-mobile] Faltan elementos clave', {
      btn: !!mobileMenuButton, menu: !!mobileMenu, overlay: !!mobileOverlay
    });
    return;
  }

  let isMenuOpen = false;
  let isDropdownOpen = false;

  // ====== Única fuente de verdad del estado
  const setMenuState = (open, dropdownOpen = false) => {
    isMenuOpen = !!open;
    isDropdownOpen = !!dropdownOpen;

    // Menú principal
    mobileMenuButton.classList.toggle('open', isMenuOpen);
    mobileMenu.classList.toggle('open', isMenuOpen);
    mobileOverlay.classList.toggle('show', isMenuOpen);

    mobileMenuButton.setAttribute('aria-expanded', String(isMenuOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isMenuOpen));
    mobileOverlay.setAttribute('aria-hidden', String(!isMenuOpen));

    // Dropdown (si existe)
    if (dropdownButton && dropdownMenu) {
      dropdownButton.classList.toggle('open', isDropdownOpen);
      dropdownMenu.classList.toggle('open', isDropdownOpen);
      dropdownButton.setAttribute('aria-expanded', String(isDropdownOpen));
      dropdownMenu.setAttribute('aria-hidden', String(!isDropdownOpen));
    }

    // Scroll del body con clase
    document.body.classList.toggle('no-scroll', isMenuOpen);
  };

  const toggleMobileMenu = () => setMenuState(!isMenuOpen, false);
  const toggleDropdown   = () => setMenuState(isMenuOpen, !isDropdownOpen);
  const closeMobileMenu  = () => setMenuState(false, false);

  // ====== Listeners
  mobileMenuButton.addEventListener('click', toggleMobileMenu);

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Cerrar al hacer clic en enlaces del menú
  document.querySelectorAll('.menu-item, .submenu-item').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) closeMobileMenu();
  });

  // Cerrar si se ensancha la pantalla
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1048 && isMenuOpen) closeMobileMenu();
  });

  // Evitar que clics dentro del panel se “propaguen” al overlay
  mobileMenu.addEventListener('click', (e) => e.stopPropagation());

  // ====== Inicializar cerrado y accesible
  setMenuState(false, false);
});
