$(document).ready(function() {

  // ПОЯВЛЕНИЕ ФИЛЬТРА МОБ И ПЛАНШЕТ

  let filterContent = $('.filter-content');

  $('.filter-button').on('click', function () {
    showFilter();
  });

  $('.filter-close').on('click', function () {
    hideFilter();
  });


  $('#resetFilter').on('click', function () {
    $('.checkbox-style input:checked').prop('checked', false);
    $('.checkbox-style label').css('background-image', 'none');
  });


  $(window).resize(function () {
    if ($(window).innerWidth() >= 1200) {
      hideFilter();
    } else if ($(window).innerWidth() < 1200 && $('.filter-filter').hasClass('active')) {
      showFilter();
    }
  });

  function showFilter() {
    filterContent.addClass('active');
    $('#page').addClass('bg-overlay');
  }

  function hideFilter() {
    filterContent.removeClass('active');
    $('.page').removeClass('bg-overlay');
  }

  // РАСКРЫТИЕ ЭЛЕМЕНТОВ

  $(".filter-head").on('click', function () {
    let filterItem = $(this).closest(".filter-item");
    let filterOptions = filterItem.find(".filter-options");
    filterOptions.slideToggle();
    filterItem.toggleClass('expanded');
  });
});