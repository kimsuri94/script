(function($){

    var $window = $(window);
    var windowWidth = $window.innerWidth();
    var windowHeight = $window.innerHeight();
    var scrollTop = $window.scrollTop();


    // header
    var $header = $('#header');
    var $headerDimmed = $('.header-dimmed', $header);
    var $headerContent = $('.header-content', $header);
    var $nav = $('#nav', $header);
    var headerOpen = false;

    $('.gnb > li > .submenu > ul > li > .submenu', $nav).each(function(){
        gsap.killTweensOf(this);
        gsap.to(this, {autoAlpha:0, duration:.25});
    });

    $('.gnb > li > .submenu > ul > li > .submenu', $nav).each(function(index, submenu) {
        var menuCount = $('li', submenu).length;
        if ( menuCount > 2) $(submenu).addClass('up');
    });

    $('.gnb > li > .submenu > ul > li > a', $nav).on('mouseenter focus', function(e){
        let $submenu = $(this).next();
        $('.gnb > li > .submenu > ul > li > .submenu', $nav).each(function(index, submenu){
            if ( $(submenu).prev()[0] == this) return;
            gsap.killTweensOf(submenu);
            gsap.to(submenu, {autoAlpha:0, duration:.25});
        });


        if ( $submenu[0] ) {
            gsap.killTweensOf($submenu);
            gsap.to($submenu, {autoAlpha:1, duration:.5});
        }
    });

    $('.gnb > li > .submenu > ul > li', $nav).on('mouseleave', function(e){
        let $submenu = $('.submenu', this);
        if ( $submenu[0] ) {
            gsap.killTweensOf($submenu);
            gsap.to($submenu, {autoAlpha:0, duration:.25});
        }
    });

    $('.gnb > li > a', $nav).on('mouseover mousedown focus', function(e){
        let submenuDelay = 0.15;
        if ( headerOpen === false) {
            submenuDelay = .15;
            openSubmenu();
        }

        $('.gnb > li', $nav).removeClass('active').addClass('inactive');
        $(this).parent().addClass('active').removeClass('inactive');

        gsap.killTweensOf($('.gnb > li > .submenu', $nav));
        gsap.to($('.gnb > li > .submenu', $nav), {autoAlpha:0, duration:.25});

        let $submenu = $(this).next();
        if ( $submenu[0] ) {
            gsap.killTweensOf($submenu);
            gsap.to($submenu, {autoAlpha:1, duration:.5, delay:submenuDelay});
        }
    });

    $headerContent.on('mouseleave', function(e){
        hideSubmenu();
    });

    $headerDimmed.on('click', function(e){
        e.preventDefault();
        hideSubmenu();
    });

    $('#main *, #footer *').on('focus', function(){
        hideSubmenu();
    });

    var headerMotion_timeline;
    function openSubmenu() {
        headerOpen = true;
        gsap.set('.submenu-bg', {clearProps:'all'})
        gsap.set('.header-dimmed', {height:'100vh', autoAlpha:0})

        gsap.killTweensOf('.header-dimmed, .submenu-bg');

        if (headerMotion_timeline) {
            headerMotion_timeline.kill();
            headerMotion_timeline = null;
        }
        headerMotion_timeline = gsap.timeline({
            onComplete:function(){
                gsap.set('.submenu-bg', {clearProps:'height'})
            }
        })
            .to('.header-dimmed', {autoAlpha:1, duration:.2}, 0)
            .set('.submenu-bg', {autoAlpha: 1}, 0)
            .from('.submenu-bg', {height:0, duration:.5, ease:Quad.easeOut}, 0)
            .fromTo('.submenu-bg .etc .etc, .submenu-bg .etc .btns a', {autoAlpha:0, y:10}, {autoAlpha:1, y:0, duration:1, ease:Quint.easeOut, stagger:.1}, 0);
        $('.submenu-bg').addClass('active');
        $header.addClass('show-submenu');
    }

    function hideSubmenu() {
        headerOpen = false;
        gsap.killTweensOf('.header-dimmed, .submenu-bg, .submenu');

        if (headerMotion_timeline) {
            headerMotion_timeline.kill();
            headerMotion_timeline = null;
        }
        headerMotion_timeline = gsap.timeline({onComplete:function(){
            $('.submenu-bg').removeClass('active');
            }})
            .to('.submenu-bg', {height:0, duration:.25, ease:Quad.easeIn}, 0)
            .to('.header-dimmed', {autoAlpha:0, duration:.2}, .25)
            .set('.submenu-bg', {autoAlpha: 0})

        $('.gnb > li', $nav).removeClass('active inactive');

        gsap.to($('.submenu', $nav), {autoAlpha:0, duration:.2});
        $header.removeClass('show-submenu');
    }


    //langs
    $('#header .langs select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
        dropdownParent: $('#header .langs')
    });



    // search
    var $search = $('#search');
    var $searchBox = $('.offcanvas-box', $search);
    var $btnToggleSearch = $('.btn-toggle-search', $header);
    var $btnCloseSearch = $('.btn-close', $search);
    var searchMotion_timeline;
    $btnToggleSearch.on('click', function(e){
        e.preventDefault();
        if ( searchMotion_timeline ) {
            searchMotion_timeline.kill();
            searchMotion_timeline = null;
        }

        gsap.set($searchBox, {clearProps:'all'})

        searchMotion_timeline = gsap.timeline({
            onComplete:function(){
                $search.focus();
            }})
            .to($search, {autoAlpha:1, duration:.25})
            .from($searchBox, {y:'-100%', duration:.5, ease:Quart.easeInOut})
            .fromTo($btnCloseSearch, {x:'100%', autoAlpha:0, rotate:90}, {x:'0%', autoAlpha:1, rotate: 0, duration:.5, ease:Quart.easeInOut}, .5);

        $search.attr('tabindex', 0);
        $(document).one('keydown', function(e){
            if ( e.key.toUpperCase() == "ESCAPE" ) {
                hideSearch();
            }
        })
    });

    $btnCloseSearch.on('click', function(e) {
        e.preventDefault();
        hideSearch();
    });

    function hideSearch() {
        if ( searchMotion_timeline ) {
            searchMotion_timeline.kill();
            searchMotion_timeline = null;
        }

        searchMotion_timeline = gsap.timeline({onComplete:function(){
                $btnToggleSearch.focus();
            }})
            .to($searchBox, {y:'-100%', duration:.4, ease:Quart.easeIn}, 0)
            .to($search, {autoAlpha:0, duration:.25})
    }



    var $btnToggleSitemap = $('.btn-toggle-sitemap', $header);
    var $sitemap = $('#sitemap');
    var $sitemapBox = $('.offcanvas-box', $sitemap);
    var $btnCloseSitemap = $('.btn-close', $sitemap);
    var sitemapMotion_timeline;
    $btnToggleSitemap.on('click', function(e){
        e.preventDefault();
        if ( sitemapMotion_timeline ) {
            sitemapMotion_timeline.kill();
            sitemapMotion_timeline = null;
        }

        gsap.set($sitemapBox, {clearProps:'all'})

        sitemapMotion_timeline = gsap.timeline({
                onComplete:function(){
                $sitemap.focus();
            }})
            .to($sitemap, {autoAlpha:1, duration:.25})
            .from($sitemapBox, {y:'-100%', duration:.5, ease:Quart.easeInOut})
            .fromTo($btnCloseSitemap, {x:'100%', autoAlpha:0, rotate:90}, {x:'0%', autoAlpha:1, rotate: 0, duration:.5, ease:Quart.easeInOut}, .5)

        $sitemap.attr('tabindex', 0);
        $(document).one('keydown', function(e){
            if ( e.key.toUpperCase() == "ESCAPE" ) {
                hideSitemap();
            }
        })

    });

    $btnCloseSitemap.on('click', function(e) {
        e.preventDefault();
        hideSitemap();
    });


    function hideSitemap() {
        if ( sitemapMotion_timeline ) {
            sitemapMotion_timeline.kill();
            sitemapMotion_timeline = null;
        }

        sitemapMotion_timeline = gsap.timeline({onComplete:function(){
                $btnToggleSitemap.focus();
            }})
            .to($sitemapBox, {y:'-100%', duration:.4, ease:Quart.easeIn}, 0)
            .to($sitemap, {autoAlpha:0, duration:.25})

    }


    // window event
    $window.on('scroll', function(){
        requestAnimationFrame(onScroll);
    });

    $window.on('resize', function(){
        requestAnimationFrame(onResize);
    });

    function onResize() {
        windowWidth = $window.innerWidth();
        windowHeight = $window.innerHeight();
    }

    function onScroll() {
        scrollTop = $window.scrollTop();
    }




    // init
    $(function(){
        onResize();
        onScroll();
    })

    onResize();
    onScroll();
})(jQuery);



//motions
(function($){
    $('.page-hero-title .__img').each(function(){
        var startPos = $(this).offset().top;
        var endPos = $('#header').height() + $('.breadcrumb').height();
        gsap.timeline({
            scrollTrigger: {
                trigger: this,
                start: 'top ' + startPos,
                end: 'bottom ' + endPos,
                scrub: 0,
            }
        })
            .fromTo(this, {backgroundPosition:'5% 100%'}, {backgroundPosition: '50% 0%'})
    });
})(jQuery);




//footer
(function($){
    $('.family-site .btn-toggle').on('click', function(e){
        e.preventDefault();
        $('.family-site').toggleClass('active');
    })
})(jQuery);