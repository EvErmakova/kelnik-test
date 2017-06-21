$(document).ready(function () {
    var sortingTop = 'sorting__item_top',
        sortingBottom = 'sorting__item_bottom';
    $('.js-sorting').on('click', function () {
        if ($(this).hasClass(sortingTop)) {
            $(this).removeClass(sortingTop).addClass(sortingBottom);
        } else {
            $(this).removeClass(sortingBottom).addClass(sortingTop);
        }
    });
});