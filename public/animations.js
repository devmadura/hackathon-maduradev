/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SEMESTA 8 — GSAP Animations
   gsap and ScrollTrigger are loaded via CDN <script> tags
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

(function () {
  "use strict";

  const { gsap } = window;
  const { ScrollTrigger } = window;

  gsap.registerPlugin(ScrollTrigger);

  // ── Reduced motion: disable all animations ──
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.timeScale(0);
  }

  // ── 1. Navbar — hide on scroll down, show on scroll up ──
  const navbar = document.querySelector("#navbar");
  let lastY = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > lastY && y > 80) {
      gsap.to(navbar, { y: -80, duration: 0.3, ease: "power2.in" });
    } else {
      gsap.to(navbar, { y: 0, duration: 0.3, ease: "power2.out" });
    }

    lastY = y;

    navbar?.classList.toggle("border-b-dark-border", y > 20);
  });

  // ── 2. Hero — stagger entrance on load ──
  gsap.timeline({ delay: 0.2 })
    .from("#hero-badge", { opacity: 0, y: 20, duration: 0.5 })
    .from("#hero-title", { opacity: 0, y: 40, duration: 0.7, ease: "power3.out" }, "-=0.2")
    .from("#hero-sub", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
    .from("#hero-tagline", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from("#hero-countdown", { opacity: 0, scale: 0.95, duration: 0.6 }, "-=0.2")
    .from("#hero-ctas", { opacity: 0, y: 16, duration: 0.5 }, "-=0.2")
    .from("#hero-scroll", { opacity: 0, duration: 0.4 });

  // ── 3. Scroll reveal — all [data-reveal] elements ──
  const reveals = document.querySelectorAll("[data-reveal]");

  reveals.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: el.dataset.reveal === "up" ? 40 : 0,
      x: el.dataset.reveal === "left" ? -40 : el.dataset.reveal === "right" ? 40 : 0,
      duration: 0.7,
      ease: "power2.out",
    });
  });

  // ── 4. Timeline — alternating left/right entrance ──
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
      },
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      duration: 0.6,
      delay: i * 0.05,
      ease: "power2.out",
    });
  });

  // ── 5. Prize cards — stagger from center ──
  gsap.from(".prize-card", {
    scrollTrigger: {
      trigger: "#prizes",
      start: "top 80%",
    },
    opacity: 0,
    y: 60,
    stagger: {
      amount: 0.4,
      from: "center",
    },
    duration: 0.7,
    ease: "back.out(1.4)",
  });

  // ── 6. Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
