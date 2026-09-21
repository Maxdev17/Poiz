// ================================
//   POIZ IMAGING — MAIN JS
//   Lenis + GSAP + ScrollTrigger
//   VagabondCode | Maxwell Idowu
// ================================

// --- LENIS SMOOTH SCROLL ---
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- GSAP REGISTER ---
gsap.registerPlugin(ScrollTrigger);

// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", () => ScrollTrigger.update());
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- CUSTOM CURSOR ---
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

if (cursor && follower) {
  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll(
    "a, button, .gallery-item, .service-card, .filter-btn, .testimonial-card",
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("expand");
      follower.classList.add("expand");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("expand");
      follower.classList.remove("expand");
    });
  });
}

// --- NAVBAR SCROLL ---
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// --- HAMBURGER / MOBILE NAV ---
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    document.body.style.overflow = mobileNav.classList.contains("open")
      ? "hidden"
      : "";
  });
}

function closeMobileNav() {
  if (hamburger) hamburger.classList.remove("open");
  if (mobileNav) mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

// --- ACTIVE NAV LINK ---
const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  link.classList.remove("active");
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// --- HERO ANIMATIONS ---
const heroTitle = document.getElementById("heroTitle");
if (heroTitle) {
  gsap.from(heroTitle, {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.3,
  });
}

gsap.from(".hero-eyebrow", {
  opacity: 0,
  x: -30,
  duration: 1,
  ease: "power3.out",
  delay: 0.1,
});

gsap.from(".hero-desc", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power3.out",
  delay: 0.7,
});

gsap.from(".hero-actions", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power3.out",
  delay: 0.95,
});

gsap.from(".hero-scroll-hint", {
  opacity: 0,
  duration: 1.5,
  delay: 1.8,
  ease: "power2.out",
});

const heroBgImg = document.getElementById("heroBgImg");
if (heroBgImg) {
  gsap.to(heroBgImg, { scale: 1.08, duration: 12, ease: "none" });
}

// --- SCROLL REVEAL ---
gsap.utils.toArray(".reveal").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
      once: true,
    },
    opacity: 0,
    y: 50,
    duration: 0.9,
    ease: "power3.out",
    delay: i * 0.04,
  });
});

gsap.utils.toArray(".reveal-left").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      once: true,
    },
    opacity: 0,
    x: -60,
    duration: 1.1,
    ease: "power3.out",
  });
});

gsap.utils.toArray(".reveal-right").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      once: true,
    },
    opacity: 0,
    x: 60,
    duration: 1.1,
    ease: "power3.out",
  });
});

gsap.utils.toArray(".reveal-scale").forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
      once: true,
    },
    opacity: 0,
    scale: 0.88,
    duration: 0.9,
    ease: "power3.out",
    delay: i * 0.1,
  });
});

// --- SERVICE CARDS STAGGER ---
const serviceCards = gsap.utils.toArray(".service-card");
if (serviceCards.length) {
  gsap.from(serviceCards, {
    scrollTrigger: {
      trigger: ".services-grid",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.12,
  });
}

// --- SERVICE CARD IMAGE HOVER ---
document.querySelectorAll(".service-card").forEach((card) => {
  const img = card.querySelector("img");
  if (!img) return;
  card.addEventListener("mouseenter", () => {
    gsap.to(img, { scale: 1.07, duration: 0.6, ease: "power2.out" });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
  });
});

// --- TESTIMONIAL CARDS STAGGER ---
const testimonialCards = gsap.utils.toArray(".testimonial-card");
if (testimonialCards.length) {
  gsap.from(testimonialCards, {
    scrollTrigger: {
      trigger: ".testimonials-wrap",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
  });
}

// --- ABOUT PARALLAX ---
const aboutImg = document.querySelector(".about-img-main");
if (aboutImg) {
  gsap.to(aboutImg, {
    scrollTrigger: {
      trigger: ".about-img-wrap",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
    y: -40,
    ease: "none",
  });
}

// --- GOLD LINE ANIMATE ---
gsap.utils.toArray(".gold-line").forEach((line) => {
  gsap.from(line, {
    scrollTrigger: {
      trigger: line,
      start: "top 90%",
      once: true,
    },
    scaleX: 0,
    transformOrigin: "left center",
    duration: 0.8,
    ease: "power3.out",
  });
});

// ================================
//   GALLERY PAGE
// ================================
const galleryGrid = document.querySelector(".gallery-grid");

if (galleryGrid) {
  const galleryItems = gsap.utils.toArray(".gallery-item");

  galleryItems.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
      opacity: 0,
      y: 40,
      scale: 0.94,
      duration: 0.7,
      ease: "power3.out",
      delay: (i % 3) * 0.1,
    });
  });

  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  const allItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      allItems.forEach((item) => {
        const category = item.dataset.category;
        const show = filter === "all" || category === filter;

        if (show) {
          item.style.display = "block";
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.92,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              item.style.display = "none";
            },
          });
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxCounter = document.getElementById("lightboxCounter");

  let currentIndex = 0;
  const images = [...allItems].map((item) => ({
    src: item.querySelector("img").src,
    label: item.dataset.category || "",
  }));

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lenis.stop();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lenis.start();
  }

  allItems.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      gsap.from(lightboxImg, { opacity: 0, x: -30, duration: 0.3 });
      lightboxImg.src = images[currentIndex].src;
      lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      gsap.from(lightboxImg, { opacity: 0, x: 30, duration: 0.3 });
      lightboxImg.src = images[currentIndex].src;
      lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxPrev?.click();
    if (e.key === "ArrowRight") lightboxNext?.click();
  });
}

// --- CONTACT FORM ---
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const service = document.getElementById("service")?.value;
    const date = document.getElementById("date")?.value;
    const message = document.getElementById("message")?.value.trim();

    if (!name || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    const dateText = date ? `%0APreferred Date: ${date}` : "";
    const waMessage = `Hello Poiz Imaging Photo Studio 📸%0A%0AMy name is *${name}*%0APhone: ${phone}%0AService: ${service}${dateText}%0A%0A${message || "I would like to book a session."}`;
    window.open(`https://wa.me/2349134847773?text=${waMessage}`, "_blank");
  });
}

// --- FALLBACK VISIBILITY ---
window.addEventListener("load", () => {
  setTimeout(() => {
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
  }, 2000);
});
