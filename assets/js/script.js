"use strict";

/**
 * PRELOAD
 *
 * load will be end after document is loaded
 */

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", () => {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listeners on multiple elements
 */

const addEventOnElements = (elements, eventType, callback) => {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-nav]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER
 */

const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = () => {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSlideItem = heroSliderItems[0];

const updateSliderPos = () => {
  lastActiveSlideItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSlideItem = heroSliderItems[currentSlidePos];
};

const slideNext = () => {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = () => {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slidePrev);

/**
 * AUTO SLIDE
 */

let autoSlideInterval;

const autoSlide = () => {
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () =>
  clearInterval(autoSlideInterval)
);

addEventOnElements(
  [heroSliderPrevBtn, heroSliderNextBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);
