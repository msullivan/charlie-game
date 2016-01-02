var tileData = {
    bareFloor: {set: 'tiles1', x: 3, y: 28},
    mageFront: {set: 'mage_f', x: 0, y: 2, height: 36},
    mage2Front: {set: 'chars', x: 0, y: 4},
}


// Some data

var TILE = 32;
var X_TILES = 20;
var Y_TILES = 20;

// Lol.
var game = {};


/////////////////////////////////////////////

// This seems like a really dumb way to do this.
function loadTile(spec, cb=null) {
    var canvas = document.createElement('canvas');
    canvas.height = canvas.width = TILE;
    var context = canvas.getContext('2d');
    var imgElement = document.getElementById(spec.set);

    var width = spec.width || TILE;
    var height = spec.height || TILE;
    context.drawImage(imgElement,
                      spec.x*width, spec.y*height, width, height,
                      0, 0, TILE, TILE);

    var dataurl = canvas.toDataURL('image/png');
    //var image = new Image();
    var image = fabric.util.createImage();
    image.onload = cb;
    image.src = dataurl;
    // does this leak a canvas in a bad way or something?
    return image;
}

function loadTiles(specs, cb) {
    var tiles = {};
    var total = 0;
    var count = 0;
    function innercb() {
        if (++count == total) {
            cb(tiles);
        }
    }

    for (var tile in specs) {
        total++;
        var spec = specs[tile];
        tiles[tile] = loadTile(spec, innercb);
    }
}

///////////////////////////////////////////////

function draw(tiles) {
    // create a wrapper around native canvas element (with id="c")
    var canvas = this.__canvas = new fabric.StaticCanvas('game');

    // Draw floor
    for (var x = 0; x < X_TILES; x++) {
        for (var y = 0; y < Y_TILES; y++) {
            //console.log("doing " + x + "," + y);
            var imgInstance = new fabric.Image(tiles.bareFloor, {
                left: x*TILE,
                top: y*TILE,
            });
            canvas.add(imgInstance);
        }
    }

    var noob = new fabric.Image(tiles.mage2Front, {
        left: 5*TILE,
        top: 2*TILE,
    });
    canvas.add(noob);

    canvas.renderAll();
}


function init() {
    loadTiles(tileData, draw);
}
