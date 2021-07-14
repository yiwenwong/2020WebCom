
$('.slideshow').imagesLoaded({ background: true })
  .done( function() {
  
    // hide loader
    $('.loader').addClass('is-loaded');

    // demo
    CSSPlugin.defaultForce3D = false

    // variables
    var navItems = $("li"),
      background = $(".background"),
      holder = $(".holder"),
      activeID,
      activeImage,
      activeContent,
      rotation,
      type = "_short";

    // set tween values
    function setTweenValues() {
      rotation = Number($(this).data('rotation'));
      activeID = $(this).data('id');
      activeImage = $(this).data('bcg');
      activeContent = $('.slideshow').find("[data-id='content-" + activeID + "']");
      var tweenCode = 'TweenMax.to("' + activeContent + '", 0.5, { backgroundImage: "url(' + activeImage + ')" });';
      var tweenCode2 = 'TweenMax.to(".main-background", 0.5, { rotation:"' + rotation+type +'" });';
    }

    // do tween
    function doTween(){
      
      $('.content').each(function(index, elem) {
        TweenMax.set(elem, { backgroundImage: '' });
        TweenMax.set($(elem).find('.inner'), { autoAlpha: 0 });
      }); 
      
      var timeline = new TimelineMax();
      
      timeline
        .to(activeContent, 0.4, { autoAlpha: 0, ease: Power4.easeInOut }, '-=0.4')
        .to(activeContent, 0.4, { backgroundImage: "url(" + activeImage + ")" }, '-=0.4')
        .staggerTo(background, 0.8, { rotation: rotation+type, transformOrigin:"100% 100%", ease: Back.easeOut.config(1.6) }, 0.025)
        .to(activeContent, 0.4, { autoAlpha: 1, rotation: 0, ease: Power4.easeInOut }, '-=0.8')
        .to(activeContent.find('.inner'), 0.4, { autoAlpha: 1, ease: Power4.easeInOut }, '-=0.4');
        timeline.play();
    }

    // click/hover on items
    navItems.click(doTween);
    navItems.mouseenter(setTweenValues);

  });