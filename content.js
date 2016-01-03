(function() {
    if (typeof gameContent === "undefined") gameContent = {};

    gameContent.tiles = {
        bareFloor1: {set: "tiles2", x: 0, y: 20},
        bareFloor2: {set: "tiles2", x: 1, y: 20},
        bareFloor3: {set: "tiles2", x: 2, y: 20},
        bareFloor4: {set: "tiles2", x: 0, y: 21},
        bareFloor5: {set: "tiles2", x: 1, y: 21},
        bareFloor6: {set: "tiles2", x: 2, y: 21},

        topWallAbove: {set: "tiles1", x: 0, y: 28},
        topWall: {set: "tiles1", x: 0, y: 27},
        leftWall: {set: "tiles2", x: 7, y: 4},
        rightWall: {set: "tiles2", x: 7, y: 5},
        topLeftWall: {set: "tiles1", x: 3, y: 26},
        topRightWall: {set: "tiles1", x: 4, y: 26},
        bottomWallOverlay: {set: "tiles1", x: 1, y: 29},
        bottomLeftWallOverlay: {set: "tiles1", x: 3, y: 29},
        bottomRightWallOverlay: {set: "tiles1", x: 4, y: 29},

        blank: {set: "tiles2", x: 4, y: 21},

        simpleGrass: {set: "tiles1", x: 20, y: 0},
        mageSprite: {set: "chars", x: 0, y: 4},
        fireball: {set: "fireball", x: 0, y: 0},
    }

    gameContent.movementTypes = {
        person: { speed: 2, animRate: 3 },
        fireball: { speed: 5, animRate: 2 },
    };

    gameContent.dungeonAbbrev = {
        "1": "bareFloor1",
        "2": "bareFloor2",
        "3": "bareFloor3",
        "4": "bareFloor4",
        "5": "bareFloor5",
        "6": "bareFloor6",
        " ": "blank",

        "^": "topWallAbove",
        "-": "topWall",
        "[": "leftWall",
        "]": "rightWall",
        "_": ["bareFloor3", "bottomWallOverlay"],
        "/": "topLeftWall",
        "`": "topRightWall",
        "<": ["bareFloor1", "bottomLeftWallOverlay"],
        ">": ["bareFloor4", "bottomRightWallOverlay"],
    };

    gameContent.emptyMap = {
        "abbrevs": "dungeonAbbrev",
        "map": [
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
        ]
    };

    gameContent.testMap = {
        "abbrevs": "dungeonAbbrev",
        "map": [
            "                    ",
            "                    ",
            "                    ",
            "    ^^^^^^^^^^^^    ",
            "    /----------`    ",
            "    [1234561234]    ",
            "    [5612345612]    ",
            "    [3456123456]    ",
            "    [1234561234]    ",
            "    [5612345612]    ",
            "    [3456123456]    ",
            "    <__________>    ",
            "                    ",
            "                    ",
            "                    ",
        ]
    };

})();
