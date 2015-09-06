$(function() {

    $('#login-check').on('click', function() {
        if(!document.cookie) {
            $('#myModal').modal('show')
        }
    });

    loginRegisterModal();
    passwordLength();
});


function loginRegisterModal() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
}

function passwordLength() {
    var length = 10;
    $('#pass-length').append(length);
    $('#password-signup').on('keypress', function() {
        length--;
        $('#pass-length').empty().append(length);
    });
}