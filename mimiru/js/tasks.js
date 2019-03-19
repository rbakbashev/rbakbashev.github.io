$(function() {
    $('form').submit(function(event) {
        event.preventDefault()

        add_task(
            $('#input_name').val(),
            $('#input_desc').val(),
            $('#input_username').val(),
            function() {
                window.location.href = "tasks.html"
            })
    })

    db.tasks.count().then(function (c) {
        if (c === 0) {
            $('#is-empty-label').text('Список пуст')
        }
    })

    iterate_tasks(function(task) {
        $('#task-list').append(
            '<li class="mb-3">' +
            'Название: ' + task.name + '. ' +
            'Ответственный: @' + task.username +
            '</li>')
    })
});


