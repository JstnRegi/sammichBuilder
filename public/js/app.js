$(function () {
    //$('#post-picture').submit(function(e) {
    //    e.preventDefault();
    //
    //});
    renderUser();
    currentTab();
    buildSammich();
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

function renderUser() {

    var buildTemplate = _.template($('#build-template').html());
    $('#build-list').empty();
    //ajax call to get current user info
    $.get('/user', function(data) {
        var username = data.username;

        $('#craftsmen-name').append(username);

        var sammichData = data.sammichBuilds;
        console.log(sammichData);
        sammichData.forEach(function(e) {

            var sammichInfo = {
                name: e.name,
                description: e.description
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

function saveIngredients() {
    finalIngredients = ingredients;
    sammich.ingredients = finalIngredients;
    console.log(sammich.ingredients);
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
    $('#overview-picture').css('background-image', 'url(' +  sammich.picture + ')').css('background-size', '100% 100%');
}

function saveBuild() {
    var sammichFinal = sammich;
    $.post('/sammiches', sammichFinal, function(data) {
        console.log(data);
        renderUser();
    })
}



