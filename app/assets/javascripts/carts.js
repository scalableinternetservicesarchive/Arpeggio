// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on('blur', '.rental-days', function(e) {
    var value = $(this).val();
    if (value === '' || value < 1) {
        $(this).val('1');
    }
});

$(document).on('keyup', '.rental-days', function(e) {
    var value = $(this).val();

    if (value === '' || value < 1) {
        return;
    }

    var subTotals = $.map($('.line-item'), function(lineItem) {
        var pricePerDay = parseInt($(lineItem).find('.price-per-day').data('price'), 10);
        var numDays = $(lineItem).find('.rental-days').val();

        console.log(':', pricePerDay, numDays)

        return pricePerDay * numDays;
    });
    var total = subTotals.reduce(function(prev, curr) {
        return prev + curr;
    }, 0);

    var $total = $('.total');

    $total
        .addClass('active')
        .text('$' + total.toFixed(2));

    setTimeout(function() {
        $total.removeClass('active');
    }, 1000);
});
