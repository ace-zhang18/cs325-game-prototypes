import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

class MyScene extends Phaser.Scene {

    constructor() {
        super();

        this.blocks = [];
        this.highest = 0;
        this.limit = 0;

        this.keyQ = null;
        this.keyE = null;

        this.seed = null;
        this._perm = [];
    }

    preload() {
        this.load.image( 'grass', 'assets/terrain/grass.png' );
        this.load.image( 'dirt', 'assets/terrain/dirt.png' );
    }

    create() {
        //this.tile = this.add.image(400, 300, 'grass');

        var mapWidth = 20;
        var mapLength = 20;
        var halfMapHeight = 2;
        var mapDepth = 5;

        this.limit += 2 * halfMapHeight;

        var tileWidthHalf = 50;
        var tileHeightHalf = 25;

        var centerX = 400;
        var centerY = -100;

        var scale = 0.1;

        this.seedPerm();

        for (var y = 0; y < mapLength; y++)
        {
            for (var x = 0; x < mapWidth; x++)
            {
                var z = Math.floor(this.generate(x * scale, y * scale) * halfMapHeight) + halfMapHeight + 1;

                var tx = (x - y) * tileWidthHalf;
                var ty = (x + y - (z*2)) * tileHeightHalf;

                var block = this.add.image(centerX + tx, centerY + ty, 'grass');

                block.setData('x', x);
                block.setData('y', y);
                block.setData('z', z);

                block.setDepth(centerY + ty);
                
                block.setInteractive();

                this.blocks.push(block);

                /*
                for(var zFill = z-1; z > -mapDepth; z--){
                    var tx = (x - y) * tileWidthHalf;
                    var ty = (x + y - (zFill*2)) * tileHeightHalf;

                    var block = this.add.image(centerX + tx, centerY + ty, 'dirt');
    
                    block.setData('x', x);
                    block.setData('y', y);
                    block.setData('z', zFill);
    
                    block.setDepth(centerY + ty);
    
                    block.setInteractive();

                    this.blocks.push(block);
                }
                */
            }
        }

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        const controlConfig = {
            camera: this.cameras.main,
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
            acceleration: 0.7,
            drag: 0.7,
            maxSpeed: 0.7
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.cameras.main.zoom = 0.62;
        this.cameras.main.scrollX = -110;
        this.cameras.main.setBackgroundColor(0x9999FF)

        this.input.on('gameobjectdown', this.onClicked.bind(this));

        this.style = { font: "25px Verdana", fill: "#000000", align: "center" };
        this.text = this.add.text( centerX, centerY, "Highest Height: " + this.highest, this.style ).setScrollFactor(0);
        this.text.setOrigin( 0.5, 0.0 );
        this.text.setDepth(Number.MAX_SAFE_INTEGER);
    }

    onClicked(pointer, gameObject){
        let compZ = gameObject.getData("z");
        if(this.highest < compZ) this.highest = compZ;
        if(this.highest >= this.limit){
            this.text.setText("That's the limit! You won!");
        }else{
            this.text.setText("Highest Height: " + this.highest);
        }
    }

    update (time, delta)
    {
        this.controls.update(delta);
        
    }

    seedPerm ()
    {
        for(var i = 0; i < 512; i++){
            var value = Math.random() * 256;
            value = Math.floor(value);
            this._perm.push(value);
        }
    }

    generate(x, y)
    {
        const F2 = 0.366025403; // F2 = 0.5*(sqrt(3.0)-1.0)
        const G2 = 0.211324865; // G2 = (3.0-Math.sqrt(3.0))/6.0

        var n0, n1, n2; // Noise contributions from the three corners

        // Skew the input space to determine which simplex cell we're in
        var s = (x + y) * F2; // Hairy factor for 2D
        var xs = x + s;
        var ys = y + s;
        var i = Math.floor(xs);
        var j = Math.floor(ys);

        var t = (i + j) * G2;
        var X0 = i - t; // Unskew the cell origin back to (x,y) space
        var Y0 = j - t;
        var x0 = x - X0; // The x,y distances from the cell origin
        var y0 = y - Y0;

        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) { i1 = 1; j1 = 0; } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else { i1 = 0; j1 = 1; }      // upper triangle, YX order: (0,0)->(0,1)->(1,1)

        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6

        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        var y2 = y0 - 1.0 + 2.0 * G2;

        // Wrap the integer indices at 256, to avoid indexing perm[] out of bounds
        var ii = i % 256;
        var jj = j % 256;

        // Calculate the contribution from the three corners
        var t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0.0) n0 = 0.0;
        else
        {
            t0 *= t0;
            n0 = t0 * t0 * this.grad(this._perm[ii + this._perm[jj]], x0, y0);
        }

        var t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0.0) n1 = 0.0;
        else
        {
            t1 *= t1;
            n1 = t1 * t1 * this.grad(this._perm[ii + i1 + this._perm[jj + j1]], x1, y1);
        }

        var t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0.0) n2 = 0.0;
        else
        {
            t2 *= t2;
            n2 = t2 * t2 * this.grad(this._perm[ii + 1 + this._perm[jj + 1]], x2, y2);
        }

        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 40.0 * (n0 + n1 + n2); // TODO: The scale factor is preliminary!
    }

    grad(hash, x, y)
    {
        var h = hash & 7;      // Convert low 3 bits of hash code
        var u = h < 4 ? x : y;  // into 8 simple gradient directions,
        var v = h < 4 ? y : x;  // and compute the dot product with (x,y).
        return ((h & 1) != 0 ? -u : u) + ((h & 2) != 0 ? -2.0 * v : 2.0 * v);
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
