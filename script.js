// year
document.getElementById("year").textContent = new Date().getFullYear();

// toast
function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(window.__t);
  window.__t = setTimeout(() => (el.style.opacity = "0"), 2200);
}
window.toast = toast;

// mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("[data-nav]");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-in");
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// active nav link
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

const io2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute("id");
    links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
  });
}, { threshold: 0.5 });

sections.forEach(s => io2.observe(s));

// Auto-sliding Carousel
const carouselSlides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

if (carouselSlides.length > 0) {
  let currentSlide = 0;
  const totalSlides = carouselSlides.length;
  let autoSlideInterval;

  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    // Add active class to current
    carouselSlides[index].classList.add('active');
    indicators[index].classList.add('active');
  }

  // Function to go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Auto-slide every 3 seconds
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  // Stop auto-slide
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Click on indicators to manually change slide
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      
      // Restart auto-slide after manual click
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // Start the auto-slide on page load
  startAutoSlide();

  // Optional: Pause auto-slide when user hovers over carousel
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }
}