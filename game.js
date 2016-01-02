(function() {

    var tiles = {
        bareFloor: {set: 'tiles1', x: 3, y: 28},
        simpleGrass: {set: 'tiles1', x: 20, y: 0},
        mageFront: {set: 'chars', x: 0, y: 4},
    }


    // Some data

    var TILE = 32;
    var X_TILES = 20;
    var Y_TILES = 20;

    // Lol.
    var game = {};


    /////////////////////////////////////////////

    function tile(spec, x, y, dx=0, dy=0) {
        var width = spec.width || TILE;
        var height = spec.height || TILE;

        return new fabric.Tile(document.getElementById(spec.set), {
            left: x*TILE + dx,
            top: y*TILE + dy,
            sliceX: spec.x*width,
            sliceY: spec.y*height,
            sliceHeight: height,
            sliceWidth: width,
            width: TILE,
            height: TILE,
        });
    }

    ///////////////////////////////////////////////
    // create a wrapper around native canvas element (with id="c")
    var canvas = this.__canvas = new fabric.StaticCanvas('game');

    function draw() {
        // Draw floor
        for (var x = 0; x < X_TILES; x++) {
            for (var y = 0; y < Y_TILES; y++) {
                canvas.add(tile(tiles.simpleGrass, x, y));
            }
        }

        // Draw dude
        canvas.add(tile(tiles.mageFront, 9, 2));

        canvas.renderAll();
    }


    function init() {
        document.getElementById("loading").textContent = "";
        draw();
    }
    window.onload = init;


})();
