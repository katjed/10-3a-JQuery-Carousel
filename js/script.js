$(function(){ 
    var carousel = $('#carousel'),
        carouselList = $('#carousel ul'),
        rightArrow = $('#right-control'),
        leftArrow = $('#left-control'),
        interval;

    var SLIDE_TIMEOUT = 2000,
        SLIDE_ANIMATION_TIME = 700,
        LEFT_DIRECTION = 1,
        IMAGE_WIDTH = 400,
        RIGHT_DIRECTION = 2;

    function changeSlides(direction) { 
        var indicators = $('.indicators'),
            activeIndicatorIndex =  indicators.find('li').index($('.indicators .active')),
            nextIndex = activeIndicatorIndex;

        switch (direction) {
            case LEFT_DIRECTION:
                moveLastSlide();
                carouselList.animate({'marginLeft': 0}, SLIDE_ANIMATION_TIME);

                if (activeIndicatorIndex === 0) {
                    nextIndex = indicators.find('li').length - 1;
                } else {
                    nextIndex--;
                }
                break;
            case RIGHT_DIRECTION:
                carouselList.animate({'marginLeft': -IMAGE_WIDTH}, SLIDE_ANIMATION_TIME, moveFirstSlide);

                if (activeIndicatorIndex === indicators.find('li').length - 1) {
                    nextIndex = 0;
                } else {
                    nextIndex++;
                }
                break;                
        }        

        $('.indicators li').removeClass('active').eq(nextIndex).addClass('active');
    }   

    function moveFirstSlide() { 
        var firstItem = carouselList.find('li:first'); 
        var lastItem = carouselList.find('li:last');

        lastItem.after(firstItem); 
        carouselList.css({marginLeft:0}); 
    }

    function moveLastSlide() {
        var firstItem = carouselList.find('li:first'); 
        var lastItem = carouselList.find('li:last');

        firstItem.before(lastItem)
        carouselList.css({marginLeft: -IMAGE_WIDTH}); 
    }

    function startCarousel() {
        interval = setInterval(function() {
            changeSlides(RIGHT_DIRECTION);
        }, SLIDE_TIMEOUT); 
    }

    function stopCarousel() {
        clearInterval(interval);
    }

    // main
    carousel.hover(
        function() {
            stopCarousel();
        },
        function() {
            startCarousel();
        }
    )

    rightArrow.click(function() {
        changeSlides(RIGHT_DIRECTION);
    });

    leftArrow.click(function() {
        changeSlides(LEFT_DIRECTION);
    });
});














