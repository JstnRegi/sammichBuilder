$(function() {

    $('#login-check').on('click', function() {
        if(!document.cookie) {
            $('#myModal').modal('show')
        }
    });

    loginRegisterModal();
    passwordLength();
    preventSubmitDefaults()
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
    var minimumLength = 7;
    var formLength = 0;
    var backSpaceKey = 8;
    $('#pass-length').append(0);
    $('#password-signup').on('keydown', function(e) {
        if(e.which === backSpaceKey) {
            formLength--;
            if(formLength < minimumLength) {
                $('#pass-length').empty().css('color', 'red').append(formLength);
            } else if (formLength >= minimumLength) {
                $('#pass-length').empty().css('color', 'green').append(formLength);
            }
        } else {
            formLength++;
            if(formLength < minimumLength) {
                $('#pass-length').empty().css('color', 'red').append(formLength);
            } else if (formLength >= minimumLength) {
                $('#pass-length').empty().css('color', 'green').append(formLength);
            }
        }
    })
}

function preventSubmitDefaults() {
    $('#register-form').submit(function(e) {
        e.preventDefault();
    })
}