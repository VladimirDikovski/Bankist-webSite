"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnShowMore = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const btnOpen = document.querySelector(".drop-down");
const headerEl = document.querySelector(".header");
const buttonContainer = document.querySelector(".operations__tab-container");
const buttonsAraysEl = document.querySelectorAll(".btn");
const navEl = document.querySelector("nav");
const operationContensArrays = document.querySelectorAll(
  ".operations__content"
);
const operationsEl = document.querySelector(".operations");

//add open and hide menu

btnOpen.addEventListener("click", function () {
  headerEl.classList.toggle("open");
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
//Implement smooth scrolling to learn more buttons
btnShowMore.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

//Implement smooth scrolling to links

//old way with node list

// document.querySelectorAll('.nav__link').forEach(link =>
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     let hrefAtribut = link.getAttribute('href');
//     document.querySelector(hrefAtribut).scrollIntoView({ behavior: 'smooth' });
//   })
// );

//better way with event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    let hrefAtribut = e.target.getAttribute("href");
    document.querySelector(hrefAtribut).scrollIntoView({ behavior: "smooth" });
  }
});

// tabbed component

buttonContainer.addEventListener("click", function (e) {
  const currentElement = e.target.closest(".btn");

  if (!currentElement) return;
  //remove classes
  buttonsAraysEl.forEach((b) => b.classList.remove("operations__tab--active"));
  operationContensArrays.forEach((op) =>
    op.classList.remove("operations__content--active")
  );
  //add class
  currentElement.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${currentElement.dataset.tab}`)
    .classList.add("operations__content--active");
});

//menu fade animation
const mouseHoverLinks = function (e, oppacity) {
  if (e.target.classList.contains("nav__link")) {
    const currentNavLink = e.target;
    //take all nav_links
    const arraysOfNavlinks = currentNavLink
      .closest(".nav")
      .querySelectorAll(".nav__link");
    //take logoElement
    const logo = currentNavLink.closest(".nav").querySelector(".nav__logo");

    //Add opacity 0.5 to all nav_links elements exept current hover

    arraysOfNavlinks.forEach((el) => {
      if (el !== currentNavLink) {
        el.style.opacity = oppacity;
      }
    });

    logo.style.opacity = oppacity;
  }
};

navEl.addEventListener("mouseover", function (e) {
  mouseHoverLinks(e, 0.5);
});

navEl.addEventListener("mouseout", function (e) {
  mouseHoverLinks(e, 1);
});

//Add sticky bar
//Old way with scroll event.It's bad perfomance because generate to many events.

//take beginning of the section__1 element
// const section1cordinateTop = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   window.scrollY > section1cordinateTop.top
//     ? navEl.classList.add('sticky')
//     : navEl.classList.remove('sticky');
// });

//sticky navigaton with Intersection Observer API

//options
// const obsOptions = {
//   root: null, //view port
//   threshold: 0.5, //procent to intersection
// };

// //calback function
// const obsCallback = function (entries, observer) {
//   entries.forEach(en => console.log(en));
// };

// //1 need target to observe
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// //2 target
// observer.observe(section1);

const navHeight = navEl.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navEl.classList.add("sticky");
  } else {
    navEl.classList.remove("sticky");
  }
};

const headerObserved = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserved.observe(headerEl);

//add observe and add hidden class to all sections
//Reveal efect sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserved = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll(".section");

allSections.forEach(function (section) {
  section.classList.add("section--hidden");
  sectionObserved.observe(section);
});

//lazy -img optimization

const lazyImgLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img");
  observer.unobserve(entry.target);
};

const imgObserved = new IntersectionObserver(lazyImgLoad, {
  root: null,
  threshold: 0,
  rootMargin: `${90}px`,
});

const allLazyImages = document.querySelectorAll(".features__img");
allLazyImages.forEach((img) => imgObserved.observe(img));

//implement slider components

const sliderElements = document.querySelector(".slider");
const sliders = document.querySelectorAll(".slide");
// sliderElements.style.transform = "scale(0.5)";
// sliderElements.style.overflow = "visible";

const slidersLenght = sliders.length;
let counterClicks = 0;

const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

sliders.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

//implement click event to right button

const nextSlide = function () {
  if (counterClicks === slidersLenght - 1) {
    counterClicks = 0;
  } else {
    counterClicks++;
  }

  sliders.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - counterClicks)}%)`)
  );
};

const previousSlide = function () {
  if (counterClicks * -1 === slidersLenght) {
    counterClicks = -1;
  } else {
    counterClicks--;
  }

  sliders.forEach(
    (s, i) =>
      (s.style.transform = `translateX(${
        100 * (slidersLenght - i + counterClicks) * -1
      }%)`)
  );
  console.log(counterClicks);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    previousSlide();
  }
});
