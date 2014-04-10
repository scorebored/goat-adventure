ga.areas.shed = (function() {

    var self = {};

    s = {
        doorHitPoints: 3
    };
    self.state = s;

    self.description = function() {
        ga.say("You wake up and find yourself in a shed. The only exit is a " +
            "single door that is closed");
        if ( s.doorHitPoints === 3 ) {
            ga.say(".");
        }
    };

    var damageDoor = function() {
        if ( s.doorHitPoints === 3 ) {
            s.doorHitPoints--;
            ga.award(1);
            ga.say("The top hinge has come loose");
        } else if ( s.doorHitPoints == 2 ) {
            s.doorHitPoints--;
            ga.award(1);
            ga.say("The middle hinge has come loose");
        } else if ( s.doorHitPoints === 1 ) {
            s.doorHitPoints--;
            ga.award(5);
            ga.say("The bottom hinge has come loose and the door has " +
                   "fallen off.");
        } else {
            ga.say("The door has already fallen off. What more do you " +
                   "what to do?");
        }
    };

    var exit = function() {
        if ( s.doorHitPoints !== 0 ) {
            ga.say("There is a door in the way");
        } else {
            ga.award(3);
            ga.go("field");
        }
    };

    self.commands = [
        { match: /(kick|bash|butt).*door/, run: damageDoor },
        { match: /(exit|leave|escape)/, run: exit }
    ];

    return self;

})();

