
var TILE = 32;
var X_TILES = 40;
var Y_TILES = 40;

// Lol.
var game = {};

// This seems like a really dumb way to do this.
function getTile(set, xtile, ytile) {
    var canvas=document.createElement('canvas')
    var context=canvas.getContext('2d');
    var imgElement = document.getElementById(set);
    context.drawImage(imgElement,
                      xtile*TILE, ytile*TILE, TILE, TILE,
                      0, 0, TILE, TILE);

    var image = new Image();
    image.src = canvas.toDataURL();
    // XXX: Delete or something?
    return image;
}

function draw() {
    // create a wrapper around native canvas element (with id="c")
    var canvas = new fabric.StaticCanvas('game');

    // Draw floor
    var floor = getTile('tiles1', 3, 28);
    for (var x = 0; x < X_TILES; x++) {
        for (var y = 0; y < Y_TILES; y++) {
            console.log("doing " + x + "," + y);
            var imgInstance = new fabric.Image(floor, {
                left: x*TILE,
                top: y*TILE,
            });
            canvas.add(imgInstance);
        }
    }

    // create a rectangle object
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
    });

    // "add" rectangle onto canvas
    canvas.add(rect);
}


function init() {
    draw();
}
