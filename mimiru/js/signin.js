$(function()
{
    $("#signin-button").on("click", function() {
        db.registered_users.get({
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }).then(function(item) {
            if (typeof item !== "undefined") {
                window.location.href = "account.html";
            } else {
                $("#errortext").text("Пользователь не найден")
            }
        }).catch(err_callback)
    })
})

