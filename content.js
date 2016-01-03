(function() {
    if (typeof gameContent === 'undefined') gameContent = {};

    gameContent.tiles = {
        bareFloor1: {set: 'tiles2', x: 0, y: 20},
        bareFloor2: {set: 'tiles2', x: 1, y: 20},
        bareFloor3: {set: 'tiles2', x: 2, y: 20},
        bareFloor4: {set: 'tiles2', x: 0, y: 21},
        bareFloor5: {set: 'tiles2', x: 1, y: 21},
        bareFloor6: {set: 'tiles2', x: 2, y: 21},


        simpleGrass: {set: 'tiles1', x: 20, y: 0},
        mageSprite: {set: 'chars', x: 0, y: 4},
        fireball: {set: 'fireball', x: 0, y: 0},
    }

    gameContent.movementTypes = {
        person: { speed: 2, animRate: 3 },
        fireball: { speed: 5, animRate: 2 },
    };


})();
