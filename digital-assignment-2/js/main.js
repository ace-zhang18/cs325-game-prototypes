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
        
        this.weight = null;
        this.camera = null;
        this.baseLow = 500;
        this.baseHigh = 300;

        var pumpKey = null;
    }
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'weight', 'assets/dumbell_side.png' );
    }
    
    create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        this.weight = this.add.sprite( this.cameras.main.centerX, 500, 'weight' );
        this.cameras.main.setBackgroundColor("#FFFFFF")

        this.input.keyboard.on('keydown', this.keyDown, this);

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        let style = { font: "25px Verdana", fill: "#000000", align: "center" };
        let text = this.add.text( this.cameras.main.centerX, 100, "Player 1: Lift! Player 2: Spot!.", style );
        text.setOrigin( 0.5, 0.0 );
    }
    
    update() {
        this.weight.y += 1;
        if(this.weight.y > this.baseLow){
            this.weight.y = this.baseLow;
        } else if( this.weight.y < this.baseHigh){
            this.weight.y = this.baseHigh;
        }
        if (this.weight.y >= this.baseLow){
            this.weight.x = this.cameras.main.centerX;
        }else{
            this.weight.x += (this.weight.x - this.cameras.main.centerX) / 40;    
        }
    }

    keyDown(event) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
                this.weight.y -= 20;
                this.weight.x += Math.floor((Math.random() * 2 - 1));
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.O) {
            let oldX = this.weight.x;
            this.weight.x -= 10;
        }  else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.P) {
            let oldX = this.weight.x;
            this.weight.x += 10;
        };
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
