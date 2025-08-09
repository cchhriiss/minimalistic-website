// --- SECTION 1: SCROLL-BASED TEXT ANIMATION ---
const headlineLines = document.querySelectorAll('.headline-bundle div');

document.addEventListener('DOMContentLoaded', () => {

  // --- OPTIMIZED SCROLL ANIMATION ---
  const headlineLines = document.querySelectorAll('.headline-bundle div');
  let ticking = false; // A flag for throttling

  function handleScroll() {
    const scrollY = window.scrollY;
    const scrollFactor = 0.3;
    headlineLines.forEach((line, index) => {
      let moveDistance = scrollY * scrollFactor;
      if (index % 2 !== 0) { moveDistance = -moveDistance; }
      line.style.transform = `translateX(${moveDistance}px)`;
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });


  // --- OPTIMIZED DIVIDER & STICKER LOGIC ---
  const revealLayer = document.querySelector('.color-reveal');
  const handle = document.querySelector('.drag-handle');
  const allStickers = document.querySelectorAll('.sticker');

  let isDragging = false;
  let activeElement = null; // Can be the handle or a sticker
  let offsetX, offsetY;
  let targetX = 0;
  let targetY = 0;

  function moveElements() {
    if (!isDragging) return;

    if (activeElement === handle) {
      const minX = window.innerWidth * 0.03;
      const maxX = window.innerWidth * 0.97;
      const clampedX = Math.max(minX, Math.min(targetX, maxX));
      const revealWidth = window.innerWidth - clampedX;
      
      handle.style.left = clampedX + 'px';
      revealLayer.style.width = revealWidth + 'px';
    } else if (activeElement && activeElement.classList.contains('sticker')) {
      activeElement.style.left = `${targetX}px`;
      activeElement.style.top = `${targetY}px`;
    }
    
    updateAllStickerClips();
    requestAnimationFrame(moveElements);
  }

  function updateAllStickerClips() { /* ...your existing clip function... */ }

  function startDrag(e) {
    const target = e.target;
    if (target === handle || target.classList.contains('sticker')) {
      isDragging = true;
      activeElement = target;
      document.body.classList.add('is-dragging');

      const currentX = e.clientX || e.touches[0].clientX;
      const currentY = e.clientY || e.touches[0].clientY;
      const rect = activeElement.getBoundingClientRect();
      
      offsetX = currentX - rect.left;
      offsetY = currentY - rect.top;

      requestAnimationFrame(moveElements);
    }
  }

  function stopDrag() {
    isDragging = false;
    activeElement = null;
    document.body.classList.remove('is-dragging');
  }

  function onMove(e) {
    if (!isDragging) return;
    targetX = (e.clientX || e.touches[0].clientX) - offsetX;
    targetY = (e.clientY || e.touches[0].clientY) - offsetY;
  }

  document.addEventListener('mousedown', startDrag);
  document.addEventListener('touchstart', startDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove);

  // Initial Divider Position
  window.addEventListener('load', () => {
    const initialX = window.innerWidth * 0.03; // As per your last request
    const minX = window.innerWidth * 0.03;
    const maxX = window.innerWidth * 0.97;
    const clampedX = Math.max(minX, Math.min(initialX, maxX));
    const revealWidth = window.innerWidth - clampedX;
    if (handle) handle.style.left = clampedX + 'px';
    if (revealLayer) revealLayer.style.width = revealWidth + 'px';
    updateAllStickerClips();
  });

// At the end of main.js, replace the old observer with this new one

// --- SECTION: GLOBAL SCROLL-IN ANIMATION ---
// Select ALL elements that have the class '.reveal-on-scroll'
const animatedElements = document.querySelectorAll('.reveal-on-scroll');

const observer = new IntersectionObserver((entries) => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the 'is-visible' class
      entry.target.classList.add('is-visible');
      // Stop observing the element so the animation only happens once
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

// Tell the observer to watch each of our animated elements
animatedElements.forEach(element => {
  observer.observe(element);
});
// etc...

// This block should be at the end of main.js

const swiper = new Swiper('.swiper', {
  effect: 'slide',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  loopedSlides: 2,
  preventInteractionOnTransition: true,
});
// Add this entire block to the end of your main.js file


// --- SECTION: WINDOW RESIZE HANDLER ---
// This function runs whenever the browser window is resized
function handleResize() {
  // Recalculate the divider's correct resting position based on the new width
  const newInitialX = window.innerWidth * 0.03;
  moveDivider(newInitialX);
  
  // We can also re-check the sticker clip, just in case
  updateAllStickerClips();
}

// Listen for the 'resize' event
window.addEventListener('resize', handleResize);

  // Burger menu logic
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  // Make sure both elements were found before adding listeners
  if (navToggle && nav) {
    // This handles the opening and closing when you click the button
    navToggle.addEventListener('click', (event) => {
      // Stop the click from bubbling up and causing issues
      event.stopPropagation(); 
      nav.classList.toggle('nav-open');
    });

    // This handles closing the menu when you scroll
    window.addEventListener('scroll', () => {
      if (nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
      }
    });
  }

}); // <-- Correctly closes DOMContentLoaded listener

import Swiper from 'swiper/bundle';
