$("#menu-toggle").click(function(e) {
    e.preventDefault()
    $("#wrapper").toggleClass("toggled")

    if ($("#menu-toggle").text() === "Свернуть меню") {
        $("#menu-toggle").text("Раскрыть меню")
    } else {
        $("#menu-toggle").text("Свернуть меню")
    }
});

