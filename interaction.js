// Toggle навигационно меню за мобилни
document.addEventListener('DOMContentLoaded', function () {
    toggle.addEventListener('click', function () {
        navList.classList.toggle('show');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-list a');
    const currentPage = location.pathname.split('/').pop();

    links.forEach(link => {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

