$(document).ready(function() {

    // LOADER
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 500);


    setTimeout(function() {
        $('.loader-overlay').fadeOut();
    }, 1000);

    // Full page site

    var slideTimeout;

    if ($('#fullpage').length)
        $('#fullpage').fullpage({
            sectionsColor: ['#ffffff', '#ffffff', '#f7f7f7', '#ffffff', '#f5f5f5', '#ffffff', '#f4f4f4', '#ffffff', '#ffffff'],
            anchors: ['home', 'aboutus', 'services', 'quote', 'solutions', 'projects', 'media', 'location', 'contactus'],
            menu: '#navigation',
            continuousVertical: false,
            animateAnchor: false,
            verticalCentered: false,
            slidesNavigation: false,
            autoScrolling: true,
            scrollingSpeed: 1000,
            normalScrollElements: '#content-scroll',

            css3: false,
            afterRender: function() {
                //on page load, start the slideshow
                slideTimeout = setInterval(function() {
                    $.fn.fullpage.moveSlideRight();
                }, 4000);
            },
            onLeave: function(index, direction) {

            }
        });


    if ($('#carousel-solution').length)
        $('#carousel-solution').owlCarousel({
            loop: true,
            dots: false,
            nav: true,
            autoplay: false,
            autoplayTimeout: 4000,
            navText: '',
            items: 1
        })


    $('#carousel-projects').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        dots: false,
        margin: 15,
        lazyLoad: true,
        navText: '',
        responsive: {
            0: {
                items: 1
            },
            650: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 6
            },
            1600: {
                items: 6
            },
        }
    });

    $('#carousel-news').owlCarousel({
        loop: false,
        nav: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        dots: false,
        center: true,
        margin: 15,
        lazyLoad: true,
        navText: '',
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            },
        }
    });

    $('#carousel-gallery').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        center: true,
        dots: false,
        margin: 15,
        lazyLoad: true,
        navText: '',
        responsive: {
            0: {
                items: 2
            },
            650: {
                items: 3
            },
            992: {
                items: 4
            },
            1280: {
                items: 5
            },
            1600: {
                items: 6
            },
        }
    });


    $('#carousel-career').owlCarousel({
        loop: false,
        nav: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        dots: false,
        margin: 15,
        center: true,
        lazyLoad: true,
        navText: '',
        responsive: {
            0: {
                items: 1
            },
            350: {
                items: 2
            },
            992: {
                items: 3
            },
            1280: {
                items: 4
            },
            1600: {
                items: 5
            },
        }
    });


    if ($(".welcome-scroll").length)
        $(".welcome-scroll").mCustomScrollbar({
            scrollButtons: {
                enable: false
            },
            theme: "light-thick",
            scrollbarPosition: "outside",
        });


    if ($(window).width() < 1023 && $(".content-scroll").length) {
        $(".content-scroll").mCustomScrollbar({
            scrollButtons: {
                enable: true
            },
            theme: "light-thick",
            scrollbarPosition: "outside",
        });
    }


    // ende document ready
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$('#carousel-ins-clients').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    dots: false,
    margin: 15,
    lazyLoad: true,
    navText: '',
    responsive: {
        0: {
            items: 2
        },
        350: {
            items: 2
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        },
    }
})


if ($(window).width() < 1023) {
    $(".contact-scroll").mCustomScrollbar({
        scrollButtons: {
            enable: true
        },
        theme: "light-thick",
        scrollbarPosition: "outside",
    });

}


// Services Tab
$(function() {
    var hash = window.location.hash;
    hash && $('.project-tb-nav ul li a[href="' + hash + '"]').tab('show');

    $('.project-tb-nav ul li a').click(function(e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });
});