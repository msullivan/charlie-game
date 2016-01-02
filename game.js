(function() {

    var tiles = {
        bareFloor: {set: 'tiles1', x: 3, y: 28},
        simpleGrass: {set: 'tiles1', x: 20, y: 0},
        mageSprite: {set: 'chars', x: 0, y: 4},
    }


    var directions = {
        down:  {dx: 0, dy: 1, spriteOff: 0},
        left:  {dx: -1, dy: 0, spriteOff: 1},
        right: {dx: 1, dy: 0, spriteOff: 2},
        up:    {dx: 0, dy: -1, spriteOff: 3},
    };

    // Some data

    var TILE = 32;
    var X_TILES = 30;
    var Y_TILES = 15;

    // Lol.
    var game = {noobX: 9*TILE, noobY: 2*TILE, noobDir: 'down', noobSteps: 0};


    /////////////////////////////////////////////

    function tile(spec, x, y, dx, dy) {
        if (!dx) dx = 0;
        if (!dy) dy = 0;

        var width = spec.width || TILE;
        var height = spec.height || TILE;

        var elem = document.getElementById(spec.set);
        return new fabric.Tile(elem, {
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

    function spriteSpec(base, dir, steps) {
        return {
            set: base.set,
            x: base.x + (steps % 3),
            y: base.y + directions[dir].spriteOff,
        };
    }

    ///////////////////////////////////////////////
    // create a wrapper around native canvas element (with id="c")
    var canvas = this.__canvas = new fabric.StaticCanvas('game');

    function draw() {
        canvas.clear();

        //console.time("draw");
        // Draw floor
        for (var x = 0; x < X_TILES; x++) {
            for (var y = 0; y < Y_TILES; y++) {
                canvas.add(tile(tiles.simpleGrass, x, y));
            }
        }
        //console.timeEnd("draw");

        // Draw dude
        canvas.add(tile(spriteSpec(tiles.mageSprite, game.noobDir,
                                   game.noobSteps),
                        0, 0, game.noobX, game.noobY));

        //console.time("render");
        canvas.renderAll();
        //console.timeEnd("render");
    }

    function getDirection() {
        if (kd.W.isDown() || kd.UP.isDown()) return 'up';
        if (kd.A.isDown() || kd.LEFT.isDown()) return 'left';
        if (kd.D.isDown() || kd.RIGHT.isDown()) return 'right';
        if (kd.S.isDown() || kd.DOWN.isDown()) return 'down';
        return null;
    }

    function loop() {
        var dir = getDirection();
        if (dir) {
            game.noobDir = dir;
            game.noobX += directions[dir].dx;
            game.noobY += directions[dir].dy;
            game.noobSteps++;
        }

        draw();
    }

    function now() { return performance.now(); }

    function runAtFramerate(func, fps) {
        var interval = Math.floor(1000/fps);
        var last = 0;
        function cb() {
            if (last == null) return;
            var start = now();
            var since = start - last;

            //console.log("since last: " + since +
            //            " wanted: " + interval + " time: " + start);
            last = start;

            func(start);
        }
        cb();
        var handle = setInterval(cb, interval);
        var stopRunning = function() { clearInterval(handle); };
        return stopRunning;
    }

    function init() {
        canvas.renderOnAddRemove = false;

        kd.run(function () { kd.tick(); lol(); });
        var stopRunning;
        kd.T.press(function() { stopRunning(); });

        document.getElementById("loading").textContent = "";
        stopRunning = runAtFramerate(loop, TILE);
    }
    window.onload = init;


})();
