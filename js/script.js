// OPTIMIZACIÓN DE PERFORMANCE
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ANIMACIONES AL HACER SCROLL (Scroll Reveal)
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".card, .sector-card, .trust-item")
    .forEach((el) => {
      observer.observe(el);
    });
}

// TOOLTIP PARA BOTÓN FLOTANTE
const setupWhatsAppFloat = () => {
  const whatsappFloat = document.querySelector(".whatsapp-float");
  if (!whatsappFloat) return;

  whatsappFloat.addEventListener("mouseenter", () => {
    if (!isMobile && !prefersReducedMotion) {
      whatsappFloat.style.transform = "scale(1.15) rotate(10deg)";
    }
  });

  whatsappFloat.addEventListener("mouseleave", () => {
    whatsappFloat.style.transform = "scale(1) rotate(0deg)";
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupWhatsAppFloat);
} else {
  setupWhatsAppFloat();
}

// SMOOTH SCROLL PARA ENLACES INTERNOS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ANIMACIÓN DE BOTONES AL HACER CLICK
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Crear efecto ripple
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// CONTADOR SIMPLE PARA ESTADÍSTICAS (BONUS)
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};

// LAZY LOADING DE IMÁGENES (BONUS)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("✓ Landing page Radiocoes lista con animaciones pro");
