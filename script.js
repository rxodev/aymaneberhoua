/* ═══════════════════════════════════════════════
   AYMANE BERHOUA — Personal Website v3
   script.js — full unified script
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ═══════════════════════════════════════════
     BOOT SCREEN
  ═══════════════════════════════════════════ */
  const bootEl = document.getElementById("boot-screen");
  if (bootEl) {
    const lines = [
      {
        text: "BIOS v2.26 · Aymane Berhoua Personal OS",
        delay: 0,
        color: "rgba(74,158,255,0.5)",
      },
      {
        text: "CPU: Python 3.x @ 85% · RAM: curiosity_overflow",
        delay: 120,
        color: "rgba(74,158,255,0.5)",
      },
      {
        text: "Checking file system...",
        delay: 260,
        color: "rgba(74,158,255,0.5)",
      },
      {
        text: "[  OK  ] projects/          mounted",
        delay: 400,
        color: "#3dffa0",
      },
      {
        text: "[  OK  ] skills/            loaded",
        delay: 520,
        color: "#3dffa0",
      },
      {
        text: "[  OK  ] achievements/      indexed",
        delay: 640,
        color: "#3dffa0",
      },
      {
        text: "[  OK  ] hackathon_wins     2x confirmed",
        delay: 760,
        color: "#3dffa0",
      },
      {
        text: "[ WARN ] coffee_level       critically_low",
        delay: 880,
        color: "#ffc947",
      },
      {
        text: "[  OK  ] stoicism_module    online",
        delay: 1000,
        color: "#3dffa0",
      },
      {
        text: "[  OK  ] cs50p              week_in_progress",
        delay: 1120,
        color: "#3dffa0",
      },
      { text: "Starting aymane_os v3.0...", delay: 1280, color: "#4a9eff" },
    ];

    const logContainer = bootEl.querySelector(".boot-log");
    const progressWrap = bootEl.querySelector(".boot-progress-wrap");
    const bootBarFill = bootEl.querySelector(".boot-bar-fill");
    const bootBarPct = bootEl.querySelector(".boot-bar-pct");

    lines.forEach(({ text, delay, color }) => {
      setTimeout(() => {
        if (!logContainer) return;
        const line = document.createElement("div");
        line.className = "boot-line";
        line.style.color = color;
        line.textContent = text;
        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;
      }, delay);
    });

    // Show progress bar after lines finish
    setTimeout(() => {
      if (progressWrap) progressWrap.style.opacity = "1";
      let p = 0;
      const iv = setInterval(() => {
        p = Math.min(p + 2 + Math.random() * 3, 100);
        if (bootBarFill) bootBarFill.style.width = p + "%";
        if (bootBarPct) bootBarPct.textContent = Math.floor(p) + "%";
        if (p >= 100) clearInterval(iv);
      }, 20);
    }, 1400);

    // Fade out
    setTimeout(() => {
      bootEl.classList.add("boot-fade");
      setTimeout(() => {
        bootEl.style.display = "none";
        bootEl.setAttribute("aria-hidden", "true");
      }, 700);
    }, 2600);
  }

  /* ═══════════════════════════════════════════
     THEME TOGGLE
  ═══════════════════════════════════════════ */
  const themeBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function getTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function setTheme(t) {
    if (t === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem("ab-theme", t);
    updateThemeIcon(t);
  }
  function updateThemeIcon(t) {
    if (!themeBtn) return;
    themeBtn.innerHTML =
      t === "light"
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    themeBtn.setAttribute(
      "aria-label",
      t === "light" ? "Switch to dark mode" : "Switch to light mode",
    );
  }

  if (themeBtn) {
    updateThemeIcon(getTheme());
    themeBtn.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
      themeBtn.classList.remove("theme-ripple");
      void themeBtn.offsetWidth; // force reflow
      themeBtn.classList.add("theme-ripple");
    });
  }

  /* ═══════════════════════════════════════════
     SCROLL PROGRESS BAR
  ═══════════════════════════════════════════ */
  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width =
          (total > 0 ? (scrolled / total) * 100 : 0) + "%";
      },
      { passive: true },
    );
  }

  /* ═══════════════════════════════════════════
     INTERACTIVE TERMINAL WIDGET
  ═══════════════════════════════════════════ */
  const termInput = document.getElementById("term-input");
  const termOutput = document.getElementById("term-output");
  const termForm = document.getElementById("term-form");

  const commands = {
    help: () => `<span class="t-dim">Available commands:</span>
  <span class="t-accent">about</span>        — who is aymane?
  <span class="t-accent">skills</span>       — list technical skills
  <span class="t-accent">projects</span>     — shipped projects
  <span class="t-accent">contact</span>      — get in touch
  <span class="t-accent">achievements</span> — wins &amp; certifications
  <span class="t-accent">github</span>       — open GitHub profile
  <span class="t-accent">chess</span>        — open chess.com profile
  <span class="t-accent">philosophy</span>   — stoic thoughts
  <span class="t-accent">whoami</span>       — identity check
  <span class="t-accent">ls</span>           — list sections
  <span class="t-accent">date</span>         — current date
  <span class="t-accent">clear</span>        — clear terminal
  <span class="t-accent">sudo</span>         — nice try`,

    about:
      () => `<span class="t-green">aymane_berhoua</span> · Developer in Progress
  📍 Casablanca, Morocco
  🎓 1er BAC Sciences Maths BIOF
  📚 Currently: CS50P + CS50x (Harvard)
  🤖 Strength: AI &amp; Vibe Coding
  🧩 Hobby: Rubik's cube &lt;60s
  📖 Fav book: Meditations — Marcus Aurelius
  🎯 Goal: Software Engineer`,

    skills: () => `<span class="t-dim">$ ls -la skills/</span>
  🐍 Python        ████████░░  85%  <span class="t-green">competition level</span>
  🌐 HTML &amp; CSS    ██████░░░░  65%  <span class="t-dim">lumos certified</span>
  🎮 Godot Engine  █████░░░░░  55%  <span class="t-dim">2+ games shipped</span>
  ©  C             ███░░░░░░░  35%  <span class="t-dim">cs50x student</span>
  ∑  Mathematics   ████████░░  80%  <span class="t-dim">bac sciences maths</span>
  🗣  English       █████████░  90%  <span class="t-green">full professional</span>
  🤖 AI &amp; Vibe    █████████░  90%  <span class="t-green">shipping fast</span>`,

    projects:
      () => `<span class="t-dim">$ find ./projects -name "*.shipped"</span>
  <span class="t-accent">QuizyMath</span>        → github.com/cottidev/QuizyMath
  <span class="t-accent">Club des Sciences</span> → clubdessciences.pages.dev
  <span class="t-accent">Flappy Fish</span>       → cottidev.itch.io  <span class="t-green">🏆 1st place</span>
  <span class="t-accent">This Portfolio</span>    → you're literally here _`,

    contact: () => `<span class="t-dim">$ cat contact.json</span>
  {
    <span class="t-dim">"email":</span>    <span class="t-green">"aymane.berhoua@gmail.com"</span>,
    <span class="t-dim">"linkedin":</span> <span class="t-green">"linkedin.com/in/aymaneberhoua"</span>,
    <span class="t-dim">"github":</span>   <span class="t-green">"github.com/cottidev"</span>,
    <span class="t-dim">"itch":</span>     <span class="t-green">"cottidev.itch.io"</span>,
    <span class="t-dim">"discord":</span>  <span class="t-green">"cottidev"</span>,
    <span class="t-dim">"status":</span>   <span class="t-green">"open_to_opportunities"</span>
  }`,

    achievements: () => `<span class="t-dim">$ cat awards.log</span>
  <span class="t-green">🏆 1st</span>  Regional Python Hackathon · Samsung × Ministry of Ed · 2025
  <span class="t-green">🏆 1st</span>  Campfire Game Dev Hackathon · Hack Club × École Centrale · 2026
  <span class="t-accent">📜</span>     Python Certificate · Simplilearn · 2024
  <span class="t-accent">📜</span>     HTML Certificate · Lumos Learning · 2024
  <span class="t-accent">📜</span>     Excellence in English · Lycée Tawhidi · Jan 2025
  <span class="t-accent">🎖️</span>     National Python Competition Finalist · 2025`,

    github: () => {
      setTimeout(
        () => window.open("https://github.com/cottidev", "_blank"),
        400,
      );
      return `<span class="t-green">Opening</span> github.com/cottidev in new tab...`;
    },

    chess: () => {
      setTimeout(
        () => window.open("https://www.chess.com/member/supercotti", "_blank"),
        400,
      );
      return `<span class="t-green">Opening</span> chess.com/member/supercotti...
  ♟️  username: <span class="t-accent">supercotti</span> · come challenge me`;
    },

    philosophy: () => `<span class="t-dim">$ python philosophy.py</span>

  <span class="t-green">"You have power over your mind —
  not outside events. Realize this,
  and you will find strength."</span>

  — Marcus Aurelius, Meditations

  <span class="t-dim">while(age++ &lt; life.length) ++knowledge;</span>`,

    sudo: () => `<span class="t-warn">[sudo] password for visitor:</span>
  <span class="t-dim">Sorry, this incident will be reported to Aymane. 👮</span>`,

    clear: () => "__clear__",

    whoami: () =>
      `<span class="t-green">aymane_berhoua</span> · hackathon_winner · cs50_student · stoic_builder`,
    pwd: () => `<span class="t-dim">/home/aymane/portfolio</span>`,
    ls: () =>
      `<span class="t-accent">about/</span>  <span class="t-accent">skills/</span>  <span class="t-accent">projects/</span>  <span class="t-accent">experience/</span>  <span class="t-accent">achievements/</span>  <span class="t-accent">gallery/</span>  <span class="t-accent">connect/</span>`,
    date: () => `<span class="t-green">${new Date().toLocaleString()}</span>`,
    uname: () =>
      `<span class="t-dim">aymane_os v3.0 · casablanca_kernel · #portfolio-2026</span>`,
    echo: () =>
      `<span class="t-dim">...did you forget to pass an argument? 🤔</span>`,
  };

  function termWrite(html, isCmd = false) {
    if (!termOutput) return;
    const line = document.createElement("div");
    line.className = isCmd ? "term-history-cmd" : "term-history-out";
    line.innerHTML = html;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    termWrite(
      `<span class="t-accent">~&nbsp;$</span> ${escapeHtml(raw)}`,
      true,
    );
    const fn = commands[cmd];
    if (!fn) {
      termWrite(
        `<span class="t-warn">command not found:</span> ${escapeHtml(raw)} — type <span class="t-accent">help</span> for options`,
      );
      return;
    }
    const result = fn();
    if (result === "__clear__") {
      termOutput.innerHTML = "";
      return;
    }
    termWrite(result);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  if (termForm && termInput && termOutput) {
    // Chip buttons
    document.querySelectorAll(".term-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        runCommand(chip.dataset.cmd);
        termInput.value = "";
        termInput.focus();
      });
    });

    // Command history + autocomplete
    let history = [],
      histIdx = -1;
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        if (histIdx < history.length - 1) histIdx++;
        termInput.value = history[histIdx] || "";
        e.preventDefault();
      }
      if (e.key === "ArrowDown") {
        if (histIdx > 0) histIdx--;
        else {
          histIdx = -1;
          termInput.value = "";
        }
        termInput.value = history[histIdx] || "";
        e.preventDefault();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const partial = termInput.value.toLowerCase();
        const match = Object.keys(commands).find(
          (k) => k.startsWith(partial) && k !== partial,
        );
        if (match) termInput.value = match;
      }
    });

    termForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = termInput.value.trim();
      if (val) {
        history.unshift(val);
        histIdx = -1;
      }
      runCommand(termInput.value);
      termInput.value = "";
    });

    // Welcome message — shown after boot screen
    setTimeout(() => {
      termWrite(
        `<span class="t-green">Welcome to aymane_os v3.0</span> — Casablanca, Morocco 🇲🇦`,
      );
      termWrite(
        `Type <span class="t-accent">help</span> for commands · <kbd>Tab</kbd> autocomplete · <kbd>↑↓</kbd> history`,
      );
    }, 2800);
  }

  /* ═══════════════════════════════════════════
     FLOATING SQUARES (optimised)
  ═══════════════════════════════════════════ */
  const sqCanvas = document.getElementById("squares-canvas");
  if (sqCanvas) {
    const sqCtx = sqCanvas.getContext("2d");
    let W, H;
    function resizeSq() {
      W = sqCanvas.width = window.innerWidth;
      H = sqCanvas.height = window.innerHeight;
    }
    resizeSq();
    let resizeTimer;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeSq, 150);
      },
      { passive: true },
    );

    const isMobile = window.innerWidth < 768;
    const SQ_COUNT = isMobile ? 10 : 20;

    function makeSquare() {
      return {
        x: Math.random(),
        y: Math.random(),
        size: 14 + Math.random() * 52,
        speedY: 0.00008 + Math.random() * 0.00022,
        driftX: (Math.random() - 0.5) * 0.00012,
        opacity: 0.03 + Math.random() * 0.09,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
        filled: Math.random() > 0.5,
        isBlue: Math.random() > 0.5,
      };
    }
    const squares = Array.from({ length: SQ_COUNT }, makeSquare);
    let sqLast = 0,
      sqAnim,
      sqPaused = false;

    function getColor(s) {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      const r = s.isBlue
        ? isLight
          ? "26,94,204"
          : "40,116,204"
        : isLight
          ? "10,60,160"
          : "74,158,255";
      return `rgba(${r},${s.opacity})`;
    }

    function animateSq(ts) {
      if (!sqPaused) {
        const dt = Math.min(ts - sqLast, 50);
        sqLast = ts;
        sqCtx.clearRect(0, 0, W, H);
        for (const s of squares) {
          s.y -= s.speedY * dt;
          s.x += s.driftX * dt;
          s.rotation += s.rotSpeed;
          if (s.y < -0.12) {
            s.y = 1.12;
            s.x = Math.random();
          }
          if (s.x < -0.12) s.x = 1.12;
          if (s.x > 1.12) s.x = -0.12;
          const cx = s.x * W,
            cy = s.y * H;
          sqCtx.save();
          sqCtx.translate(cx, cy);
          sqCtx.rotate(s.rotation);
          if (s.filled) {
            sqCtx.fillStyle = getColor(s);
            sqCtx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
          } else {
            sqCtx.strokeStyle = getColor(s);
            sqCtx.lineWidth = 1;
            sqCtx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
          }
          sqCtx.restore();
        }
      } else {
        sqLast = ts;
      }
      sqAnim = requestAnimationFrame(animateSq);
    }
    document.addEventListener("visibilitychange", () => {
      sqPaused = document.hidden;
    });
    sqAnim = requestAnimationFrame(animateSq);
  }

  /* ═══════════════════════════════════════════
     UPTIME COUNTER
  ═══════════════════════════════════════════ */
  const uptimeEl = document.getElementById("uptime-counter");
  if (uptimeEl) {
    const start = Date.now();
    setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      uptimeEl.textContent = `${h}:${m}:${sec}`;
    }, 1000);
  }

  /* ═══════════════════════════════════════════
     TYPEWRITER ROLES
  ═══════════════════════════════════════════ */
  const roles = [
    "python_developer",
    "game_dev_enthusiast",
    "hackathon_winner",
    "cs50_student",
    "vibe_coder",
    "stoic_builder",
    "science_club_president",
  ];
  const twEl = document.getElementById("tw-text");
  if (twEl) {
    let ri = 0,
      ci = 0,
      deleting = false;
    function typeLoop() {
      const word = roles[ri];
      if (!deleting) {
        twEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);
          return;
        }
      } else {
        twEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 90);
    }
    setTimeout(typeLoop, 1200);
  }

  /* ═══════════════════════════════════════════
     SYSTEM LOG TICKER
  ═══════════════════════════════════════════ */
  const syslogEl = document.getElementById("syslog-text");
  if (syslogEl) {
    const logs = [
      "studying CS50P · problem set 6 · file I/O",
      "building with Godot 4 · GDScript loaded",
      "reading Meditations — Marcus Aurelius · ch. 4",
      "uptime nominal · all systems operational",
      "pip install --upgrade knowledge",
      "git push origin main · portfolio v3",
      "solved Rubik's cube in 54s · new record",
      "CS50x · week 5 · data structures",
      "running python calculator.py",
      "status: open to opportunities · Casablanca, MA",
      "hackathon_wins=2 · certifications=3 · curiosity=∞",
      "while(age++ < life.length) ++knowledge",
      "prompt_engineering.py · AI tools loaded",
      "science club meeting tomorrow · agenda prepared",
    ];
    let li = 0;
    syslogEl.style.transition = "opacity 0.4s ease";
    function rotateLogs() {
      syslogEl.style.opacity = "0";
      setTimeout(() => {
        syslogEl.textContent = logs[li % logs.length];
        syslogEl.style.opacity = "1";
        li++;
      }, 400);
    }
    rotateLogs();
    setInterval(rotateLogs, 4000);
  }

  /* ═══════════════════════════════════════════
     CUSTOM CURSOR (desktop only)
  ═══════════════════════════════════════════ */
  const cursor = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursor-trail");
  let trailX = 0,
    trailY = 0,
    cursorX = 0,
    cursorY = 0;

  if (cursor && cursorTrail && window.matchMedia("(hover:hover)").matches) {
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
        "a,button,.skill-item,.ach-card,.stat-card,.gallery-item,.interest-chip,.project-card,.term-chip",
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

  /* ═══════════════════════════════════════════
     NAV SCROLL STATE
  ═══════════════════════════════════════════ */
  const nav = document.getElementById("nav");
  function updateNav() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  /* ═══════════════════════════════════════════
     HAMBURGER NAV
  ═══════════════════════════════════════════ */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navBackdrop = document.getElementById("nav-backdrop");

  function openNav() {
    navMenu.classList.add("open");
    navToggle.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navBackdrop?.classList.add("visible");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navBackdrop?.classList.remove("visible");
    document.body.style.overflow = "";
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.contains("open") ? closeNav() : openNav();
    });
    navMenu
      .querySelectorAll(".nav-link")
      .forEach((l) => l.addEventListener("click", closeNav));
    navBackdrop?.addEventListener("click", closeNav);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) closeNav();
    });
    navMenu.addEventListener("click", (e) => e.stopPropagation());
  }

  /* ═══════════════════════════════════════════
     SMOOTH SCROLL
  ═══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH - 20,
        behavior: "smooth",
      });
    });
  });

  /* ═══════════════════════════════════════════
     SCROLL REVEAL
  ═══════════════════════════════════════════ */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll("[data-reveal]"),
        );
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("revealed"), idx * 90);
        revealObs.unobserve(entry.target);
      });
    },
    { threshold: 0.05 },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => revealObs.observe(el));

  /* ═══════════════════════════════════════════
     SKILL BARS
  ═══════════════════════════════════════════ */
  const skillObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.getAttribute("data-width") + "%";
        }, 200);
        skillObs.unobserve(bar);
      });
    },
    { threshold: 0.3 },
  );
  document
    .querySelectorAll(".skill-bar-fill[data-width]")
    .forEach((b) => skillObs.observe(b));

  /* ═══════════════════════════════════════════
     ACTIVE NAV LINK
  ═══════════════════════════════════════════ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const secObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((l) => {
          l.style.color =
            l.getAttribute("href") === `#${id}` ? "var(--accent-light)" : "";
        });
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((s) => secObs.observe(s));

  /* ═══════════════════════════════════════════
     CERT LIGHTBOX
  ═══════════════════════════════════════════ */
  document.querySelectorAll(".cert-img-wrap").forEach((wrap) => {
    wrap.style.cursor = "zoom-in";
    wrap.addEventListener("click", () => {
      const img = wrap.querySelector("img");
      if (!img) return;
      const overlay = document.createElement("div");
      overlay.style.cssText =
        "position:fixed;inset:0;z-index:9990;background:rgba(7,13,24,0.93);display:flex;align-items:center;justify-content:center;padding:2rem;cursor:zoom-out;animation:fadeIn 0.25s ease;";
      const zImg = document.createElement("img");
      zImg.src = img.src;
      zImg.alt = img.alt;
      zImg.style.cssText =
        "max-width:90vw;max-height:88vh;object-fit:contain;border-radius:12px;box-shadow:0 0 0 1px rgba(40,116,204,0.3),0 32px 80px rgba(0,0,0,0.7);";
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

  /* ═══════════════════════════════════════════
     HERO PARALLAX
  ═══════════════════════════════════════════ */
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

  /* ═══════════════════════════════════════════
     HERO NAME GLITCH
  ═══════════════════════════════════════════ */
  const heroNameEl = document.getElementById("hero-name");
  if (heroNameEl) {
    heroNameEl.addEventListener("mouseenter", () => {
      heroNameEl.classList.add("glitching");
      setTimeout(() => heroNameEl.classList.remove("glitching"), 450);
    });
  }

  /* ═══════════════════════════════════════════
     CONSOLE EASTER EGG
  ═══════════════════════════════════════════ */
  const asciiAB = `
╔═══════════════════════════════════════╗
║                                       ║
║    ██████╗   ██████╗                  ║
║   ██╔══██╗  ██╔══██╗                  ║
║   ███████║  ██████╔╝                  ║
║   ██╔══██║  ██╔══██╗                  ║
║   ██║  ██║  ██████╔╝                  ║
║   ╚═╝  ╚═╝  ╚═════╝                   ║
║                                       ║
║  Aymane Berhoua · Developer in prog.  ║
║  portfolio v3 · casablanca, morocco   ║
╚═══════════════════════════════════════╝`;
  console.log(
    "%c" + asciiAB,
    "color:#4a9eff;font-size:10px;font-family:monospace;line-height:1.4;",
  );
  console.log(
    "%c[SYS] session started · " + new Date().toISOString(),
    "color:#3dffa0;font-family:monospace;font-size:11px;",
  );
  console.log(
    "%c$ whoami",
    "color:#4a9eff;font-family:monospace;font-size:12px;",
  );
  console.log(
    "%caymane_berhoua · hackathon_winner · cs50_student · stoic_builder",
    "color:#e8eef8;font-family:monospace;font-size:12px;",
  );
  console.log(
    "%c$ cat philosophy.py",
    "color:#4a9eff;font-family:monospace;font-size:12px;",
  );
  console.log(
    "%cwhile(age++ < life.length) ++knowledge;",
    "color:#a8e6a3;font-family:monospace;font-size:12px;font-style:italic;",
  );
  console.log(
    "%c[SYS] if you're reading this — you're exactly the kind of person I want to connect with. 👋",
    "color:#febc2e;font-family:monospace;font-size:11px;",
  );
});
