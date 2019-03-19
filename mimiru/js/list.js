$(function()
{
    db.users.count().then(function (c) {
        if (c === 0) {
            $('#is-empty-label').text('Список пуст')
        }
    })

    iterate_users(function(user) {
        $('#user-list').append(
            '<li>' +
            user.name +
            ' @' + user.username +
            ' &lt;' + user.email + '&gt; ' +
            user.position +
            '</li>')

        $('#user-list').append(
            '<img class="avatar mb-4 mt-1" src=' + user.image_url + '>' +
            '</img>')
    })
});

