// Animation River — the portfolio's motion layer ✦
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => loader?.classList.add("hide"), 1900);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Gentle parallax for the hero atmosphere
  const hero = document.querySelector(".hero");
  const card = document.querySelector(".hero-card");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (hero && y < window.innerHeight * 1.2) {
      hero.style.setProperty("--scroll-y", `${y * 0.12}px`);
      if (card) card.style.translate = `0 ${y * 0.04}px`;
    }
  }, { passive: true });

  // Magnetic buttons/cards
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => el.style.transform = "");
  });

  document.querySelectorAll(".magnetic-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 10;
      const y = ((e.clientY - r.top) / r.height - .5) * -10;
      card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-7px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });

  // Custom cursor
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  function cursorLoop() {
    rx += (mx - rx) * .16;
    ry += (my - ry) * .16;
    if (dot) { dot.style.left = `${mx}px`; dot.style.top = `${my}px`; }
    if (ring) { ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; }
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  document.querySelectorAll("a,button,.skill-card,.project-card").forEach(el => {
    el.addEventListener("mouseenter", () => ring?.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring?.classList.remove("hover"));
  });

  // Respect reduced motion preferences
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => {
      el.style.transition = "none";
      el.classList.add("visible");
    });
  }
});
