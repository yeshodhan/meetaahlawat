$('document').ready(function(){

    var $body = $('body');

    var $container = $('.carousel-container');
    if($container && $container.length > 0) {
        var thumbnails = true;
        if($container.attr('data-thumbnails')) thumbnails =  ($container.attr('data-thumbnails') === 'true');

        Galleria.loadTheme('resources/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#galleria',{
            autoplay: 8000,
            transition: 'fade',
            transitionSpeed: 1000,
            imageCrop: true,
            thumbnails:thumbnails,
            showCounter:false,
            pauseOnInteraction:true,
            debug:false
        });
        Galleria.ready(function() {
            this.attachKeyboard({
                right: this.next,
                left: this.prev
            });
        });
    }

    var $dividerShadows = $('.divider-shadow');
    if($dividerShadows.length > 0) {
        $dividerShadows.show();
    }

    if($body.hasClass('magazine-covers')) {
        $('[data-imagelightbox]').imageLightbox();
    }

    if($body.hasClass('editorials')) {
        var $covers = $body.find('.covers');
        $covers.isotope({
            itemSelector: '.cover',
            layoutMode: 'masonry'
        });
        $('[data-imagelightbox]').imageLightbox();
    }

    if($body.hasClass('wall')) {
        var $wallContainer = $body.find('.wall-container');
        $.getJSON( "/wall.json", function( data ) {
            var items = [];
            $.each( data.media, function( key, val ) {
                var $wallItem = $('<img>');
                $wallItem.attr('src', val.url);
                $wallContainer.append($wallItem);
            });
        });
    }

    if($body.hasClass('board')) {
        var $wallContainer = $body.find('.wall-container');
        $.getJSON( "/wall.json", function( data ) {
            var items = [];
            $.each( data.media, function( key, val ) {
                var $wallItem = $('<a class="wall-item"></a>');
                var $img = $('<img>');
                $img.attr('src', val.thumbnail);
                $wallItem.append($img);
                var width = val.width;
                var height = val.height;
                var windowWidth = window.innerWidth;
                var factor = 0.198;
                var targetWidth = parseInt(windowWidth*factor,10);
                var targetHeight = parseInt((targetWidth/width * height), 10);
                $wallItem.attr('href',val.url);
                $wallItem.css('width',targetWidth+'px');
                $wallItem.css('height',targetHeight +'px');
                $wallItem.css('margin','1px');
                $wallContainer.append($wallItem);
            });
            $wallContainer.isotope({
                itemSelector: '.wall-item',
                layoutMode: 'masonry'
            });
            $container.isotope('unbindResize');
            $('.wall-item').imageLightbox();
        });
    }


});
window.fbAsyncInit = function() {
    $('body').append($('<div id="fb-root"></div>'));
    FB.init({
        appId      : '300951193443681',
        xfbml      : true,
        version    : 'v2.1'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-55741710-1', 'auto');
ga('send', 'pageview');