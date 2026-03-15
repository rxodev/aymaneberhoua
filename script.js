/* ═══════════════════════════════════════════════
   AYMANE BERHOUA — Personal Website
   script.js
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ─── FLOATING SQUARES BACKGROUND ──────────────── */
  const sqCanvas = document.getElementById("squares-canvas");
  if (sqCanvas) {
    const sqCtx = sqCanvas.getContext("2d");

    function resizeSqCanvas() {
      sqCanvas.width = window.innerWidth;
      sqCanvas.height = window.innerHeight;
    }
    resizeSqCanvas();
    window.addEventListener("resize", resizeSqCanvas, { passive: true });

    const BLUE1 = "rgba(40, 116, 204,";
    const BLUE2 = "rgba(74, 158, 255,";

    // Fewer squares on mobile for performance
    const isMobile = window.innerWidth < 768;
    const SQUARE_COUNT = isMobile ? 14 : 28;

    function makeSquare() {
      return {
        x: Math.random(),
        y: Math.random(),
        size: 14 + Math.random() * 52,
        speedY: 0.00008 + Math.random() * 0.00022,
        driftX: (Math.random() - 0.5) * 0.00012,
        opacity: 0.03 + Math.random() * 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
        filled: Math.random() > 0.5,
        color: Math.random() > 0.5 ? BLUE1 : BLUE2,
      };
    }

    const squares = Array.from({ length: SQUARE_COUNT }, makeSquare);

    let sqLast = 0;
    let animationId;

    function animateSq(ts) {
      const dt = Math.min(ts - sqLast, 50); // cap dt so tab-switch doesn't jump
      sqLast = ts;
      sqCtx.clearRect(0, 0, sqCanvas.width, sqCanvas.height);

      for (const s of squares) {
        s.y -= s.speedY * dt;
        s.x += s.driftX * dt;
        s.rotation += s.rotSpeed;

        // wrap around edges
        if (s.y < -0.12) {
          s.y = 1.12;
          s.x = Math.random();
        }
        if (s.x < -0.12) s.x = 1.12;
        if (s.x > 1.12) s.x = -0.12;

        const cx = s.x * sqCanvas.width;
        const cy = s.y * sqCanvas.height;

        sqCtx.save();
        sqCtx.translate(cx, cy);
        sqCtx.rotate(s.rotation);

        if (s.filled) {
          sqCtx.fillStyle = s.color + s.opacity + ")";
          sqCtx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else {
          sqCtx.strokeStyle = s.color + s.opacity + ")";
          sqCtx.lineWidth = 1;
          sqCtx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
        }

        sqCtx.restore();
      }

      animationId = requestAnimationFrame(animateSq);
    }

    // Pause animation when tab is hidden (saves battery/CPU)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        sqLast = 0;
        animationId = requestAnimationFrame(animateSq);
      }
    });

    animationId = requestAnimationFrame(animateSq);
  }

  /* ─── CUSTOM CURSOR ─────────────────────────── */
  const cursor = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursor-trail");
  let trailX = 0,
    trailY = 0;
  let cursorX = 0,
    cursorY = 0;

  if (cursor && cursorTrail && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
    });

    (function animateTrail() {
      trailX += (cursorX - trailX) * 0.14;
      trailY += (cursorY - trailY) * 0.14;
      cursorTrail.style.left = trailX + "px";
      cursorTrail.style.top = trailY + "px";
      requestAnimationFrame(animateTrail);
    })();

    document
      .querySelectorAll(
        "a, button, .skill-item, .ach-card, .stat-card, .gallery-item, .interest-chip",
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.style.width = "14px";
          cursor.style.height = "14px";
          cursorTrail.style.width = "44px";
          cursorTrail.style.height = "44px";
        });
        el.addEventListener("mouseleave", () => {
          cursor.style.width = "8px";
          cursor.style.height = "8px";
          cursorTrail.style.width = "28px";
          cursorTrail.style.height = "28px";
        });
      });
  } else {
    if (cursor) cursor.style.display = "none";
    if (cursorTrail) cursorTrail.style.display = "none";
  }

  /* ─── NAV SCROLL STATE ──────────────────────── */
  const nav = document.getElementById("nav");

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  /* ─── HAMBURGER / MOBILE NAV ────────────────── */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navBackdrop = document.getElementById("nav-backdrop");

  function openNav() {
    navMenu.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    if (navBackdrop) {
      navBackdrop.classList.add("visible");
    }
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    if (navBackdrop) {
      navBackdrop.classList.remove("visible");
    }
    document.body.style.overflow = "";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.contains("open") ? closeNav() : openNav();
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeNav);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeNav();
      }
    });

    navMenu.addEventListener("click", (e) => e.stopPropagation());
  }

  /* ─── SMOOTH SCROLL ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ─── SCROLL REVEAL ─────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll("[data-reveal]"),
        );
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, index * 90);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.05, rootMargin: "0px" },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => revealObserver.observe(el));

  /* ─── SKILL BARS ─────────────────────────────── */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const width = bar.getAttribute("data-width");
        setTimeout(() => {
          bar.style.width = width + "%";
        }, 200);
        skillObserver.unobserve(bar);
      });
    },
    { threshold: 0.3 },
  );
  document
    .querySelectorAll(".skill-bar-fill[data-width]")
    .forEach((bar) => skillObserver.observe(bar));

  /* ─── ACTIVE NAV LINK ON SCROLL ─────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === `#${id}` ? "var(--accent-light)" : "";
        });
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ─── CERT IMAGE LIGHTBOX ────────────────────── */
  document.querySelectorAll(".cert-img-wrap").forEach((wrap) => {
    wrap.style.cursor = "zoom-in";
    wrap.addEventListener("click", () => {
      const img = wrap.querySelector("img");
      if (!img) return;

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9990;
        background:rgba(7,13,24,0.93);
        display:flex;align-items:center;justify-content:center;
        padding:2rem;cursor:zoom-out;
        animation:fadeIn 0.25s ease;
      `;
      const zImg = document.createElement("img");
      zImg.src = img.src;
      zImg.alt = img.alt;
      zImg.style.cssText = `
        max-width:90vw;max-height:88vh;
        object-fit:contain;border-radius:12px;
        box-shadow:0 0 0 1px rgba(40,116,204,0.3),0 32px 80px rgba(0,0,0,0.7);
      `;
      overlay.appendChild(zImg);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";

      const close = () => {
        overlay.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
      };
      const onKey = (e) => {
        if (e.key === "Escape") close();
      };
      overlay.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
    });
  });

  /* ─── HERO PARALLAX ─────────────────────────── */
  const heroBg = document.querySelector(".hero-grid-overlay");
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      },
      { passive: true },
    );
  }

  /* ─── CONSOLE EASTER EGG ─────────────────────── */
  console.log(
    "%c[AB] Hey, fellow dev!",
    "color:#4a9eff;font-size:16px;font-weight:bold;font-family:monospace;",
  );
  console.log(
    "%cwhile(age++ < life.length) ++knowledge",
    "color:#6b84a8;font-family:monospace;font-size:12px;",
  );
  console.log(
    '%c"You have power over your mind — not outside events." — Marcus Aurelius',
    "color:#a8e6a3;font-family:monospace;font-size:11px;font-style:italic;",
  );
  console.log(
    "%c→ aymane.berhoua@gmail.com",
    "color:#4a9eff;font-family:monospace;font-size:12px;",
  );
});
