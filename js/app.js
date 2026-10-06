/**
 * NARESH 💕 SABITHA WEDDING INVITATION
 * Modern Vanilla JavaScript Application
 * Features:
 *  - Real-time countdown timer to Muhurtham (Nov 11, 2026, 6:00 AM IST)
 *  - Interactive Falling Flower Petals Canvas
 *  - Ambient Auspicious Wedding Melodies (Web Audio Synthesizer + MP3 support)
 *  - Scroll Reveal Intersection Observer
 *  - Calendar Event Generation (.ics / Google Calendar)
 *  - Guest Blessings Book (with LocalStorage)
 *  - Social Sharing & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initPetalShower();
  initAudioEngine();
  initScrollAnimations();
  initGuestWishes();
  initShareAndCopy();
  initNavbarBehavior();
});

/* ==========================================================================
   1. COUNTDOWN TIMER
   Target: November 11, 2026, 06:00:00 AM IST (UTC+05:30)
   ========================================================================== */
function initCountdown() {
  // Target: 2026-11-11T06:00:00+05:30
  const targetDate = new Date('2026-11-11T06:00:00+05:30').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const bannerEl = document.getElementById('countdown-status-text');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      if (bannerEl) {
        bannerEl.textContent = '💍 The Muhurtham is happening now! Auspicious Blessings to Naresh & Sabitha!';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. FALLING FLOWER PETALS CANVAS
   Canvas particle engine simulating falling rose petals and jasmine flowers
   ========================================================================== */
let isPetalsActive = true;

function initPetalShower() {
  const canvas = document.getElementById('petals-canvas');
  const toggleBtn = document.getElementById('toggle-petals-btn');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const PETAL_COUNT = window.innerWidth < 768 ? 24 : 45;

  const petalColors = [
    { r: 233, g: 30, b: 99, a: 0.75 },   // Rose Pink
    { r: 194, g: 24, b: 91, a: 0.8 },    // Deep Crimson Rose
    { r: 255, g: 193, b: 7, a: 0.8 },    // Golden Marigold
    { r: 255, g: 152, b: 0, a: 0.75 },   // Saffron Orange
    { r: 255, g: 253, b: 240, a: 0.9 }   // Jasmine White
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 9 + 8;
      this.speedY = Math.random() * 1.4 + 0.8;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.04;
      this.flutter = Math.random() * Math.PI;
      this.flutterSpeed = Math.random() * 0.03 + 0.015;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.flutter) * 1.2 + this.speedX;
      this.angle += this.angularSpeed;
      this.flutter += this.flutterSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(Math.cos(this.flutter), 1);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Soft organic curved petal shape
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);

      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }

  let animationId;
  function animate() {
    if (isPetalsActive) {
      ctx.clearRect(0, 0, width, height);
      for (let p of petals) {
        p.update();
        p.draw();
      }
    } else {
      ctx.clearRect(0, 0, width, height);
    }
    animationId = requestAnimationFrame(animate);
  }

  animate();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isPetalsActive = !isPetalsActive;
      toggleBtn.classList.toggle('active', isPetalsActive);
      toggleBtn.setAttribute('data-tooltip', isPetalsActive ? 'Petals: On' : 'Petals: Off');
      showToast(isPetalsActive ? '🌸 Petal shower enabled' : 'Petal shower paused');
    });
  }

  // Pause canvas on hidden tab to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

/* ==========================================================================
   3. AMBIENT AUSPICIOUS WEDDING AUDIO ENGINE
   Web Audio API synthesizer (plays Raag Mohanam/Bhupali flute + tanpura drone)
   Requires zero external files to work out of the box!
   ========================================================================== */
function initAudioEngine() {
  const audioBtn = document.getElementById('toggle-audio-btn');
  const audioElement = document.getElementById('wedding-audio');
  if (!audioBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let melodyInterval = null;
  let droneGain = null;
  let masterGain = null;

  // Traditional Indian Pentatonic Scale (Mohanam / Bhupali: Sa, Ri, Ga, Pa, Dha)
  // Base D4 = 293.66 Hz
  const NOTES = {
    Sa: 293.66,
    Ri: 329.63,
    Ga: 369.99,
    Pa: 440.0,
    Dha: 493.88,
    SaHigh: 587.33,
    RiHigh: 659.25,
    GaHigh: 739.99
  };

  const melodyNotes = [
    NOTES.Sa, NOTES.Ri, NOTES.Ga, NOTES.Pa, NOTES.Dha, NOTES.SaHigh,
    NOTES.Dha, NOTES.Pa, NOTES.Ga, NOTES.Ri, NOTES.Sa,
    NOTES.Ga, NOTES.Pa, NOTES.SaHigh, NOTES.Dha, NOTES.Pa, NOTES.Ga
  ];

  let noteIndex = 0;

  function startSynthesizer() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Warm Tanpura Drone (Fundamental + Fifth Harmonic)
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    droneGain = audioCtx.createGain();

    drone1.type = 'sine';
    drone1.frequency.setValueAtTime(NOTES.Sa / 2, audioCtx.currentTime); // 146.83 Hz

    drone2.type = 'triangle';
    drone2.frequency.setValueAtTime(NOTES.Pa / 2, audioCtx.currentTime); // 220.0 Hz

    droneGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(masterGain);

    drone1.start();
    drone2.start();

    // Gentle Flute Melody Note Player
    function playNextFluteNote() {
      if (!isPlaying || !audioCtx) return;

      const freq = melodyNotes[noteIndex % melodyNotes.length];
      noteIndex++;

      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Add gentle vibrato for authentic flute feel
      const vibrato = audioCtx.createOscillator();
      const vibratoGain = audioCtx.createGain();
      vibrato.frequency.setValueAtTime(5.5, audioCtx.currentTime); // 5.5 Hz vibrato
      vibratoGain.gain.setValueAtTime(2.5, audioCtx.currentTime);
      vibrato.connect(osc.frequency);
      vibrato.start();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

      // Flute envelope (soft attack, sustained, gentle decay)
      const now = audioCtx.currentTime;
      const duration = 1.35;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.12, now + 0.25);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
      vibrato.stop(now + duration + 0.1);
    }

    melodyInterval = setInterval(playNextFluteNote, 1400);
    playNextFluteNote();
  }

  function stopSynthesizer() {
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.suspend();
    }
  }

  audioBtn.addEventListener('click', () => {
    // If an external audio element has a valid source file, prefer that
    if (audioElement && audioElement.src && !audioElement.src.endsWith('/')) {
      if (audioElement.paused) {
        audioElement.play().then(() => {
          isPlaying = true;
          updateAudioUI();
        }).catch(() => {
          // Fall back to synthesizer if audio element fails
          isPlaying = true;
          startSynthesizer();
          updateAudioUI();
        });
      } else {
        audioElement.pause();
        isPlaying = false;
        updateAudioUI();
      }
      return;
    }

    // Use built-in Indian melody synthesizer
    if (!isPlaying) {
      isPlaying = true;
      startSynthesizer();
      showToast('🎵 Playing Auspicious Wedding Melodies');
    } else {
      isPlaying = false;
      stopSynthesizer();
      showToast('Wedding music paused');
    }
    updateAudioUI();
  });

  function updateAudioUI() {
    audioBtn.classList.toggle('playing', isPlaying);
    audioBtn.classList.toggle('active', isPlaying);
    audioBtn.setAttribute('data-tooltip', isPlaying ? 'Music: Playing' : 'Music: Paused');
  }
}

/* ==========================================================================
   4. SCROLL REVEAL INTERSECTION OBSERVER
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   5. NAVBAR SCROLL BEHAVIOR
   ========================================================================== */
function initNavbarBehavior() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   6. GUEST WISHES & BLESSINGS (LocalStorage Supported)
   ========================================================================== */
function initGuestWishes() {
  const form = document.getElementById('guest-wishes-form');
  const feed = document.getElementById('wishes-feed');
  if (!form || !feed) return;

  const STORAGE_KEY = 'wedding_wishes_naresh_sabitha';

  const defaultWishes = [
    {
      name: 'Karthik & Family',
      message: 'Heartiest congratulations Naresh and Sabitha! Wishing you both a lifetime of eternal love, happiness and divine blessings!',
      time: 'Just now'
    },
    {
      name: 'Priya Ramanathan',
      message: 'So thrilled for the wonderful couple! May your marital journey be filled with laughter and endless joy. See you at the Muhurtham!',
      time: '1 hour ago'
    },
    {
      name: 'Suresh Kumar',
      message: 'Congratulations! Warmest wishes on your new beginning together.',
      time: 'Yesterday'
    }
  ];

  function loadWishes() {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      saved = [];
    }
    const allWishes = [...saved, ...defaultWishes];
    renderWishes(allWishes);
  }

  function renderWishes(wishes) {
    feed.innerHTML = '';
    wishes.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'wish-item';
      card.innerHTML = `
        <div class="wish-item-header">
          <span class="wish-author">${escapeHTML(item.name)}</span>
          <span class="wish-time">${escapeHTML(item.time)}</span>
        </div>
        <p class="wish-message">"${escapeHTML(item.message)}"</p>
      `;
      feed.appendChild(card);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('guest-name');
    const msgInput = document.getElementById('guest-message');

    const name = nameInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !message) return;

    const newWish = {
      name,
      message,
      time: 'Just now'
    };

    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      saved = [];
    }

    saved.unshift(newWish);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }

    loadWishes();
    form.reset();
    showToast('💐 Thank you for your heartfelt blessing!');
  });

  loadWishes();
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   7. CALENDAR (.ICS / GOOGLE CALENDAR) & SHARING
   ========================================================================== */
function initShareAndCopy() {
  // Share Invitation Button
  const shareBtn = document.getElementById('share-invite-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Wedding Invitation: Naresh 💕 Sabitha',
        text: 'Join us in celebrating the wedding of Naresh & Sabitha from November 10th - 12th, 2026. Your presence will make our day truly special!',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          showToast('Invitation shared successfully!');
        } catch (err) {
          // User dismissed or unsupported
        }
      } else {
        // Fallback: Copy link to clipboard
        copyText(window.location.href, '🔗 Invitation link copied to clipboard!');
      }
    });
  }

  // Copy Link Button
  const copyBtn = document.getElementById('copy-invite-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyText(window.location.href, '🔗 Invitation link copied to clipboard!');
    });
  }

  // Add to Calendar Buttons
  document.querySelectorAll('[data-calendar-event]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventType = btn.getAttribute('data-calendar-event');
      addToGoogleCalendar(eventType);
    });
  });
}

function addToGoogleCalendar(eventType) {
  let title = '';
  let details = '';
  let location = '';
  let start = '';
  let end = '';

  if (eventType === 'reception1') {
    title = 'Naresh & Sabitha Wedding - Reception 1';
    details = 'Celebration of Naresh & Sabitha Wedding Reception 1.';
    location = 'Thirumurugan Marriage Mahal, Thaalapathi, Kunnathur';
    start = '20261110T130000Z'; // 6:30 PM IST = 13:00 UTC
    end = '20261110T150000Z';   // 8:30 PM IST = 15:00 UTC
  } else if (eventType === 'muhurtham') {
    title = 'Naresh & Sabitha Wedding Ceremony (Muhurtham)';
    details = 'Auspicious Muhurtham of Naresh & Sabitha at Thaalapathi Murugan Temple.';
    location = 'Thaalapathi Murugan Temple';
    start = '20261111T003000Z'; // 6:00 AM IST = 00:30 UTC
    end = '20261111T013000Z';   // 7:00 AM IST = 01:30 UTC
  } else if (eventType === 'reception2') {
    title = 'Naresh & Sabitha Wedding - Grand Reception 2';
    details = 'Grand Reception of Naresh & Sabitha at KVN Mahal, Coimbatore.';
    location = 'KVN Mahal, Coimbatore';
    start = '20261112T130000Z'; // 6:30 PM IST = 13:00 UTC
    end = '20261112T150000Z';   // 8:30 PM IST = 15:00 UTC
  } else {
    // All 3 days summary
    title = 'Naresh & Sabitha Wedding Celebrations';
    details = 'Wedding festivities of Naresh & Sabitha from Nov 10 - Nov 12, 2026.';
    location = 'Thaalapathi Murugan Temple, Kunnathur';
    start = '20261110T130000Z';
    end = '20261112T150000Z';
  }

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* Utility: Copy text with Toast Notification */
function copyText(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textarea);
}

/* Utility: Global Toast Notice */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

