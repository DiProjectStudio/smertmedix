$(document).ready(function () {


  const heroSlider = new Swiper(".hero .swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    loop: true,

    pagination: {
        el: '.hero .swiper-pagination',
        clickable: true
    },

    navigation: {
      nextEl: '.hero .swiper-nav-arrow.arrow--next',
      prevEl: '.hero .swiper-nav-arrow.arrow--prev',
    },
    on: {
      slideChange: function() { updateNavArrows(this); },
      init: function() { updateNavArrows(this); },
    }
  });

  const promosSlider = new Swiper(".promos .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    loop: true,
    draggable: true,

    navigation: {
      nextEl: '.promos .swiper-nav-arrow.arrow--next',
      prevEl: '.promos .swiper-nav-arrow.arrow--prev',
    },

    breakpoints: {
      744: {
        slidesPerView: 1.7,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2.3,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 3.3,
        spaceBetween: 20,
      }
    },

    on: {
      slideChange: function() { updateNavArrows(this); },
      init: function() { updateNavArrows(this); },
    },
  });

  const brandsSlider = new Swiper(".brands .swiper", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    loop: true,
    draggable: true,

    navigation: {
      nextEl: '.brands .swiper-nav-arrow.arrow--next',
      prevEl: '.brands .swiper-nav-arrow.arrow--prev',
    },

    breakpoints: {
      744: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 5.5,
        spaceBetween: 20,
      }
    },
    on: {
      slideChange: function() { updateNavArrows(this); },
      init: function() { updateNavArrows(this); },
    },
  });


  $('.general-card-slider').each(function(index) {
    $(this).addClass(`slider-${index}`);

    const sliders = new Swiper(`.slider-${index} .swiper`, {
      slidesPerView: 1.2,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      loop: true,
      draggable: true,

      breakpoints: {
        744: {
          slidesPerView: 2.2,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1600: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        }
      },

      navigation: {
        nextEl: `.slider-${index} .swiper-nav-arrow.arrow--next`,
        prevEl: `.slider-${index} .swiper-nav-arrow.arrow--prev`,
      },
      on: {
        slideChange: function() { updateNavArrows(this); },
        init: function() { updateNavArrows(this); },
      },
    });
  });

  let servicesSlider;
  let servicesInit;

  const services = () => {

    if ($('.services__inner-slider .swiper').length && $(window).width() < 1200 && !servicesInit) {
      servicesInit = true;
      servicesSlider = new Swiper('.services__inner-slider .swiper', {
        slidesPerView: 1.2,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        loop: true,
        draggable: true,

        breakpoints: {
          744: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          }
        },

        on: {
          slideChange: function() { updateNavArrows(this); },
          init: function() { updateNavArrows(this); },
        },
      });
    } else if ($(window).width() >= 1200) {
      if (typeof servicesSlider !== 'undefined') {
        servicesInit = false;
        servicesSlider.destroy();
      }
    }
  }

  services();

  $(window).on('resize', () => {
    services();
  });

  const companyServicesSlider = new Swiper(".company-services .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    loop: true,
    draggable: true,

    breakpoints: {
      744: {
        slidesPerView: 1.3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      }
    },

    navigation: {
      nextEl: `.company-services .swiper-nav-arrow.arrow--next`,
      prevEl: `.company-services .swiper-nav-arrow.arrow--prev`,
    },

    on: {
      slideChange: function() { updateNavArrows(this); },
      init: function() { updateNavArrows(this); },
    },
  })

  $('.gallery-item .swiper').each(function(index, element) {
    const aboutGallerySlider = new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,

      navigation: {
        nextEl: $(element).find('.swiper-nav-arrow--next')[0],
        prevEl: $(element).find('.swiper-nav-arrow--prev')[0],
      },

      on: {
        slideChange: function() { updateNavArrows(this); },
        init: function() { updateNavArrows(this); },
      },
    });

  });

  const brandInnerSlider = new Swiper(".company-services.brand-inner .swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    loop: true,
    draggable: true,

    pagination: {
      el: '.company-services.brand-inner .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.company-services.brand-inner .swiper-nav-arrow.arrow--next',
      prevEl: '.company-services.brand-inner .swiper-nav-arrow.arrow--prev',
    },
  });


  const commonProductsSliderOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    draggable: true,

    breakpoints: {
      744: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        draggable: false,
      },
      1600: {
        slidesPerView: 6.6,
        spaceBetween: 20,
        draggable: false,
      }
    },
    on: {
      slideChange: function () {
        updateNavArrows(this, true);
      },
      init: function () {
        updateNavArrows(this, true);
      },
    }
  }

  const productsSlider = new Swiper('.products-slider:not(.compare-table) .swiper', {
    ...commonProductsSliderOptions,

    pagination: {
      el: '.products-slider .swiper-pagination',
      clickable: true
    },

    navigation: {
      nextEl: `.products-slider .swiper-nav-arrow.arrow--next`,
      prevEl: `.products-slider .swiper-nav-arrow.arrow--prev`,
    }
  })

  const compareTableSlider = new Swiper('.products-slider.compare-table .swiper', {
    ...commonProductsSliderOptions,

    on: {
      slideChange: function () {
        productsSlider.slideToLoop(this.realIndex);
      },
      transitionEnd: function () {
        productsSlider.slideToLoop(this.realIndex);
      }
    }
  })


  const galleryThumbs = new Swiper('.gallery-thumbs', {
    slidesPerView: 4,
    spaceBetween: 10,
    direction: "vertical",
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    mousewheel: true,

    navigation: {
      nextEl: '.product-page__slider .swiper.gallery-thumbs .swiper-nav-arrow.arrow--next',
      prevEl: '.product-page__slider .swiper.gallery-thumbs .swiper-nav-arrow.arrow--prev',
    },
    on: {
      slideChange: function() { updateNavArrows(this, true); },
      init: function() { updateNavArrows(this, true); },
      scroll: function() { updateNavArrows(this, true); },
    }
  })

  const productPageSlider = new Swiper('.main-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    loop: true,
    draggable: true,

    navigation: {
      nextEl: '.main-slider .swiper-nav-arrow.arrow--next',
      prevEl: '.main-slider .swiper-nav-arrow.arrow--prev',
    },
    thumbs: {
      swiper: galleryThumbs
    },
    on: {
      slideChange: function () {
        updateNavArrows(this, true);
      },
      init: function () {
        updateNavArrows(this, true);
      },
    }
  })

  function updateNavArrows(swiper, checkEdges = false) {
    const $prevArrow = $(swiper.params.navigation.prevEl);
    const $nextArrow = $(swiper.params.navigation.nextEl);

    const totalSlides = swiper.slides.length;
    const slidesPerView = swiper.params.slidesPerView;

    if (totalSlides <= slidesPerView && !checkEdges) {
      $prevArrow.css('display', 'none');
      $nextArrow.css('display', 'none');
    } else {
      $prevArrow.css('display', 'flex');
      $nextArrow.css('display', 'flex');
    }

    if (checkEdges) {
      if (swiper.isBeginning) {
        $prevArrow.css('display', 'none');
      } else {
        $prevArrow.css('display', 'flex');
      }

      if (swiper.isEnd) {
        $nextArrow.css('display', 'none');
      } else {
        $nextArrow.css('display', 'flex');
      }
    }
  }


  $('.products-slider:not(.compare-table) .swiper-nav-arrow.arrow--next').on('click', function() {
    compareTableSlider.slideNext();
  });

  $('.products-slider:not(.compare-table) .swiper-nav-arrow.arrow--prev').on('click', function() {
    compareTableSlider.slidePrev();
  });



});