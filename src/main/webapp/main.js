var com = (com) ? com : {};
com.meetaahlawat = (com.meetaahlawat) ? com.meetaahlawat : {};

$('document').ready(function () {

    var $body = $('body');

    var $container = $('.carousel-container');
    if ($container && $container.length > 0) {
        var thumbnails = true;
        if ($container.attr('data-thumbnails')) thumbnails = ($container.attr('data-thumbnails') === 'true');

        Galleria.loadTheme('resources/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#galleria', {
            autoplay: 8000,
            transition: 'fade',
            transitionSpeed: 1000,
            imageCrop: 'landscape',
            thumbnails: thumbnails,
            showCounter: false,
            pauseOnInteraction: true,
            debug: false
        });
        Galleria.ready(function () {
            this.attachKeyboard({
                right: this.next,
                left: this.prev
            });
        });
    }

    var $dividerShadows = $('.divider-shadow');
    if ($dividerShadows.length > 0) {
        $dividerShadows.show();
    }

    if ($body.hasClass('magazine-covers')) {
        $('[data-imagelightbox]').imageLightbox();
    }

    if ($body.hasClass('editorials')) {
        var $covers = $body.find('.covers');
        $covers.isotope({
            itemSelector: '.cover',
            layoutMode: 'masonry'
        });
        $('[data-imagelightbox]').imageLightbox();
    }

    if ($body.hasClass('wall')) {
        var $wallContainer = $body.find('.wall-container');
        $.getJSON("/wall.json", function (data) {
            var items = [];
            $.each(data.media, function (key, val) {
                var $wallItem = $('<img>');
                $wallItem.attr('src', val.url);
                $wallContainer.append($wallItem);
            });
        });
    }

    if ($body.hasClass('board')) {
        var $wallContainer = $body.find('.wall-container');
        $.getJSON("/wall.json", function (data) {
            var items = [];
            $.each(data.media, function (key, val) {
                var $wallItem = $('<a class="wall-item"></a>');
                var $img = $('<img>');
                $img.attr('data-original', val.thumbnail);
                $wallItem.append($img);
                var width = val.width;
                var height = val.height;
                var containerWidth = $wallContainer.width();
                var factor = 0.247;
                var targetWidth = parseInt(containerWidth * factor, 10);
                var targetHeight = parseInt((targetWidth / width * height), 10);
                $wallItem.attr('href', val.url);
                $wallItem.css('width', targetWidth + 'px');
                $wallItem.css('height', targetHeight + 'px');
                $wallItem.css('margin', '0 1px 1px 0');
                $wallContainer.append($wallItem);
                $img.lazyload({
                    effect: 'fadeIn',
                    threshold: 200
                });
            });
            $wallContainer.isotope({
                itemSelector: '.wall-item',
                layoutMode: 'masonry'
            });
            $container.isotope('unbindResize');
            var selectorF = '.wall-item';
            var instanceF = $(selectorF).imageLightbox(
                {
                    onStart: function () {
                        com.meetaahlawat.ImageLightBox.overlayOn();
                        com.meetaahlawat.ImageLightBox.closeButtonOn(instanceF);
                        com.meetaahlawat.ImageLightBox.arrowsOn(instanceF, selectorF);
                    },
                    onEnd: function () {
                        com.meetaahlawat.ImageLightBox.overlayOff();
                        com.meetaahlawat.ImageLightBox.captionOff();
                        com.meetaahlawat.ImageLightBox.closeButtonOff();
                        com.meetaahlawat.ImageLightBox.arrowsOff();
                        com.meetaahlawat.ImageLightBox.activityIndicatorOff();
                    },
                    onLoadStart: function () {
                        com.meetaahlawat.ImageLightBox.captionOff();
                        com.meetaahlawat.ImageLightBox.activityIndicatorOn();
                    },
                    onLoadEnd: function () {
                        com.meetaahlawat.ImageLightBox.captionOn();
                        com.meetaahlawat.ImageLightBox.activityIndicatorOff();
                        $('.imagelightbox-arrow').css('display', 'block');
                    }
                });
        });
    }
});

com.meetaahlawat.ImageLightBox = function () {

    var activityIndicatorOn = function () {
            $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
        },
        activityIndicatorOff = function () {
            $('#imagelightbox-loading').remove();
        },


    // OVERLAY

        overlayOn = function () {
            $('<div id="imagelightbox-overlay"></div>').appendTo('body');
        },
        overlayOff = function () {
            $('#imagelightbox-overlay').remove();
        },


    // CLOSE BUTTON

        closeButtonOn = function (instance) {
            $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () {
                $(this).remove();
                instance.quitImageLightbox();
                return false;
            });
        },
        closeButtonOff = function () {
            $('#imagelightbox-close').remove();
        },


    // CAPTION

        captionOn = function () {
            var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
            if (description && description.length > 0)
                $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
        },
        captionOff = function () {
            $('#imagelightbox-caption').remove();
        },


    // NAVIGATION

        navigationOn = function (instance, selector) {
            var images = $(selector);
            if (images.length) {
                var nav = $('<div id="imagelightbox-nav"></div>');
                for (var i = 0; i < images.length; i++)
                    nav.append('<button type="button"></button>');

                nav.appendTo('body');
                nav.on('click touchend', function () {
                    return false;
                });

                var navItems = nav.find('button');
                navItems.on('click touchend', function () {
                    var $this = $(this);
                    if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
                        instance.switchImageLightbox($this.index());

                    navItems.removeClass('active');
                    navItems.eq($this.index()).addClass('active');

                    return false;
                })
                    .on('touchend', function () {
                        return false;
                    });
            }
        },
        navigationUpdate = function (selector) {
            var items = $('#imagelightbox-nav button');
            items.removeClass('active');
            items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
        },
        navigationOff = function () {
            $('#imagelightbox-nav').remove();
        },


    // ARROWS

        arrowsOn = function (instance, selector) {
            var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

            $arrows.appendTo('body');

            $arrows.on('click touchend', function (e) {
                e.preventDefault();

                var $this = $(this),
                    $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
                    index = $target.index(selector);

                if ($this.hasClass('imagelightbox-arrow-left')) {
                    index = index - 1;
                    if (!$(selector).eq(index).length)
                        index = $(selector).length;
                }
                else {
                    index = index + 1;
                    if (!$(selector).eq(index).length)
                        index = 0;
                }

                instance.switchImageLightbox(index);
                return false;
            });
        },
        arrowsOff = function () {
            $('.imagelightbox-arrow').remove();
        },
        call = function(options){

        };

    return {
        activityIndicatorOn: activityIndicatorOn,
        activityIndicatorOff: activityIndicatorOff,
        overlayOn: overlayOn,
        overlayOff: overlayOff,
        closeButtonOn: closeButtonOn,
        closeButtonOff: closeButtonOff,
        captionOn: captionOn,
        captionOff: captionOff,
        navigationOn: navigationOn,
        navigationUpdate: navigationUpdate,
        navigationOff: navigationOff,
        arrowsOn: arrowsOn,
        arrowsOff: arrowsOff,
        call:call
    }
}();

window.fbAsyncInit = function () {
    $('body').append($('<div id="fb-root"></div>'));
    FB.init({
        appId: '300951193443681',
        xfbml: true,
        version: 'v2.1'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-55741710-1', 'auto');
ga('send', 'pageview');