const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const introOverlay = document.getElementById('introOverlay');
const introText = document.getElementById('introText');
const introLines = [
  "Let's make the world safer, one second at a time.",
  "When seconds matter, technology should act.",
  "Turning moments of danger into moments of rescue.",
  "Because every life deserves a faster response.",
  "ResQ AI - When you can't call for help, we do it for you.",
];

if (introOverlay && introText) {
  const line = introLines[Math.floor(Math.random() * introLines.length)];
  introText.textContent = line;
  requestAnimationFrame(() => introOverlay.classList.add('show'));
  const showForMs = 2400;
  const fadeMs = 800;
  setTimeout(() => {
    introOverlay.classList.add('hide');
    setTimeout(() => {
      introOverlay.remove();
    }, fadeMs);
  }, showForMs);
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('show'), delay);
    });
  },
  { threshold: 0.18 }
);
revealObserver && reveals.forEach((item) => revealObserver.observe(item));

const counterEls = document.querySelectorAll('.value[data-counter]');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.counter);
      const start = performance.now();
      const duration = 1200;

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(target * eased);
        el.textContent = `${current}${target >= 10 ? '%' : '+'}`;
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  },
  { threshold: 0.45 }
);
counterEls.forEach((el) => counterObserver.observe(el));

const authModal = document.getElementById('authModal');
const openAuth = document.getElementById('openAuth');
const closeAuth = document.getElementById('closeAuth');
const authForm = document.getElementById('authForm');
const googleAuth = document.getElementById('googleAuth');
const dashboard = document.getElementById('dashboard');

const closeModal = () => {
  authModal.classList.remove('open');
  authModal.setAttribute('aria-hidden', 'true');
};

if (openAuth && authModal) {
  openAuth.addEventListener('click', () => {
    authModal.classList.add('open');
    authModal.setAttribute('aria-hidden', 'false');
  });
}

if (closeAuth) closeAuth.addEventListener('click', closeModal);
if (authModal) {
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeModal();
  });
}

const activateDashboard = (labelText) => {
  if (dashboard) {
    dashboard.classList.add('show');
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (openAuth) {
    openAuth.textContent = labelText;
    openAuth.disabled = true;
  }
};

if (authForm) {
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    activateDashboard('Signed In');
  });
}

if (googleAuth) {
  googleAuth.addEventListener('click', () => {
    closeModal();
    activateDashboard('Google Linked');
  });
}

const modeButtons = document.querySelectorAll('.mode-btn');
const dashMode = document.getElementById('dashMode');
const pairingFlow = document.getElementById('pairingFlow');

modeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    modeButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const mode = btn.dataset.mode;
    if (dashMode) dashMode.textContent = `Current Mode: ${mode}`;

    if (pairingFlow) {
      pairingFlow.classList.remove('pulse-cycle');
      void pairingFlow.offsetWidth;
      pairingFlow.classList.add('pulse-cycle');
    }
  });
});
// INTRO TEXT OPTIONS
const introTexts = [
  "Let’s make the world safer, one second at a time.",
  "When seconds matter, technology should act.",
  "Turning moments of danger into moments of rescue.",
  "Because every life deserves a faster response.",
  "ResQ AI – When you can’t call for help, we do it for you."
];

// RANDOM TEXT
const introEl = document.getElementById("introText");
if (introEl) {
  introEl.innerText = introTexts[Math.floor(Math.random() * introTexts.length)];
}

// AUTO CLOSE AFTER 2.5s
window.addEventListener("load", () => {
  setTimeout(() => {
    const overlay = document.getElementById("introOverlay");
    if (overlay) {
      overlay.classList.add("fade-out");
    }
  }, 2500);
});
