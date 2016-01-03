(function() {
    //////////// Content?
    var tiles = gameContent.tiles;
    var movementTypes = gameContent.movementTypes;
    var movementTypes = {
        person: { speed: 2, animRate: 3 },
        fireball: { speed: 5, animRate: 2 },
    };


    //////////// Constants and shit

    var directions = {
        down:  {dx: 0, dy: 1, spriteOff: 0},
        left:  {dx: -1, dy: 0, spriteOff: 1},
        right: {dx: 1, dy: 0, spriteOff: 2},
        up:    {dx: 0, dy: -1, spriteOff: 3},
    };

    var TILE = 32;
    var X_TILES = 20;
    var Y_TILES = 15;

    /////////////// Globals?

    /* "Most of what I want from jquery" */
    var $ = function(s) { return document.getElementById(s); };

    // Lol.
    var game = {noob: null, noobs: [], audioOn: true};

    // create a fabric wrapper around native canvas element.
    // I use fabric but honestly I might as well not bother. I don't
    // currently take advantage of its object model at /all/ and I
    // had to write the Tile class since basically the only thing
    // I am using canvas for wasn't supported so...
    var canvas = this.__canvas = new fabric.StaticCanvas('game');
    var audio = this.__audio = $("soundtrack");

    /////////////////////////////////////////////

    function tile(spec, x, y, dx, dy) {
        if (!dx) dx = 0;
        if (!dy) dy = 0;

        var width = spec.width || TILE;
        var height = spec.height || TILE;

        var elem = $(spec.set);
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

    function spriteSpec(base, dir, stage) {
        return {
            set: base.set,
            x: base.x + (stage % 3),
            y: base.y + directions[dir].spriteOff,
        };
    }

    ////////////////////////////////////////////////////////////
    Noob = fabric.util.createClass({
        initialize: function(obj) {
            this.moving = false;
            this.steps = 0;
            // Is this bullshit?
            // {moving, steps, direction, px, py, sprite, movement}
            for (elem in obj) this[elem] = obj[elem];
        },


        setDirection: function(direction) {
            if (direction) {
                this.direction = direction;
                this.moving = true;
            } else {
                // Keep direction set, since we use it to pick sprites
                this.moving = false;
            }
        },

        move: function() {
            if (this.moving) {
                this.px += directions[this.direction].dx * this.movement.speed;
                this.py += directions[this.direction].dy * this.movement.speed;
                this.steps++;
            }
        },

        render: function() {
            //console.log(this);
            var stage = Math.floor(this.steps / this.movement.animRate);
            var sprite = spriteSpec(this.sprite, this.direction, stage);
            return tile(sprite, 0, 0, this.px, this.py);
        }

    });

    //////////////////////////////////////////////
    function gameSetup() {
        game.noob = new Noob({
            px: 9*TILE, py: 5*TILE, direction: 'down',
            sprite: tiles.mageSprite,
            movement: movementTypes.person
        });
        game.noobs.push(game.noob);

        kd.SPACE.press(function() { launchFireball(); });
    }

    function launchFireball() {
        var noob = game.noob;
        var dir = directions[noob.direction];

        // When facing sideways, make it line up with hands more.
        var handShift = dir.dx != 0 ? 7 : 0;
        var fireball = new Noob({
            movement: movementTypes.fireball, sprite: tiles.fireball,
            direction: noob.direction,
            moving: true,
            px: noob.px + dir.dx*(TILE/2),
            py: noob.py + dir.dy*(TILE/2 + 3) + handShift,
        });
        game.noobs.push(fireball);
    }


    ///////////////////////////////////////////////
    function getTiles(abbrevs, key) {
        var l = abbrevs[key];
        if (typeof l === 'undefined' || !l) return [];
        return Array.isArray(l) ? l : [l];
    }

    function drawMap(map) {
        var abbrevs = gameContent[map.abbrevs];
        // Draw floor
        for (var x = 0; x < X_TILES; x++) {
            for (var y = 0; y < Y_TILES; y++) {
                var objs = getTiles(abbrevs, map.map[y][x]);
                for (var i = 0; i < objs.length; i++) {
                    //console.log(x + "," + y + ": " + map.map[y][x] + " " +
                    //            objs[i] + " " + tiles[objs[i]]);
                    canvas.add(tile(tiles[objs[i]], x, y));
                }
            }
        }
    }

    function draw() {
        canvas.clear();

        drawMap(gameContent.testMap);

        // Sort by y as a painters algorithm type thing.
        game.noobs.sort(function (n1, n2) { return n1.py - n2.py; });
        game.noobs.forEach(function (noob) { canvas.add(noob.render()); });

        canvas.renderAll();
    }

    function getKbdDirection() {
        if (kd.W.isDown() || kd.UP.isDown()) return 'up';
        if (kd.A.isDown() || kd.LEFT.isDown()) return 'left';
        if (kd.D.isDown() || kd.RIGHT.isDown()) return 'right';
        if (kd.S.isDown() || kd.DOWN.isDown()) return 'down';
        return null;
    }

    function tick() {
        game.noob.setDirection(getKbdDirection());
        game.noobs.forEach(function (noob) { noob.move(); });


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

        gameSetup();

        audio.play();

        kd.run(function () { kd.tick(); });
        var stopRunning;
        kd.Q.press(function() {
            audio.pause();
            stopRunning();
        });

        kd.M.press(function() {
            game.audioOn = !game.audioOn;
            audio.volume = game.audioOn ? 1 : 0;
        });


        $("loading").textContent = "";
        stopRunning = runAtFramerate(tick, TILE);
    }
    window.onload = init;


})();
