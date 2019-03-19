var err_callback = function(error)
{
    alert("Database error: " + error);
}

var db = new Dexie("mimiru_database")

db.version(1).stores({
    users: 'name, email, position, username, image_url',
    registered_users: 'firstname, secondname, login, password, email, address, country',
    loggedin_user: 'one, fullname, email, address, country',
    tasks: 'name, description, username'
});

var add_user = function(name, email, position, username, image_url, success_callback)
{
    db.users.put({
        name: name,
        email: email,
        position: position,
        username: username,
        image_url: image_url
    }).then(success_callback).catch(err_callback);
};

var iterate_users = function(success_callback)
{
    db.users.each(success_callback).catch(err_callback);
};

var register_user = function(firstname, secondname, login, password, email, address, country, success_callback)
{
    db.registered_users.put({
        firstname: firstname,
        secondname: secondname,
        login: login,
        password: password,
        email: email,
        address: address,
        country: country
    }).then(success_callback).catch(err_callback);
};

var add_loggedin_user = function(firstname, secondname, email, address, country, success_callback)
{
    db.loggedin_user.put({
        one: "1",
        fullname: firstname + ' ' + secondname,
        email: email,
        address: address,
        country: country
    }).then(success_callback).catch(err_callback)
}

var get_loggedin_user = function()
{
    if ($("#loggedin_username").length) {
        db.loggedin_user.get("1", function(item) {
            if (typeof item !== "undefined") {
                $("#loggedin_username").text(item.fullname)
            }
        }).catch(err_callback)
    }
}

var add_task = function(name, description, username, success_callback)
{
    db.tasks.put({
        name: name,
        description: description,
        username: username
    }).then(success_callback).catch(err_callback);
};

var iterate_tasks = function(success_callback)
{
    db.tasks.each(success_callback).catch(err_callback);
};

$(function()
{
    get_loggedin_user()
})

