const menuButton = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-nav');

if (menuButton && mainNavigation) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    menuButton.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
    mainNavigation.classList.toggle('is-open', !isExpanded);
  });

  mainNavigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      mainNavigation.classList.remove('is-open');
    }
  });
}

const carousel = document.querySelector('.carousel');

if (carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dot')];
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  carousel.querySelector('.carousel-prev')?.addEventListener('click', () => showSlide(activeIndex - 1));
  carousel.querySelector('.carousel-next')?.addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  showSlide(0);
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});