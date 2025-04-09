'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnShowMore = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const btnOpen = document.querySelector('.drop-down');
const headerEl = document.querySelector('.header');

//add open and hide menu

btnOpen.addEventListener('click', function () {
  headerEl.classList.toggle('open');
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//Implement smooth scrolling to learn more buttons
btnShowMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
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
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    let hrefAtribut = e.target.getAttribute('href');
    document.querySelector(hrefAtribut).scrollIntoView({ behavior: 'smooth' });
  }
});

