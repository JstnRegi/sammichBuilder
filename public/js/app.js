var minimumLength = 7;
var formLength = 0;
var backSpaceKey = 8;
var email;
var password;

$(function() {

    $('#login-check').on('click', function() {
        if(!document.cookie) {
            $('#myModal').modal('show')
        }
    });

    loginRegisterModal();
    passwordLength();
    //register();
    showRegister();
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
    $('#pass-length').append(0);
    $('#password-signup').on('keydown', function(e) {
        formLength = $(this).val().length;
        if(e.which === backSpaceKey && (formLength > 0)) {
            formLength--;
        }
        if((91 > e.which) && (e.which > 47)) {
            formLength++;
        }
        if(formLength < minimumLength) {
            $('#pass-length').css('color', 'red');
            $('#register-submit').hide('slow');
        } else if (formLength >= minimumLength) {
            $('#pass-length').css('color', 'green');
        }
        $('#pass-length').empty().append(formLength);
    })
}

function showRegister() {
    $('#username').change(function() {
        username = $(this).val();
    });
    $('#email').change(function() {
       email = $(this).val();
    });
    $('#password-signup').on('keydown', function() {
        password = $(this).val();
        if (password && email && username && (formLength >= minimumLength)) {
            $('#register-submit').show('slow');
        }
    });
}

function register() {
    $('#register-form').submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.post('/users', data, function(response) {
            console.log(response);
        });
    })
}
