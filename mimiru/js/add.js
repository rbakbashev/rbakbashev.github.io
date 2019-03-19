var deepArtEffectsClient = apigClientFactory.newClient({
    // these are free test plan keys, so don't get too excited
    apiKey: 'gsNkBjFDCQ8cFBoXnuwUwe5m0TTarpW1jUKCVYh8',
    accessKey: 'AKIAJ2U4MSZCRQQOW7RA',
    secretKey: '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',
});

var imageBinary;
var maxImageSize = "512";
var resultCheck

function uploadImage(styleId) {
    if (imageBinary == null) {
        alert('Пожалуйста загрузите сначала фотографию')
        return;
    }

    var body = {
        'styleId': styleId,
        'imageBase64Encoded': imageBinary,
        'optimizeForPrint': false,
        'useOriginalColors': true,
        'imageSize': maxImageSize
    };

    $('#loading_label').text('Обработка фотографии...')

    deepArtEffectsClient.uploadPost(null, body).then(function(result) {
        console.log("Successfully uploaded image");
        submissionId = result.data.submissionId
        resultCheck = setInterval(imageReadyCheck, 1100);
    }).catch(function(result) {
        console.log("Error uploading image");
    });
}

function imageReadyCheck() {
    var params = {
        submissionId: submissionId,
    };

    deepArtEffectsClient.resultGet(params).then(function(result) {
        console.log("Successfully status check");
        if (result.data.status == "finished") {
            console.log('image uploaded: ' + result.data.url)

            clearInterval(resultCheck);

            add_user(
                $('#inputFIO').val(),
                $('#inputEmail').val(),
                $('#inputPos').val(),
                $('#inputUsername').val(),
                result.data.url,
                function() {
                    window.location.href = "list.html";
                })
        }
    }).catch(function(result) {
        console.log("Error checking status: " + result);
    });
}

function onFileSelected(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
        ImageTools.resize(file, { width: maxImageSize, height: maxImageSize },
            function(blob, didItResize) {
                var reader = new FileReader();
                reader.onload = function(readerEvt) {
                    imageBinary = btoa(readerEvt.target.result);
                };
                reader.readAsBinaryString(blob);
            }
        );
    }
}

$(function() {
    deepArtEffectsClient.stylesGet().then(function(result) {
        console.log("Successfully loaded styles");

        var ol = $('<ol id="selectable">');
        ol.appendTo('#style-list')

        styles = result.data;
        for (var i = 0; i < 21; i++) {
            var li = $("<li>");
            li.attr('onClick', "uploadImage('" + styles[i].id + "')")

            var div = $('<div class="style">');
            div.attr('style', "background-image: url("+styles[i].url+")");

            li.append(div);
            li.appendTo('#selectable');
        }
    }).catch(function(result) {
        alert("Ошибка загрузки стилей");
    });
})

