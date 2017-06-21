$(document).ready(function () {
    var inputErrorClass = 'input_error',
        inputError = $('.js-form-error'),
        email = $('#email');
    $('input').on('focus', function () {
        $(this).removeClass(inputErrorClass).next(inputError).slideUp().html('');
    });

    $('#reg-form button').on('click', function(event){
        if (email.val() === '') {
            email.addClass(inputErrorClass).next(inputError).html('Заполните поле').slideDown();
            event.preventDefault();
        } else if(email.val().search('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') !== 0) {
            email.addClass(inputErrorClass).next(inputError).html('Неверный формат email').slideDown();
            event.preventDefault();
        }
    });
});