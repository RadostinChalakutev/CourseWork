// Toggle навигационно меню за мобилни
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    toggle.addEventListener('click', function () {
        navList.classList.toggle('show');
    });
});
