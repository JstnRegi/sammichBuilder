$(function () {

    //create template for profile area
    var profileTemplate = _.template($('#profile-area-template').html());

    //ajax call to get current user info
    $.get('/user', function(data) {
        console.log(data);
        var profileData = data;
        var profileHtml = profileTemplate(profileData);

        $('#profile-area').append(profileHtml);
    })
});

var $booksCon = $("#booksCon");
var bookHTML = $("#bookTemp").html();
var bookTemp = _.template(bookHTML);

$.get("/books").
    done(function(data) {
        console.log(data);
        $(data).each(function (index, book) {
            var $book = $(bookTemp(book));
            $booksCon.append($book);
        });
    });