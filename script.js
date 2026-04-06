/* ═══════════════════════════════════════════════
   AYMANE BERHOUA — Portfolio v4
   script.js
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ─── THEME ──────────────────────────────── */
  const root = document.documentElement;
  const STORAGE_KEY = "ab-theme";

  function getTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function setTheme(t) {
    if (t === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE_KEY, t);
    updateThemeIcons(t);
  }

  function updateThemeIcons(t) {
    const moonSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    const sunSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const icon = t === "light" ? moonSVG : sunSVG;
    const label =
      t === "light" ? "Switch to dark mode" : "Switch to light mode";
    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.innerHTML = icon;
      btn.setAttribute("aria-label", label);
    });
    const mobileLabel = document.getElementById("theme-mobile-label");
    if (mobileLabel)
      mobileLabel.textContent = t === "light" ? "Dark mode" : "Light mode";
  }

  // Load saved theme (flash prevention is in <head>)
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved === "light" ? "light" : "dark";
  setTheme(initial);

  document.querySelectorAll(".theme-btn, .theme-btn-mobile").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  });

  /* ─── TYPING INTRO ───────────────────────── */
  const line1El = document.getElementById("type-line1");
  const line2El = document.getElementById("type-line2");
  const cursorEl = document.getElementById("type-cursor");

  if (line1El && line2El && cursorEl) {
    const word1 = "Aymane";
    const word2 = "Berhoua.";
    const SPEED = 80; // ms per character
    const PAUSE = 320; // ms pause between lines

    function typeText(el, text, speed, done) {
      let i = 0;
      const iv = setInterval(() => {
        el.textContent += text[i++];
        if (i === text.length) {
          clearInterval(iv);
          done && done();
        }
      }, speed);
    }

    // slight delay so page has settled
    setTimeout(() => {
      typeText(line1El, word1, SPEED, () => {
        setTimeout(() => {
          typeText(line2El, word2, SPEED, () => {
            // hide cursor after a beat, start role typewriter, then fade in hero content
            setTimeout(() => {
              cursorEl.classList.add("hidden");

              // start role typewriter
              const roleEl = document.getElementById("hero-role");
              const hrText = document.getElementById("hr-text");
              if (roleEl && hrText) {
                roleEl.classList.add("visible");
                const roles = [
                  "hackathon_winner",
                  "aspiring_polymath",
                  "python_developer",
                  "cs50_student",
                  "game_dev_enthusiast",
                  "science_club_president",
                  "stoic_builder",
                  "vibe_coder",
                ];
                let ri = 0,
                  ci = 0,
                  deleting = false;
                function roleLoop() {
                  const word = roles[ri];
                  if (!deleting) {
                    hrText.textContent = word.slice(0, ++ci);
                    if (ci === word.length) {
                      deleting = true;
                      setTimeout(roleLoop, 1600);
                      return;
                    }
                  } else {
                    hrText.textContent = word.slice(0, --ci);
                    if (ci === 0) {
                      deleting = false;
                      ri = (ri + 1) % roles.length;
                    }
                  }
                  setTimeout(roleLoop, deleting ? 40 : 75);
                }
                setTimeout(roleLoop, 200);
              }

              // fade in rest of hero
              ["hero-desc", "hero-actions"].forEach((cls, i) => {
                setTimeout(() => {
                  document.querySelector("." + cls)?.classList.add("visible");
                }, i * 120);
              });
            }, 500);
          });
        }, PAUSE);
      });
    }, 200);
  }

  const progressBar = document.getElementById("progress");
  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width =
          (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
      },
      { passive: true },
    );
  }

  /* ─── MOBILE NAV ─────────────────────────── */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileBackdrop");

  function openMenu() {
    mobileMenu.classList.add("open");
    backdrop.classList.add("open");
    navToggle.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    backdrop.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
    backdrop?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open"))
        closeMenu();
    });
  }

  /* ─── SMOOTH SCROLL ──────────────────────── */
  const nav = document.querySelector("nav");
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset - 24,
        behavior: "smooth",
      });
    });
  });

  /* ─── SCROLL REVEAL ──────────────────────── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll("[data-r]"),
        );
        const i = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        revealObs.unobserve(entry.target);
      });
    },
    { threshold: 0.07 },
  );

  document.querySelectorAll("[data-r]").forEach((el) => revealObs.observe(el));

  /* ─── SKILL BARS ─────────────────────────── */
  const skillObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".skill-fill[data-w]").forEach((bar) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.w + "%";
          }, 200);
        });
        skillObs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  document
    .querySelectorAll(".skills-grid")
    .forEach((el) => skillObs.observe(el));

  /* ─── ACTIVE NAV LINK ────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const activeObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((l) => {
          l.style.color =
            l.getAttribute("href") === `#${id}` ? "var(--fg)" : "";
        });
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => activeObs.observe(s));

  /* ─── CERT LIGHTBOX ──────────────────────── */
  document.querySelectorAll(".ach-cert").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.cssText = [
        "position:fixed",
        "inset:0",
        "z-index:9990",
        "background:rgba(0,0,0,0.88)",
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "padding:2rem",
        "cursor:zoom-out",
        "animation:fadein .2s ease",
      ].join(";");
      const zi = document.createElement("img");
      zi.src = img.src;
      zi.alt = img.alt;
      zi.style.cssText = [
        "max-width:90vw",
        "max-height:88vh",
        "object-fit:contain",
        "border-radius:3px",
      ].join(";");
      overlay.appendChild(zi);
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

  /* ─── CONSOLE EASTER EGG ─────────────────── */
  console.log(
    "%cAymane Berhoua — Developer in Progress",
    "color:#5b8cff;font-family:monospace;font-size:14px;font-weight:bold",
  );
  console.log(
    "%c~ $ whoami\naymane_berhoua · hackathon_winner · cs50_student · stoic_builder\n~ $ cat philosophy.py\nwhile(age++ < life.length) ++knowledge;",
    "color:#4ade80;font-family:monospace;font-size:12px",
  );
  console.log(
    "%cIf you're reading this — you're exactly the kind of person I want to connect with. 👋",
    "color:#fbbf24;font-family:monospace;font-size:11px",
  );
});
