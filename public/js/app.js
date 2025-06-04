const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

document.body.classList.toggle('has-sticky-header', window.scrollY > 50);

const burgerButton = document.getElementById('burger')
const burgerMenu = document.getElementById('burgerMenu')
burgerButton.addEventListener('click', (e) => {
    if (burgerButton.classList.contains('active')) {
        burgerButton.classList.remove('active');
    } else {
        burgerButton.classList.add('active');
        burgerMenu.setAttribute('aria-hidden', 'false');
    }
    burgerMenu.classList.toggle('active');
})


const catalogFilterBtn = document.querySelector('.filter-btn');
const catalogFilterMenu = document.querySelector('.filters-catalog__menu');


catalogFilterBtn.addEventListener('click', (e) => {
    catalogFilterBtn.classList.toggle('opened');
    catalogFilterMenu.classList.toggle('opened');
});