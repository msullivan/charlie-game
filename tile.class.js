// Inspired/modified from http://fabricjs.com/js/sprite.class.js
// This is, I feel, a really obvious feature.

fabric.Tile = fabric.util.createClass(fabric.Image, {
    type: 'tile',

    initialize: function(element, options) {
        options || (options = { });

        this.sliceWidth = options.sliceWidth;
        this.sliceHeight = options.sliceHeight;
        this.sliceX = options.sliceX;
        this.sliceY = options.sliceY;

        this.callSuper('initialize', element, options);
    },

    _render: function(ctx) {
        ctx.drawImage(
            this.getElement(),
            this.sliceX,
            this.sliceY,
            this.sliceWidth,
            this.sliceHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
    },
});

fabric.Tile.fromURL = function(url, callback, imgOptions) {
    fabric.util.loadImage(url, function(img) {
        callback(new fabric.Tile(img, imgOptions));
    });
};

fabric.Tile.async = true;
