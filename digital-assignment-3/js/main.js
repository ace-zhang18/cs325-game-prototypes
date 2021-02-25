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

        this.player1.sailors = 0;
        this.player1.gunners = 0;
        this.player1.carpenters = 0;
        this.player1.bilgers = 0;
        this.player1.crew = 8;
        this.player1.HP = 15;
        this.player1.maxHP = 15;
        this.player1.bilge = 0;
    }
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'sloop', 'assets/sloop.png' );
        this.load.image( 'plus', 'assets/plus-button.png' );
        this.load.image( 'minus', 'assets/minus-button.png' );
        this.load.image( 'lockin', 'assets/lock-in.png' );
    }
    
    create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        this.player1.sprite = this.add.sprite( this.cameras.main.centerX - 200, this.cameras.main.centerY + 100, 'sloop' );
        this.player2.sprite = this.add.sprite( this.cameras.main.centerX + 200, this.cameras.main.centerY - 100, 'sloop' );
        this.cameras.main.setBackgroundColor("#186896")

        let style = { font: "16px Verdana", fill: "#000000", align: "center" };
        this.player1.crewDisplay = this.add.text( 50, this.cameras.main.height - 40, "Crew: " + this.player1.crew, style );
        this.player1.crewDisplay.setOrigin(0, 0.5);

        this.player1.sailorDisplay = this.add.text( 50, this.cameras.main.height - 120, "Sailors: " + this.player1.sailors, style );
        this.player1.sailorDisplay.setOrigin(0, 0.5);

        this.player1.sailorPlusButton = this.add.sprite( 170, this.cameras.main.height - 120, 'plus' );
        this.player1.sailorPlusButton.setInteractive();
        this.player1.sailorPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.crew > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew -= 1;
                    this.scene.player1.sailors += 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.sailorDisplay.setText("Sailors: " + this.scene.player1.sailors);
                }
            });  
        this.player1.sailorPlusButton.setOrigin(0, 0.5);     

        this.player1.sailorMinusButton = this.add.sprite( 20, this.cameras.main.height - 120, 'minus' );
        this.player1.sailorMinusButton.setInteractive();
        this.player1.sailorMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.sailors > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew += 1;
                    this.scene.player1.sailors -= 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.sailorDisplay.setText("Sailors: " + this.scene.player1.sailors);
                }
            });
        this.player1.sailorMinusButton.setOrigin(0, 0.5);

        this.player1.gunnerDisplay = this.add.text( 50, this.cameras.main.height - 100, "Gunners: " + this.player1.gunners, style );
        this.player1.gunnerDisplay.setOrigin(0, 0.5);
        this.player1.gunnerPlusButton = this.add.sprite( 170, this.cameras.main.height - 100, 'plus' );
        this.player1.gunnerPlusButton.setInteractive();
        this.player1.gunnerPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.crew > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew -= 1;
                    this.scene.player1.gunners += 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.gunnerDisplay.setText("Gunners: " + this.scene.player1.gunners);
                }
            });
        this.player1.gunnerPlusButton.setOrigin(0, 0.5);

        this.player1.gunnerMinusButton = this.add.sprite( 20, this.cameras.main.height - 100, 'minus' );
        this.player1.gunnerMinusButton.setInteractive();
        this.player1.gunnerMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.gunners > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew += 1;
                    this.scene.player1.gunners -= 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.gunnerDisplay.setText("Gunners: " + this.scene.player1.gunners);
                }
            });        
        this.player1.gunnerMinusButton.setOrigin(0, 0.5);
        
        this.player1.carpenterDisplay = this.add.text( 50, this.cameras.main.height - 80, "Carpenters: " + this.player1.carpenters, style );
        this.player1.carpenterDisplay.setOrigin(0, 0.5);
        this.player1.carpenterPlusButton = this.add.sprite( 170, this.cameras.main.height - 80, 'plus' );
        this.player1.carpenterPlusButton.setInteractive();
        this.player1.carpenterPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.crew > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew -= 1;
                    this.scene.player1.carpenters += 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.carpenterDisplay.setText("Carpenters: " + this.scene.player1.carpenters);
                }
            });
        this.player1.carpenterPlusButton.setOrigin(0, 0.5);
        this.player1.carpenterMinusButton = this.add.sprite( 20, this.cameras.main.height - 80, 'minus' );
        this.player1.carpenterMinusButton.setInteractive();
        this.player1.carpenterMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.carpenters > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew += 1;
                    this.scene.player1.carpenters -= 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.carpenterDisplay.setText("Carpenters: " + this.scene.player1.carpenters);
                }
            });        
        this.player1.carpenterMinusButton.setOrigin(0, 0.5);

        this.player1.bilgerDisplay = this.add.text( 50, this.cameras.main.height - 60, "Bilgers: " + this.player1.bilgers, style );
        this.player1.bilgerDisplay.setOrigin(0, 0.5);
        this.player1.bilgerPlusButton = this.add.sprite( 170, this.cameras.main.height - 60, 'plus' );
        this.player1.bilgerPlusButton.setInteractive();
        this.player1.bilgerPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.crew > 0  && this.scene.player1.lockIn == false){
                    this.scene.player1.crew -= 1;
                    this.scene.player1.bilgers += 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.bilgerDisplay.setText("Bilgers: " + this.scene.player1.bilgers);
                }
            });
        this.player1.bilgerPlusButton.setOrigin(0, 0.5);
        this.player1.bilgerMinusButton = this.add.sprite( 20, this.cameras.main.height - 60, 'minus' );
        this.player1.bilgerMinusButton.setInteractive();
        this.player1.bilgerMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player1.bilgers > 0 && this.scene.player1.lockIn == false){
                    this.scene.player1.crew += 1;
                    this.scene.player1.bilgers -= 1;
                    this.scene.player1.crewDisplay.setText("Crew: " + this.scene.player1.crew);
                    this.scene.player1.bilgerDisplay.setText("Bilgers: " + this.scene.player1.bilgers);
                }
            });        
        this.player1.bilgerMinusButton.setOrigin(0, 0.5);

        this.player1.HPDisplay = this.add.text( 200, this.cameras.main.height - 120, "HP: " + this.player1.HP + "\\" + this.player1.maxHP, style );
        this.player1.HPDisplay.setOrigin(0, 0.5);

        this.player1.BilgeDisplay = this.add.text( 200, this.cameras.main.height - 100, "Bilge: " + this.player1.bilge + "\\" + (this.player1.maxHP * 10), style );
        this.player1.BilgeDisplay.setOrigin(0, 0.5);

        this.player1.lockInButton = this.add.sprite( 200, this.cameras.main.height - 60, 'lockin' );
        this.player1.lockInButton.setInteractive();
        this.player1.lockInButton.on( 'pointerdown', function( pointer ) {
                this.scene.player1.lockIn = true;
            });  
        this.player1.lockInButton.setOrigin(0, 0.5);     
    }
    
    update() {
        if(this.player1.lockIn == true){
            this.player1.HP += this.player1.carpenters;
            if(this.player1.HP > this.player1.maxHP) this.player1.HP = this.player1.maxHP;
            let p1dmg = 6 - this.player1.sailors;
            if(p1dmg > 0) this.player1.HP -= p1dmg;

            this.player1.HPDisplay.setText("HP: " + this.player1.HP + "\\" + this.player1.maxHP);

            this.player1.bilge += this.player1.maxHP - this.player1.HP;
            this.player1.bilge -= this.player1.bilgers;
            if(this.player1.bilge < 0) this.player1.bilge = 0;
            this.player1.BilgeDisplay.setText( "Bilge: " + this.player1.bilge + "\\" + (this.player1.maxHP * 10));
            
            this.player1.lockIn = false;
        }
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
