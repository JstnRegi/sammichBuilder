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
        toggleTest();

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
            //$('#vacant-title').fadeIn('slow', function() {
            //    $('#vacant-title').append(data.name || data);
            //});
            console.log(data);
            renderBuild(data);
        });
        console.log(sammich);
    });
}

function renderBuild(data) {
    var detailsTemplate = _.template($('#details-template').html());

    var detailsHtml = detailsTemplate(data);

    $('#vacant-content').empty();
    $('#vacant-content').append(detailsHtml);

}


function toggleTest() {
    var lastContent;
    $("#sidebar-wrapper ul li").click(function() {
        var target = ($(this).attr('id'));
        if(lastContent) {
            $('#' + lastContent + '-content').fadeOut('medium', function() {
                $('#' + target + '-content').fadeIn('medium');
            });
        } else {
            $('#' + target + '-content').fadeIn('medium');
        }
        lastContent = target;
        console.log(target);
    });
    //$('#nav2')
}

