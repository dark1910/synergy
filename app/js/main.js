'use strict';

$(function () {
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height(),
        btnMenu = $(".js-menu");

    //обработка тачей
    if (isTouch()){
        $('html').addClass('touch');
    }
    else {
        $('html').addClass('no-touch');
    }
    function isTouch() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }


    //scroll to top functions
    var scrollEl = $('.js-scroll-top');
    function scrollToTop(el) {
        $(window).scroll(function () {
            checkScrollTopPosition($(this),el);
        });
        el.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    }

    function checkScrollTopPosition(scroll, el){
        if (scroll.scrollTop() > 0) {
            el.fadeIn();
        } else {
            el.fadeOut();
        }
    }
    checkScrollTopPosition($(window),scrollEl);
    scrollToTop(scrollEl);

    //add classes override items
    function overrideItem(item){
        item.on({
            mouseenter: function () {
                $(this).siblings(item).addClass('disabled');
                $(this).addClass('active');
            },
            mouseleave: function () {
                $(this).siblings(item).removeClass('disabled');
                $(this).removeClass('active');
            }
        });
    }

    overrideItem($('.override-item'));

    if(ScreenWidth > 768){
        threeTwoItem($('.js-team'));
    }

    function threeTwoItem(parent) {
        var context = parent,
            count = 3,
            lastItem = false;
        while(context.children('div:not(.team-row)').length){
            context.children('div:not(.team-row):lt('+count+')').wrapAll('<div class="team-row team-row-'+count+'">');
            if(lastItem === true){
                var item = context.children('.team-row:last-child').append('<div class="team-item last-team-item"/>');
            }
            if(count === 3){
                count = 2;
            }
            else{
                count = 3;
            }
/*            if(context.children('div:not(.team-row)').length === 3){
                count = 3;
            }*/
            if(context.children('div:not(.team-row)').length === 2){
                /*count = 2;*/
                lastItem = true;
            }
        }
    }

    function threeTwoItemUnwrap(item){
        item.contents().unwrap();
    }



    //btn-menu
    btnMenu.on('click', function(e){
        $(this).toggleClass("active");
    });


    //summit popup
    var counterSummit = false,
        el = $('.js-summit');
    $(window).on('scroll',function(e){
        if(!counterSummit){
            $('.js-summit').parent().addClass('active');
        }
        counterSummit = true;
    });

    $(document).mouseup(function(e){// событие клика по веб-документу
        if(!el.is(e.target) && el.has(e.target).length === 0){
            el.parent().removeClass('active');
        }
    });
    $('.popup-close').on('click', function(){
        el.parent().removeClass('active');
    });


    //add estimate btn to slide menu
    function estimateBtnClone() {
        btnMenu.on('click',function(){
            var btn = $('.h-estimate').clone();
            if($(this).hasClass('active')){
                btn.prependTo('.menu > ul');
            }
            else{
                btn = '';
                $('.menu ul .h-estimate').remove();
            }
        });
    }

    estimateBtnClone();

    //scroll header menu
    $(window).on('scroll',function(){
        scrollTop($(this));
    });
    scrollTop($(window));

    function scrollTop(obj){
        if(obj.scrollTop() > 0){
            $('.header').addClass('active');
        }
        else{
            $('.header').removeClass('active');
        }
    }

    //header menu 2 level
/*    $('.menu > ul > li').hover(
        function(){
            var ul2 = $(this).find('ul');
            if(ul2.length > 0){
                var counter = 0;
                $(this).addClass('hover');
                ul2.children('li').each(function(){
                    /!*$(this).animate({'transform': 'rotateY(0deg)'},counter);*!/

                    $(this).delay(counter).queue(function() {
                        $(this).addClass("rotate").dequeue();
                    });
                    counter += 400;
                });
            }
        },
        function(){
            var ul2 = $(this).find('ul');
            if(ul2.length > 0){
                var counter = 400;
                counter *= ul2.children('li').length;
                $(this).delay(counter+400).queue(function() {
                    $(this).removeClass('hover').dequeue();
                });
                ul2.children('li').each(function(){
                    $(this).delay(counter).queue(function() {
                        $(this).removeClass("rotate").dequeue();
                    });
                    counter -= 400;
                });
            }
        }
    );*/

    //skills block img full
    function skillsBg(){
        var img = '.skills-img',
            item = '.skills-item';
        if(item.length > 0){

            skillsSize(img,item);

/*            $(item).hover(
                function () {
                    $(this).siblings(item).addClass('disabled');
                    $(this).next(img).addClass('active');
                    $(this).addClass('active');
                },
                function () {
                    $(this).siblings(item).removeClass('disabled');
                    $(this).next(img).removeClass('active');
                    $(this).removeClass('active');
                }
            );*/

            if(ScreenWidth < 640){
                $(img).removeClass('active');
                $(item).removeClass('disabled, active');
            }

            $(item).on({
                mouseenter: function () {
                    if(ScreenWidth > 640){
                        $(this).siblings(item).addClass('disabled');
                        $(this).next(img).addClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    if(ScreenWidth > 640){
                        $(this).siblings(item).removeClass('disabled');
                        $(this).next(img).removeClass('active');
                        $(this).removeClass('active');
                    }
                }
            });
        }
    }

    function skillsSize(img,item){
        $(img).each(function(){
            var top = $(this).prev(item).position().top,
                left = $(this).prev(item).position().left,
                width = $(this).prev(item).outerWidth(),
                height = $(this).prev(item).outerHeight();
            $(this).css({'top':top,'left':left,'width':width,'height':height});
        });
    }

    /*skillsBg();*/




    //view all
    function heightParent(el,count){
        var height = '';
        el.each(function(index){
            if(index >= count){
                height += $(this).outerHeight();
            }
        });
        return height;
    }
    function viewAll(el,count){
        var btn = $('.js-view-all');
        el.each(function(index){
            if(index >= count){
                $(this).slideUp(500);
            }
        });

        btn.on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                //$(this).siblings('.js-view-all-parent').children().slideDown(500);
            }
            else{
                $(this).addClass('active');
                //$(this).siblings('.js-view-all-parent').children().slideDown(500);
            }
        });
    }

    //viewAll($('.case'),2);

    if(ScreenWidth < 1024){
        var menuDeep = $('.menu-item-has-children');
        menuDeep.on('click',function(){
            if($(this).hasClass('on-active')){
                $(this).removeClass('on-active');
            }
            else{
                menuDeep.removeClass('on-active');
                $(this).addClass('on-active');
            }

        });
    }




/*=============PLUGINS==============*/

    $('.main-carousel').owlCarousel({
        animateIn: 'fadeIn',
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 2500,
        /*autoplayHoverPause: true,*/
        smartSpeed: 3500,
        mouseDrag: false,
        touchDrag: false,
        items: 1,
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        navText: [],
        onInitialized: function(e){
            $('.owl-nav,.owl-dots').wrapAll('<div class="owl-controls"/>');
            if(ScreenWidth > 640){
                var control = $('.owl-controls'),
                    height = control.outerHeight();
                height /= 2;
                control.css({'top':'50%','margin-top':-height});
            }
        }
/*        onTranslate: function(e){
            $('.owl-item:not(.cloned)').each(function(){
                if($('.owl-item').hasClass('active')){
                    $(this).animate({'opacity':1},300);
                }
                else{
                    $(this).animate({'opacity':0},300);
                }
            });
        }*/
    });

    $('.post-type-carousel').owlCarousel({
        /*animateIn: 'fadeIn',*/
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 2500,
        /*autoplayHoverPause: true,*/
        smartSpeed: 500,
/*        mouseDrag: false,
        touchDrag: false,*/
        items: 1,
        loop: true,
        margin: 1,
        dots: true,
        nav: true,
        navText: []
    });




    //GSAP
    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            tweenChanges: true
        }
    });

    if($('.js-change-text').length > 0){
        var typed = new Typed('.js-change-text', {
            strings: ['mobile apps', 'web apps', 'software products', 'websites'],
            typeSpeed: 20,
            backSpeed: 20,
            backDelay: 4500,
            cursorChar: '_',
            shuffle: true,
            smartBackspace: false,
            loop: true,
            preStringTyped: function(pos, self){
                $(self.el).removeClass('active');
            },
            onStringTyped: function(pos,self){
                setTimeout(function(){
                    $(self.el).addClass('active');
                },1500);
            }
        });
    }

/*    $('.js-effect-text').textillate({
        initialDelay: 200,
        in: { effect: 'fadeInUp', delay: 0.5}
    });*/


    /*===ALL SECTIONS===*/

/*    $("section").each(function(index){
        var sectionTitle = $(this).find('.sections-title'),
            titleMain = $(this).find('.title-main');

        if(index <= $("section").length){

            var sTween = new TimelineMax();
            sTween.staggerFrom(titleMain, 0.5, {opacity:0, y:100, ease:Back.easeIn}, 0.1);
            sTween.set(titleMain, { className: "+=active" }, 0.5);
            //sTween.staggerFrom(sectionTitle, 0.5, {opacity:0, y:100, ease:Back.easeIn}, 0.1);

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
                .setTween(sTween)
                .addTo(ctrl);

            scene.triggerHook(0.7);
        }


    });*/

    var titleBeforeEffect = '.js-effect-title-before',
        opacityEffect = '.js-effect-opacity',
        imgEffect = '.js-effect-img',
        textEffect = '.js-effect-text',
        lineEffect = '.js-effect-line',
        numberParent = '.js-experience-number';

    addGsapActive(titleBeforeEffect,ctrl);

    addGsapActive(opacityEffect,ctrl);

    addGsapActive(imgEffect,ctrl);

    addGsapActive(textEffect,ctrl);

    addGsapActive(lineEffect,ctrl);

    function addGsapActive(effect, controller){
        if($(document).find(effect).length > 0) {
            $(document).find(effect).each(function (index) {

                var sTween = new TimelineMax();
                sTween.set($(this), {className: "+=active"}, 0.5);

                var scene = new ScrollMagic.Scene({
                    triggerElement: this
                })
                    .setTween(sTween)
                    .addTo(controller);

                scene.triggerHook(1);
            });
        }
    }


    /*===Section3===*/
    if($(numberParent).length > 0) {
        var s3Tween = new TimelineMax();

        // Create scene3
        var scene3 = new ScrollMagic.Scene({
            triggerElement: numberParent
        })
            .setTween(s3Tween)
            /*.addIndicators({name: "Section2 (duration: 0)"})*/
            .addTo(ctrl);

        scene3.triggerHook(1);

        scene3.on("enter", function (event) {

            $('.experience-number').spincrement({
                from: 0,                // Стартовое число
                to: false,              // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
                duration: 3500         // Продолжительность анимации в миллисекундах
            });
        });
    }



    /*=============PLUGINS==============*/



    /*=================Validation===============*/

    /*===CONTACT===*/
    function formLabel(el){
        $(el).on('click contextmenu focusin',function(e){
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === ''){
                    //если инпут или текстареа не пусты
                    $(this).removeClass('active');
                }
            });
            $(this).addClass('active');
        });
        $(document).mouseup(function(e){// событие клика по веб-документу
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === '' && !$(this).is(e.target) && $(this).has(e.target).length === 0){
                    //если инпут или текстареа не пусты и клик был не поселектору и не по его дочерним элементам
                    $(this).removeClass('active');
                }
            });
        });
    }
    formLabel('.js-form-group');

    function validateForms(el){
        var val = el.val(),
            id = el.attr('id');
        switch (id){
            case 'js-name':
                var vName = /^[a-zA-Zа-яА-Я]+$/;
                if(val.length >= 3 && val != '' && vName.test(val)){
                    el.closest('.js-form-group').removeClass('error').addClass('not-error');
                }
                else{
                    el.closest('.js-form-group').addClass('error').removeClass('not-error');
                }
                break;
            case 'js-mail':
                var vMail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if(val != '' && vMail.test(val)){
                    el.closest('.js-form-group').removeClass('error').addClass('not-error');
                }
                else{
                    el.closest('.js-form-group').addClass('error').removeClass('not-error');
                }
                break;
            case 'js-phone':
                var vPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if(val.length >= 3 && val != '' && vPhone.test(val)){
                    el.closest('.js-form-group').removeClass('error').addClass('not-error');
                }
                else{
                    el.closest('.js-form-group').addClass('error').removeClass('not-error');
                }
                break;
            case 'js-message':
                if(val.length >= 3 && val != ''){
                    el.closest('.js-form-group').removeClass('error').addClass('not-error');
                }
                else{
                    el.closest('.js-form-group').addClass('error').removeClass('not-error');
                }
                break;
        }
    }
    $('.validate-field').on('input', function(){
        validateForms($(this));
    });

    //Ввод только цифр
    $('#js-phone').bind("change keyup input click", function(){
        if (this.value.match(/[^0-9]/g)){
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });


    /*=================Validation===============*/


    $(window).resize(function(){
        ScreenWidth = $(window).width();
        ScreenHeight = $(window).height();
        /*skillsBg();*/
        if(ScreenWidth > 1024){
            btnMenu.removeClass('active');
        }
        if(ScreenWidth > 1024 && !btnMenu.hasClass('active')){
            $('.menu ul .h-estimate').remove();
        }

        if(ScreenWidth > 768){
            threeTwoItem($('.js-team'));
        }
        else{
            threeTwoItemUnwrap($('.team-row'));
        }
    });

});