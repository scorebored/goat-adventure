
var ga = ga || {};

$(function() {

    var $input  = $("#input input");
    var $output = $("#output textarea");

    ga.player = {
        name: "Billy the Goat",
        level: 1,
        score: 0
    };

    ga.areas = [];
    ga.area = null;

    ga.say = function(text) {
        $output.append(text);
    };

    ga.award = function(points) {
        ga.player.score += points;
        updateStats();
    };

    var updateStats = function() {
        $("#player .name").html(ga.player.name);
        $("#player .level").html(ga.player.level);
        $("#player .score").html(ga.player.score);
    };

    var noOpen = function() {
        ga.say("Open with what? You are a goat. You don't have hands!");
    };

    ga.postCommands = [
        { match: /open/, run: noOpen }
    ];

    ga.go = function(areaName) {
        yepnope([{
            load: "js/areas/ga.area." + areaName + ".js",
            complete: function() {
                area = ga.areas[areaName];
                enterArea();
            }
        }]);
    };

    var enterArea = function() {
        area.description();
    };

    var handler = function() {
        $output.html("");
        var text = $(this).val();

        var found = false;
        _.each(area.commands, function(command) {
            if ( command.match.test(text) ) {
                command.run();
                found = true;
                return false;
            }
        });
        if ( !found ) {
            _.each(ga.postCommands, function(postCommand) {
                if ( postCommand.match.test(text) ) {
                    postCommand.run();
                    found = true;
                    return false;
                };
            });
        }
        if ( !found ) {
            ga.say("Whatcha talking about Willis");
        }

        $input.val("");
        $input.focus();
    };

    $input.focus();
    $input.change(handler);
    updateStats();

    ga.go("shed");

});



