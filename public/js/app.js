$(function () {
    //$('#post-picture').submit(function(e) {
    //    e.preventDefault();
    //
    //});
    renderUser();
    currentTab();
    buildSammich();
});


var imageUrl;
function buildDetails() {
    var sammichInfo;
    $('#build-list a').click(function() {
        sammichInfo = $(this).attr('id');
        $.get('/sammiches', {name: sammichInfo}, function(data) {
            var name = data.name || data;


            //$('#sandwich-picture').css('background-image', 'url(' + imageUrl + ')').css('background-size', '100% 100%');
            $('#vacant-title').empty();
            $('<div >' + name + '</div>').hide().appendTo("#vacant-title").fadeIn('fast');

            renderBuildArea(data);
        });
    });
}

function renderUser() {

    var buildTemplate = _.template($('#build-template').html());
    $('#build-list').empty();
    //ajax call to get current user info
    $.get('/user', function(data) {
        var username = data.username;
        var icon = data.picture;

        $('#craftsmen-name').empty();
        $('#craftsmen-name').append(username);

        $('#profile-icon').empty();
        $('#profile-icon').css('background', 'url(' + icon + ')').css('background-size', '100% 100%');
        //console.log(typeof(data.sammichBuilds.sammichType));
        var sammichData = data.sammichBuilds;
        sammichData.forEach(function(e) {

            var sammichInfo = {
                name: e.name,
                description: e.description || 'No sandwiches created yet!'
            };

            var sammichHtml = buildTemplate(sammichInfo);
            $('#build-list').append(sammichHtml);
        });
        buildDetails();
    });
}

function renderBuildArea(data) {
    var detailsTemplate = _.template($('#details-template').html());
    var detailsHtml = detailsTemplate(data);
    $('#vacant-content').empty();
    console.log(imageUrl);
    //$('#vacant-content').hide().append(detailsHtml).fadeIn('fast');
    $(detailsHtml).hide().appendTo('#vacant-content').fadeIn('fast');
    $('#sandwich-picture').css('background-image', 'url(' +  imageUrl + ')').css('background-size', '100% 100%');
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

var sammich = {};
sammich.description = '';
sammich.name = '';
sammich.sammichType = '';

var ingredient;
var ingredients = [];
var finalIngredients;
var stats = {};
function buildSammich() {
    $('#info-form').submit(function(e) {
        e.preventDefault();
        var name = $('#sandwich-name').val();
        var description = $('#sandwich-description').val() || 'None specified';
        var type = $('#sandwich-type').val();

        sammich.sammichType = type;
        sammich.name = name;
        sammich.description = description;
        renderOverview();
    });
    $('#materials-form').submit(function(e) {
        e.preventDefault();
        ingredient = $('#ingredient').val();
        if(ingredient) {
            ingredients.push(ingredient);
            $('#ingredient').val('');
            $('#ingredients-list').append('<li id="' + ingredient + '" class="ingredient-li">' + ingredient +
                '<button data-id="' + ingredient + '"' + ' onclick="deleteIngredient(this)" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</li>');
        }
    });
    $('#stats-form').submit(function(e) {
        e.preventDefault();
        var sweet = $('#sweet').val();
        var spicy = $('#spicy').val();
        var saltiness = $('#saltiness').val();
        var savory = $('#savory').val();
        var sour = $('#sour').val();

        stats.sweet = sweet;
        stats.spicy = spicy;
        stats.saltiness = saltiness;
        stats.savory = savory;
        stats.sour = sour;
        sammich.stats = stats;

        renderOverview();
    });
    $('#picture-form').submit(function(e) {
        e.preventDefault();
        var input = $('#image-input').val();
        var imageFile = new FormData($(this)[0]);
        if(input) {
            $.ajax({
                url: '/sammichpictures',
                type: 'POST',
                data: imageFile,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            }).done(function(data) {
                sammich.picture = data.url;
                renderOverview();
            });
        } else {
            alert('Please select an image');
        }
    });
    $('#directions-form').submit(function(e) {
        e.preventDefault();
        var directions = $('#directions-input').val() || 'None specified';
        sammich.directions = directions;

        renderOverview();
    });
    $('#save-ingredients').click(function() {
        renderOverview();
    })
}

function deleteIngredient(context) {
    var target = $(context).data().id;
    var targetPosition = ingredients.indexOf(target);
    $('#' + target).remove();
    ingredients.splice(targetPosition, 1);
}

//function build

function saveIngredients() {
    finalIngredients = ingredients;
    sammich.ingredients = finalIngredients;
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

function renderOverview() {
    var overviewTemplate = _.template($('#overview-template').html());
    var overviewHtml = overviewTemplate(sammich);
    $('#overview-info').empty();
    $('#overview-info').append(overviewHtml);
    if(sammich.picture) {
    $('#overview-picture').css('background-image', 'url(' +  sammich.picture + ')').css('background-size', '100% 100%');
    }
}

function saveBuild() {
    var sammichFinal = sammich;
    console.log(sammichFinal);
    $.post('/sammiches', sammichFinal, function(data) {
        renderUser();
    })
}





