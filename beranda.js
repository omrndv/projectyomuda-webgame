// Script untuk menambahkan kelas 'visible' saat elemen muncul di viewport
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in, .slide-up');

    function onScroll() {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check
});
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.scroll-animate');

    function onScroll() {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check
});
