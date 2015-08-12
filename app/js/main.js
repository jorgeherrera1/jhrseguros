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

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function scrollTo(section) {

    var Y = document.getElementById(section).getBoundingClientRect().top;
        start = Date.now(),
        elem = document.documentElement.scrollTop?document.documentElement:document.body,
        from = elem.scrollTop,
        duration = 1600;

    if (from === Y) {
        return; /* Prevent scrolling to the Y point if already there */
    }

    function min(a, b) {
        return a < b ? a : b;
    }

    function easingFunction(t) {
        return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
    }

    function scroll(timestamp) {

        var currentTime = Date.now(),
            time = min(1, ((currentTime - start) / duration)),
            easedT = easingFunction(time);

        elem.scrollTop = (easedT * (Y - from)) + from;

        if(time < 1) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}