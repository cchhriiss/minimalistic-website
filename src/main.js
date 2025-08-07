// --- SECTION 1: SCROLL-BASED TEXT ANIMATION ---
const headlineLines = document.querySelectorAll('.headline-bundle div');

document.addEventListener('DOMContentLoaded', () => {

function handleScroll() {
  const scrollY = window.scrollY;
  const scrollFactor = 0.3;
  headlineLines.forEach((line, index) => {
    let moveDistance = scrollY * scrollFactor;
    if (index % 2 !== 0) { // Alternating direction
      moveDistance = -moveDistance;
    }
    line.style.transform = `translateX(${moveDistance}px)`;
  });
}
window.addEventListener('scroll', handleScroll);


// --- SECTION 2: DRAGGABLE DIVIDER ---
const revealLayer = document.querySelector('.color-reveal');
const handle = document.querySelector('.drag-handle');
let isDividerDragging = false;

function moveDivider(x) {
  const minX = window.innerWidth * 0.03;
  const maxX = window.innerWidth * 0.97;
  const clampedX = Math.max(minX, Math.min(x, maxX));
  const revealWidth = window.innerWidth - clampedX;
  handle.style.left = clampedX + 'px';
  revealLayer.style.width = revealWidth + 'px';
  updateAllStickerClips(); // Update stickers when divider moves
}


// --- SECTION 3: DRAGGABLE STICKERS (Multi-Sticker Version) ---
const allStickers = document.querySelectorAll('.sticker');
let activeSticker = null; // Tracks which sticker is being dragged
let isStickerDragging = false;
let stickerOffsetX, stickerOffsetY;

// In main.js, find and replace this entire function

function updateAllStickerClips() {
  if (!handle || !allStickers) return;
  const handleRect = handle.getBoundingClientRect();

  allStickers.forEach(sticker => {
    const stickerRect = sticker.getBoundingClientRect();
    let clipAmount = handleRect.left - stickerRect.left;
    let visiblePercent = (1 - (clipAmount / stickerRect.width)) * 100;
    visiblePercent = Math.max(0, Math.min(100, visiblePercent));

    // CORRECTED: This now uses a fixed 90-degree angle for a consistent horizontal wipe
    const maskValue = `linear-gradient(90deg, black ${visiblePercent}%, transparent ${visiblePercent}%)`;

    sticker.style.webkitMaskImage = maskValue;
    sticker.style.maskImage = maskValue;
  });
}

// Moves the currently active sticker
function onStickerMove(e) {
  if (!activeSticker) return;
  e.preventDefault();
  const newX = (e.pageX || e.touches[0].pageX) - stickerOffsetX;
  const newY = (e.pageY || e.touches[0].pageY) - stickerOffsetY;
  activeSticker.style.left = `${newX}px`;
  activeSticker.style.top = `${newY}px`;
  updateAllStickerClips(); // Update clipping as the sticker moves
}


// --- SHARED EVENT LISTENERS ---
function startDrag(e) {
  document.body.classList.add('is-dragging');
  // Check if the target is the divider handle
  if (e.target === handle) {
    isDividerDragging = true;
  }
  // Check if the target is one of the stickers
  if (e.target.classList.contains('sticker')) {
    isStickerDragging = true;
    activeSticker = e.target;
    stickerOffsetX = (e.pageX || e.touches[0].pageX) - activeSticker.offsetLeft;
    stickerOffsetY = (e.pageY || e.touches[0].pageY) - activeSticker.offsetTop;
  }
}
function stopDrag() {
  isDividerDragging = false;
  isStickerDragging = false;
  activeSticker = null;
  document.body.classList.remove('is-dragging');
}
function onMove(e) {
  if (isDividerDragging) moveDivider(e.clientX || e.touches[0].clientX);
  if (isStickerDragging) onStickerMove(e);
}
document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);
document.addEventListener('mousemove', onMove);
document.addEventListener('touchmove', onMove);


// --- INITIAL STATE ON LOAD ---
window.addEventListener('load', () => {
  const initialX = window.innerWidth * 0.03;
  moveDivider(initialX);
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

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
    });
  }

});
import Swiper from 'swiper/bundle';