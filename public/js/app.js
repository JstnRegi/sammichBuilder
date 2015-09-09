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

var lastContent;
function toggleTest() {

    $("#sidebar-wrapper ul li").click(function() {
        var target = ($(this).attr('id'));
        if(lastContent) {
            $('#' + target).animate({
                fontSize: "30px",
                marginTop: "10px",
                marginBottom: "7px"
            }, 400);
            $('#' + lastContent).animate({
                fontSize: "15px",
                marginTop: "5px",
                marginBottom: "5px"
            }, 400);
            $('#' + lastContent + '-content').fadeOut('medium', function() {

                console.log(lastContent);
                $('#' + target + '-content').fadeIn('medium');
                //$('#' + target).addClass('current-tab');


            });
        } else {
            $('#' + target + '-content').fadeIn('medium');
            $('#' + target).animate({
                fontSize: "25px",
                marginTop: "10px",
                marginBottom: "5px"
            }, 400);
            $('#instructions').animate({
                fontSize: "15px",
                marginTop: "5px",
                marginBottom: "5px"
            }, 400);
        }
        lastContent = target;
    });
    //$('#nav2')
}

function buildSammich() {
    var sammich = {};
    console.log('test');
}

function restore(elem) {
        var orig = $(elem)(this, 'css');
        $(elem).animate({
            opacity: orig.opacity,
            width: orig.width}, 500);
}

//$( "#block" ).animate({
//    width: "70%",
//    opacity: 0.4,
//    marginLeft: "0.6in",
//    fontSize: "3em",
//    borderWidth: "10px"
//}, 1500 );

