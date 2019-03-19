$(function() {
    db.loggedin_user.get("1", function(item) {
        if (typeof item !== "undefined") {
            $("#info_name").text(item.fullname)
            $("#info_email").text(item.email)
            $("#info_address").text(item.address)
            $("#info_country").text(item.country)
        }
    }).catch(err_callback)
})

