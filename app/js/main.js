(function () {
    'use strict';

    var querySelector = document.querySelector.bind(document);

    var body = document.body;
    var navigationContainer = querySelector('.navigation-container');
    var headerBar = querySelector('.header-bar');
    var menuBtn = querySelector('.menu');
    var main = querySelector('main');

    function closeMenu() {
        body.classList.remove('open');
        headerBar.classList.remove('open');
        navigationContainer.classList.remove('open');
    }

    function toggleMenu() {
        body.classList.toggle('open');
        headerBar.classList.toggle('open');
        navigationContainer.classList.toggle('open');
        navigationContainer.classList.add('opened');
    }

    main.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);
    navigationContainer.addEventListener('click', function (event) {
        if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
            closeMenu();
        }
    });
})();
