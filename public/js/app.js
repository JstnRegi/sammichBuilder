$(function () {


    var buildTemplate = _.template($('#build-template').html());

    //ajax call to get current user info
    $.get('/user', function(data) {
        var username = data.username;

        $('#craftsmen-name').append(username);

        var sammichData = data.sammichBuilds;
        sammichData.forEach(function(e) {

            var sammichInfo = {
                name: e.name,
                description: e.description
            };

            //$('#build-list').prepend('' +
            //'<a id="' + e.name + '"' + '><dt>' +  e.name  + '</dt></a>' +
            //'<dd>' +  e.description + '</dd>');

            var sammichHtml = buildTemplate(sammichInfo);

            $('#build-list').append(sammichHtml);
        });

        buildDetails();
        currentTab();

    });

//buildDetails();


});

function buildDetails() {
    var sammich;
    $('#build-list a').click(function() {
        sammich = $(this).attr('id');
        $.get('/sammiches', {name: sammich}, function(data) {
            var name = data.name || data;
            $('#vacant-title').empty();
            $('<div >' + name + '</div>').hide().appendTo("#vacant-title").fadeIn('fast');
            renderBuildArea(data);
        });
    });
}

function renderBuildArea(data) {
    var detailsTemplate = _.template($('#details-template').html());
    var detailsHtml = detailsTemplate(data);
    $('#vacant-content').empty();
    $('#vacant-content').append(detailsHtml);
}

var lastContent;
function currentTab() {
    $("#sidebar-wrapper ul li").click(function() {
        var target = ($(this).attr('id'));
        if(lastContent) {
            expandNavLi(target);
            restoreNavLi(lastContent);
            $('#' + lastContent + '-content').fadeOut('medium', function() {
                $('#' + target + '-content').fadeIn('medium');
            });
        } else {
            expandNavLi(target);
            $('#instructions-content').fadeOut('medium', function() {
                $('#' + target + '-content').fadeIn('medium');
            });
            restoreNavLi('instructions');
        }
        lastContent = target;
    });
}

function buildSammich() {
    var sammich = {};
    console.log('test');
}

function expandNavLi(targetId) {
    $('#' + targetId).animate({
        fontSize: "30px",
        marginTop: "10px",
        marginBottom: "7px"
    }, 400);
}

function restoreNavLi(targetId) {
    $('#' + targetId).animate({
        fontSize: "15px",
        marginTop: "5px",
        marginBottom: "5px"
    }, 400);
}



