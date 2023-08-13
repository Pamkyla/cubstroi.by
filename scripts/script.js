let navBurger = document.querySelector('.nav-burger');
let navMenu = document.querySelector('.mobile-nav');

navBurger.addEventListener('click', ()=>{
    navMenu.classList.toggle('active');
    navBurger.classList.toggle('active');
});