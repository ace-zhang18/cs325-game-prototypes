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
        
        this.player1 = {};
        this.player2 = {};

        this.player1.crew = 8;
        this.player1.gunners = 0;
    }
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'sloop', 'assets/sloop.png' );
        this.load.image( 'plus', 'assets/plus-button.png' );
        this.load.image( 'minus', 'assets/minus-button.png' );
    }
    
    create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        this.player1.sprite = this.add.sprite( this.cameras.main.centerX - 200, this.cameras.main.centerY + 100, 'sloop' );
        this.player2.sprite = this.add.sprite( this.cameras.main.centerX + 200, this.cameras.main.centerY - 100, 'sloop' );
        this.cameras.main.setBackgroundColor("#186896")

        let style = { font: "16px Verdana", fill: "#000000", align: "center" };
        this.player1.crewDisplay = this.add.text( 50, this.cameras.main.height - 40, "Crew: " + this.player1.crew, style );
        this.player1.crewDisplay.setOrigin(0, 0.5);
        this.player1.gunnerDisplay = this.add.text( 50, this.cameras.main.height - 60, "Gunners: " + this.player1.gunners, style );
        this.player1.gunnerDisplay.setOrigin(0, 0.5);
        this.player1.gunnerPlusButton = this.add.sprite( 160, this.cameras.main.height - 60, 'plus' );
        this.player1.gunnerPlusButton.setInteractive();
        this.player1.gunnerPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.crew > 0){
                    this.scene.player1.crew -= 1;
                    this.scene.player1.gunners += 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.gunnerDisplay.setText("Gunners: " + this.scene.player1.gunners);
                }
            });  
        this.player1.gunnerPlusButton = this.add.sprite( 20, this.cameras.main.height - 60, 'minus' );
        this.player1.gunnerPlusButton.setInteractive();
        this.player1.gunnerPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.gunners > 0){
                    this.scene.player1.crew += 1;
                    this.scene.player1.gunners -= 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.gunnerDisplay.setText("Gunners: " + this.scene.player1.gunners);
                }
            });        
        this.player1.gunnerPlusButton.setOrigin(0, 0.5);
    }
    
    update() {

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
