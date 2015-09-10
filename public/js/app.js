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
        buildSammich();

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


function currentTab() {
    var lastContent;
    var target;
    $("#sidebar-wrapper ul li").click(function() {
         target = ($(this).attr('id'));
        if(lastContent) {
            $('#' + lastContent + '-content').fadeOut('medium', function() {
                $('#' + target + '-content').fadeIn('medium');
            });
        } else {
            $('#instructions-content').fadeOut('medium', function() {
                $('#' + target + '-content').fadeIn('medium');
            });
        }
        console.log(target);
        lastContent = target;
    });
    var hoverTarget;
    $('#sidebar-wrapper ul li').hover( function() {
            hoverTarget = ($(this).attr('id'));
            expandNavLi(hoverTarget);
        }, function() {
            restoreNavLi(hoverTarget);
        }
    );
}

function buildSammich() {
    var sammich = {};
    $('#info-form').submit(function(e) {
        e.preventDefault();
        var name = $('#sandwich-name').val();
        var description = $('#sandwich-description').val();

        sammich.name = name;
        sammich.description = description;
        console.log(sammich);
    });
}

function expandNavLi(targetId) {
    $('#' + targetId).animate({
        fontSize: "30px",
        marginTop: "10px",
        marginBottom: "7px"
    }, {
        duration: 200,
        specialEasing: {
            //width: "linear",
            height: "easeOutBounce"
        }});
}

function restoreNavLi(targetId) {
    $('#' + targetId).animate({
        fontSize: "15px",
        marginTop: "5px",
        marginBottom: "5px"
    }, 400);
}



