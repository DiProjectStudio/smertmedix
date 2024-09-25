// ПРОВЕРКА НАЛИЧИЯ СКРОЛЛА В БУРГЕРНОМ МЕНЮ
$(document).ready(function () {
  if ($(window).width() < 1200) {
    window.checkScrollbar = function () {
      const menuContent = $('.header__menu-content')[0];

      const hasScrollbar = menuContent.scrollHeight > menuContent.clientHeight;

      const menuNav = $('.header__menu-nav');
      const menuContacts = $('.header__menu-contacts');

      if (hasScrollbar) {
        menuNav.css('margin-right', '12px');
        menuContacts.css('margin-right', '12px');
      } else {
        menuNav.css('margin-right', '0');
        menuContacts.css('margin-right', '0');
      }
    };

    clickFunc();
  }


// ТЕМНЫЙ ФОН
  function checkActiveAndToggleHeaderBg() {
    if ($('.common-wrapper > .active').length > 0) {
      if ($(window).width() >= 1200) {
        $('.header__bg').hide();
      }
    } else {
      $('.header__bg').css('display', 'block'); // Сначала показываем элемент
      setTimeout(() => {
        $('.header__bg').css('opacity', '1'); // Затем изменяем opacity
      }, 10);
    }
  }

  $('#burger').on('click', () => {
    $('#menu').toggleClass('active');
    checkActiveAndToggleHeaderBg();
  });
  $('.header__menu-close').on('click', () => {
    $('#menu, #catalog-categories, #catalog-products').removeClass('active');
    $('.header__bg').hide();
  });

  $('.header__bg').on('click', function () {
    $('#menu, #catalog, #category').removeClass('active');
    $(this).hide();
    hideCommonWrapper();
  });

  const headerInnerEl = $('.header__inner');
  const commonWrapperEl = $('.common-wrapper');
  const menuToMove = $('#menu');
  const contentCatalogEl = $('.header__menu-content.content-catalog');
  const headerProductsWrapperEl = $('.header__products-wrapper');
  const contentProductsEl = $('.header__menu-content.content-products');


  function moveNavElement() {
    if ($(window).width() >= 1200) {
      contentCatalogEl.append(contentProductsEl);
      headerInnerEl.append(menuToMove); // перемещение меню
    } else if ($(window).width() >= 744 || $(window).width() >= 1200) {
      contentCatalogEl.append(contentProductsEl);
    } else if ($(window).width() < 744) {
      headerProductsWrapperEl.append(contentProductsEl);
    } else if ($(window).width() < 1200) {
      commonWrapperEl.append(menuToMove);
    }
  }

  moveNavElement();


// Инициализация для десктопной версии
  function initDesktopCatalog() {
    if ($(window).width() >= 1200) {
      // ПУНКТЫ НАВИГАЦИОННОГО МЕНЮ - РАСКРЫТИЕ

      $('.list-item.nav-block').on('mouseenter', function () {
        let $navBlock = $(this);
        if ($navBlock.data('timeoutId')) {
          clearTimeout($navBlock.data('timeoutId'));
        }
        $navBlock.addClass('expanded');
        $navBlock.find('.nav-block__list').stop(true, true).slideDown();
      }).on('mouseleave', function () {
        let $navBlock = $(this);
        let timeoutId = setTimeout(function () {
          $navBlock.removeClass('expanded');
          $navBlock.find('.nav-block__list').stop(true, true).slideUp();
        }, 100); // Задержка в 300 мс
        $navBlock.data('timeoutId', timeoutId);
      })
    } else {
      $('.nav-block__head').on('click', function (e) {
        let $navBlock = $(this).closest('.nav-block');
        if ($(window).width() < 1200) {
          if ($(this).find('svg').length > 0) {
            e.preventDefault();
            e.stopPropagation();
            $navBlock.toggleClass('expanded');
            $(this).siblings('.nav-block__list').stop(true, true).slideToggle(function () {
              checkScrollbar();
            });

          }
        }

      });
    }
  }

  initDesktopCatalog();

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  $(window).resize(debounce(function () {
    moveNavElement();
    clickFunc();
    initDesktopCatalog();
  }, 100));


  function clickFunc() {

    $('#catalog-btn').on('click', function () {
      $('#catalog-categories').addClass('active');
      $('.header__bg').show();
    })


    $('#catalog-categories .list-item').on('click', function () {
      let category = $(this).data('category');
      if ($(window).width() < 744) {
        $('#catalog-categories .list-item').removeClass('active');

        $('#catalog-products').addClass('active');
        $('#catalog-products .menu-nav__list, .header__menu-title').hide();
        $('#catalog-products .menu-nav__list[data-category="' + category + '"], .header__menu-title[data-category="' + category + '"]').show();

      } else if ($(window).width() >= 744 && $(window).width() < 1200) {
        $('.header__categories-wrapper').addClass('active');
        $('#catalog-categories .list-item').removeClass('active')
        $(this).addClass('active');
        $('.menu-nav__products .menu-nav__list, .header__menu-title').hide();
        $('.menu-nav__products .menu-nav__list[data-category="' + category + '"], .header__menu-title[data-category="' + category + '"]').show();

      } else {

      }

    });

    // Навигационные кнопки
    $('#products-back').on('click', function () {
      $('#catalog-products').removeClass('active');
      $('#catalog-categories').addClass('active');
    });

  }

  if ($(window).width() >= 1200) {
    $('#catalog-btn').on('click', function () {
      if ($(this).hasClass('active')) {
        hideCommonWrapper();
      } else {
        $(this).addClass('active');
        $('#catalog-categories').addClass('active');
        showCommonWrapper();

        // Активируем первый элемент
        let firstCategory = $('.menu-nav__categories .list-item:first-child');
        let category = firstCategory.data('category');
        firstCategory.addClass('active');
        $('.header__categories-wrapper').addClass('active');
        $('.menu-nav__products .menu-nav__list').hide();
        $('.menu-nav__products .menu-nav__list[data-category="' + category + '"]').show();
      }
    });

    $('.menu-nav__categories .list-item').on('mouseenter', function () {
      let category = $(this).data('category');

      $('.header__categories-wrapper').addClass('active');
      $('.menu-nav__categories .list-item').removeClass('active');
      $(this).addClass('active');
      $('.menu-nav__products .menu-nav__list').hide();
      $('.menu-nav__products .menu-nav__list[data-category="' + category + '"]').show();
    })
  }

  let leaveTimer;

  function showCommonWrapper() {
    checkActiveAndToggleHeaderBg();
    clearTimeout(leaveTimer);
    $('.header__bg').show();
    commonWrapperEl.css('left', '0');
    $('#catalog-categories').addClass('active');
  }

  function hideCommonWrapper() {
    leaveTimer = setTimeout(function () {
      commonWrapperEl.css('left', '-150%');
      $('#catalog-btn').removeClass('active');
      $('#catalog-categories').removeClass('active');
      $('.menu-nav__categories .list-item').removeClass('active');
      $('.menu-nav__products .menu-nav__list').hide();
      $('.header__bg').hide();
    }, 100);
  }


// АНИМАЦИЯ ПЛЕЙСХОЛДЕРА У HEADER SEARCH

  let phrases = ["Инкубатор", "Лучистое тепло", "Мониторы"];
  let currentPhrase = 0;
  let currentChar = 0;
  let speed = 100;
  let pause = 1000;
  let typing = true; // контроль анимации
  let deleting = false; // контроль стирания текста

  let headerSearchInput = $('.header__search-input input[type="search"]');

  function typeWriter() {
    if (typing && !deleting) {
      if (currentChar < phrases[currentPhrase].length) {
        let nextChar = phrases[currentPhrase].charAt(currentChar);
        let currentPlaceholder = headerSearchInput.attr('placeholder') || ''; // Убедитесь, что значение не undefined
        headerSearchInput.attr('placeholder', currentPlaceholder + nextChar);
        currentChar++;
        setTimeout(typeWriter, speed);
      } else {
        // стирание после паузы
        setTimeout(function () {
          deleting = true;
          typeWriter();
        }, pause);
      }
    } else if (typing && deleting) {
      if (currentChar > 0) {
        let currentText = headerSearchInput.attr('placeholder') || ''; // Убедитесь, что значение не undefined
        headerSearchInput.attr('placeholder', currentText.substring(0, currentText.length - 1));
        currentChar--;
        setTimeout(typeWriter, speed);
      } else {
        // переход к следующей фразе после стирания
        deleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(typeWriter, pause);
      }
    }
  }

  headerSearchInput.on('focus input', function () {
    typing = false;
    $(this).attr('placeholder', '');
    $('.header__search-input .icon').addClass('focused');
    $('#page').addClass('bg-overlay').addClass('index');
  });

  headerSearchInput.on('blur', function () {
    if (!typing) {
      typing = true;
      currentChar = 0;
      headerSearchInput.attr('placeholder', '');
      $('.header__search-input .icon').removeClass('focused');
      $('#page').removeClass('bg-overlay');
      typeWriter();
    }
  });
  headerSearchInput.attr('placeholder', '');
  typeWriter();


  // СКРЫТИЕ / ПОКАЗ БЛОКОВ ХЕДЕРА

  function getToggleHeight() {
    let headerInnerHeight = $('.header__inner').outerHeight();
    if ($(window).width() < 744) {
      return headerInnerHeight;

    }
  }

  let lastScrollTop = 0;
  let toggleHeight = getToggleHeight();
  let hysteresis = 50;

  $(window).scroll(function () {
    let st = $(this).scrollTop();
    if (st > lastScrollTop) {
      // Скролл вниз
      if (st > toggleHeight + hysteresis) {
        if ($(window).width() < 744) {
          $('.header__search').hide();
        }
      }
    } else {
      // Скролл вверх
      if (st < toggleHeight - hysteresis) {
        if ($(window).width() < 744) {
          $('.header__search').show();
        }
      }
    }

    lastScrollTop = st <= 0 ? 0 : st; // Не позволяет lastScrollTop быть отрицательным
  });

});