(function () {
    'use strict'

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    }, false)
}())

$(function()
{
    $('form').submit(function(event) {
        event.preventDefault()

        register_user(
            $('#firstName').val(),
            $('#lastName').val(),
            $('#username').val(),
            $('#input_password').val(), // no, I am not being paid enough (actually at all) to do this
            $('#email').val(),
            $('#address').val(),
            $('#country').val(),
            function() {
                add_loggedin_user(
                    $('#firstName').val(),
                    $('#lastName').val(),
                    $('#email').val(),
                    $('#address').val(),
                    $('#country').val(),
                    function() {
                        window.location.href = "signin.html"
                    })
            })
    })
});

