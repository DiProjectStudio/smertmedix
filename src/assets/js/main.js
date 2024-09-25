$(document).ready(function () {

  // INPUT MASK PHONE NUMBER
  $('.phone-mask').inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: false,

    onBeforePaste: function (pastedValue, opts) {
      return pastedValue.replace(/^8/, '');
    }
  });


  // ПЕРЕМЕЩЕНИЕ ССЫЛКИ В СЕКЦИИ 'БРЕНДЫ'

  function moveHeadLink() {
    const headLinkElement = $('.complex__inner .section-head__link'); // что перемещаем
    const sectionHeadElement = $('.complex__inner-head'); // куда перемещаем на 744 и больше
    const sectionInnerElement = $('.complex__inner'); // куда перемещаем до 743

    if(window.innerWidth >= 744) {
      sectionHeadElement.append(headLinkElement);
    } else {
      sectionInnerElement.append(headLinkElement);
    }
  }

  moveHeadLink();

  $(window).resize(debounce(moveHeadLink, 100));

  // ЗАДЕРЖКА

  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }


  // INFO BASIC FAC

  let faqItemEl = $('.faq__item');
  let faqAnswerEl = $('.faq__answer');

  function moveAnswers() {
    if ($(window).width() >= 1200) {
      faqAnswerEl.each(function() {
        $(this).appendTo('.faq__answers');
      });
    } else {
      faqAnswerEl.each(function(index) {
        $(this).appendTo($('.faq__item').eq(index));
      });
    }
  }

  function setActiveItem(index) {
    faqItemEl.removeClass('active');
    faqAnswerEl.removeClass('active');
    faqItemEl.eq(index).addClass('active');
    faqAnswerEl.eq(index).addClass('active');
  }


  moveAnswers();

  if ($(window).width() >= 1200) {
    setActiveItem(0);
  }

  $(window).resize(function() {
    moveAnswers();
    if ($(window).width() >=  1200) {
      setActiveItem(0);
      // faqItemEl.removeClass('active');
      // faqAnswerEl.removeClass('active');
    } else {
      faqItemEl.removeClass('active');
      faqAnswerEl.removeClass('active');
    }

  });

  $('.faq__question').on('click', function() {
    if ($(window).width() <= 1200) {
      $(this).parent().toggleClass('expanded');
    } else {
      let index = $(this).parent().index();
      setActiveItem(index);
    }
  });


  $('.catalog__inner-article .link').on('click', function() {
    let $parent = $(this).closest('.catalog__inner-article');
    $parent.toggleClass('expanded');
    if ($parent.hasClass('expanded')) {
      $(this).text('скрыть');
    } else {
      $(this).text('подробнее');
    }
  });


  // ПЕРЕМЕЩЕНИЕ ИЗОБРАЖЕНИЯ В .company-services
  let $generalCard = $('.company-services.service-page .general-card');
  let $generalCardImg = $('.company-services.service-page .general-card__img');
  let $sectionHead = $('.company-services.service-page .section-head');
  let $generalCardText = $('.company-services.service-page .general-card__text');
  let $companyServicesInner = $('.company-services.service-page .company-services__inner');

  function moveCardImgElem() {
    if ($(window).width() >= 1200) {
      if ($generalCardImg.parent().is($generalCard)) {
        $generalCardImg.appendTo($companyServicesInner);
      }
    } else {
      if (!$generalCardImg.parent().is($generalCard)) {
        $generalCardImg.insertBefore($generalCardText);
      }
    }
  }

  moveCardImgElem();

  $(window).resize(moveCardImgElem);


  // ПЕРЕКЛЮЧЕНИЕ СТАТЕЙ/НОВОСТЕЙ/ОБЗОРОВ НА ГЛАВНОЙ

  let infoTabEl = $('.info__inner-tabs .tab');

  infoTabEl.click(function () {
    $('.info__inner-tabs .tab').removeClass('active');
    $(this).addClass('active');

    let index = $(this).index();

    $('.info.info-slides .info__inner-slider.active').fadeOut(200, function () {
      $(this).removeClass('active');

      $('.info.info-slides .info__inner-slider').eq(index).fadeIn(200).addClass('active');
    });
  });

  infoTabEl.first().addClass('active');
  $('.info.info-slides .info__inner-slider').hide().first().addClass('active').show();

// ПЕРЕКЛЮЧЕНИЕ ОПЦИЙ ОПЛАТЫ
  let paymentSwitchEl = $('.payment-switch .switch-item');

  paymentSwitchEl.click(function () {
    $('.payment-switch .switch-item').removeClass('active');
    $(this).addClass('active');

    let index = $(this).index();

    $('.terms__inner-payment .terms-content__item.active').fadeOut(200, function () {
      $(this).removeClass('active');

      let newItem = $('.terms__inner-payment .terms-content__item').eq(index);
      newItem.css('display', 'grid').hide(); // Устанавливаем display: grid и скрываем элемент
      newItem.fadeIn(200).addClass('active'); // Затем плавно показываем элемент
    });
  });

  paymentSwitchEl.first().addClass('active');
  $('.terms__inner-payment .terms-content__item').hide().first().css('display', 'grid').addClass('active').show();



  // РАСКРЫТИЕ СТРАН В ФИЛЬТРЕ
  $('#showCountries').on('click', function () {
    // $(this).parent().toggleClass('active');

    let $countriesItems = $(this).siblings('.countries-items');

    if ($countriesItems.hasClass('expanded')) {
      // Сворачивание
      $countriesItems.css({
        'max-height': $countriesItems[0].scrollHeight + 'px' // Устанавливаем текущую высоту
      }).animate({
        'max-height': '37px' // Анимируем до высоты одного ряда
      }, 700, function () {
        $countriesItems.removeClass('expanded');
        $(this).parent().removeClass('active');
      });
    } else {
      // Раскрытие
      $countriesItems.css({
        'max-height': '37px' // Устанавливаем начальное значение max-height
      }).animate({
        'max-height': $countriesItems[0].scrollHeight + 'px' // Анимируем до полной высоты
      }, 700, function () {
        $countriesItems.addClass('expanded');
        $(this).parent().addClass('active');
      });
    }
  })

  // PRODUCT TABS
  $('.detail-tab').click(function () {
    let tabsContentEl = $('.details-content');

    $('.detail-tab').removeClass('active');
    $(this).addClass('active');

    tabsContentEl.removeClass('active');

    let index = $(this).index();
    tabsContentEl.eq(index).addClass('active');

    if (tabsContentEl.eq(index).hasClass('review') || tabsContentEl.eq(index).hasClass('accessories')) {
      let $detailItems = tabsContentEl.eq(index).find('.detail-item');
      if ($detailItems.length > 2) {
        $detailItems.slice(2).hide();
      }
    }
  });

  //  РАСКРЫТИЕ ЭЛЕМЕНТОВ В ТАБАХ

  $('.content-show-more').on('click', function() {
    let $parent = $(this).closest('.details-content');
    $parent.toggleClass('expanded');
    if ($parent.hasClass('expanded')) {
      $(this).text('скрыть');
    } else {
      $(this).text('подробнее');
    }

    if (!$parent.hasClass('description')) {
      let $detailItems = $parent.find('.detail-item');
      if ($parent.hasClass('expanded')) {
        $detailItems.slice(2).slideDown();
      } else {
        $detailItems.slice(2).slideUp();
      }
    }
  });

  // PRODUCT PAGE INFO ACTIONS CLICK

  $('.info-action').on('click', function() {

    if($(this).hasClass('action-share')) {
      let $tempInput = $('<input>'); //создание временного элемента
      $('body').append($tempInput);
      $tempInput.val(window.location.href).select(); // установка значения временного элемента как текущий URL страницы
      document.execCommand('copy'); // копирование его в буфер обмена
      $tempInput.remove(); // удаление временного элемента

      // управление текстом внутри span
      $('.info-action-alert span').text('Ссылка скопирована');
    } else {
      $('.info-action-alert span').text('Добавлено в список сравнения');
      $(this).toggleClass('active');
    }

    $('.info-action-alert').fadeIn(300).addClass('active');

    setTimeout(function() {
      $('.info-action-alert').fadeOut(300, function() {
        $(this).removeClass('active');
      });
    }, 5000);
  });

  $('.action-compare').on('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
  });
});


