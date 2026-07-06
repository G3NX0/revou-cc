/* ===== NAVBAR: scroll effect & active link ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Tambah class 'scrolled' saat user scroll ke bawah
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight nav link sesuai section yang sedang dilihat
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ===== HAMBURGER MENU (mobile) ===== */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Tutup menu saat salah satu link diklik
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ===== SCROLL REVEAL (Intersection Observer) ===== */
const revealElements = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Beri sedikit delay berurutan untuk tiap kartu
      const delay = index * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===== SKILL BAR ANIMATION ===== */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        const level = fill.getAttribute('data-level');
        // Tunda sedikit agar animasi muncul setelah card visible
        setTimeout(() => {
          fill.style.width = level + '%';
        }, 300);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');

  // Reset error state
  [name, email, message].forEach(field => field.classList.remove('error'));
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  // Validasi sederhana
  let valid = true;

  if (!name.value.trim()) {
    name.classList.add('error');
    valid = false;
  }

  if (!email.value.trim() || !isValidEmail(email.value)) {
    email.classList.add('error');
    valid = false;
  }

  if (!message.value.trim()) {
    message.classList.add('error');
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = 'Harap isi semua field dengan benar.';
    formStatus.classList.add('error');
    return;
  }

  // Simulasi pengiriman
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Mengirim...';
  submitBtn.disabled = true;

  setTimeout(() => {
    formStatus.textContent = '✅ Pesan berhasil dikirim! Saya akan segera membalas.';
    formStatus.classList.add('success');
    contactForm.reset();
    submitBtn.textContent = 'Kirim Pesan';
    submitBtn.disabled = false;
  }, 1500);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== SMOOTH SCROLL untuk semua anchor link ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== TYPING EFFECT pada hero role ===== */
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const roles = [
    'Frontend Developer',
    'UI Designer',
    'JavaScript Enthusiast',
    'Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      heroRole.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heroRole.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1800); // jeda sebelum hapus
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(type, speed);
  }

  // Mulai typing setelah 1 detik
  setTimeout(type, 1000);
}
