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
        this.player1.sunk = false;
        this.player1.lockIn = false;

        this.player2.sailors = 0;
        this.player2.gunners = 0;
        this.player2.carpenters = 0;
        this.player2.bilgers = 0;
        this.player2.crew = 8;
        this.player2.HP = 15;
        this.player2.maxHP = 15;
        this.player2.bilge = 0;
        this.player2.sunk = false;
        this.player2.lockIn = false;
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
                    console.log("SAIL")
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
            if(this.scene.player1.sunk == false) this.scene.player1.lockIn = true;

            if(this.scene.player1.lockIn == true){
                this.scene.player1.lockInDisplay = this.scene.add.text(  200, this.scene.cameras.main.height - 80, "Locked in!", style );
                this.scene.player1.lockInDisplay.setOrigin(0, 0.5);
            }
        });  
        this.player1.lockInButton.setOrigin(0, 0.5);     


        
        //player2
        this.player2.crewDisplay = this.add.text( this.cameras.main.width - 50, 20, "Crew: " + this.player2.crew, style );
        this.player2.crewDisplay.setOrigin(1, 0.5);

        this.player2.sailorDisplay = this.add.text( this.cameras.main.width - 50, 40, "Sailors: " + this.player2.sailors, style );
        this.player2.sailorDisplay.setOrigin(1, 0.5);

        this.player2.sailorPlusButton = this.add.sprite( this.cameras.main.width - 20, 40, 'plus' );
        this.player2.sailorPlusButton.setInteractive();
        this.player2.sailorPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.crew > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew -= 1;
                    this.scene.player2.sailors += 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.sailorDisplay.setText("Sailors: " + this.scene.player2.sailors);
                }
            });  
        this.player2.sailorPlusButton.setOrigin(1, 0.5);     

        this.player2.sailorMinusButton = this.add.sprite( this.cameras.main.width - 170, 40, 'minus' );
        this.player2.sailorMinusButton.setInteractive();
        this.player2.sailorMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.sailors > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew += 1;
                    this.scene.player2.sailors -= 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.sailorDisplay.setText("Sailors: " + this.scene.player2.sailors);
                }
            });
        this.player2.sailorMinusButton.setOrigin(1, 0.5);

        this.player2.gunnerDisplay = this.add.text( this.cameras.main.width - 50, 60, "Gunners: " + this.player2.gunners, style );
        this.player2.gunnerDisplay.setOrigin(1, 0.5);
        this.player2.gunnerPlusButton = this.add.sprite( this.cameras.main.width - 20, 60, 'plus' );
        this.player2.gunnerPlusButton.setInteractive();
        this.player2.gunnerPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.crew > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew -= 1;
                    this.scene.player2.gunners += 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.gunnerDisplay.setText("Gunners: " + this.scene.player2.gunners);
                }
            });
        this.player2.gunnerPlusButton.setOrigin(1, 0.5);

        this.player2.gunnerMinusButton = this.add.sprite(this.cameras.main.width - 170, 60, 'minus' );
        this.player2.gunnerMinusButton.setInteractive();
        this.player2.gunnerMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.gunners > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew += 1;
                    this.scene.player2.gunners -= 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.gunnerDisplay.setText("Gunners: " + this.scene.player2.gunners);
                }
            });        
        this.player2.gunnerMinusButton.setOrigin(1, 0.5);
        
        this.player2.carpenterDisplay = this.add.text( this.cameras.main.width - 50, 80, "Carpenters: " + this.player2.carpenters, style );
        this.player2.carpenterDisplay.setOrigin(1, 0.5);
        this.player2.carpenterPlusButton = this.add.sprite( this.cameras.main.width - 20, 80, 'plus' );
        this.player2.carpenterPlusButton.setInteractive();
        this.player2.carpenterPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.crew > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew -= 1;
                    this.scene.player2.carpenters += 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.carpenterDisplay.setText("Carpenters: " + this.scene.player2.carpenters);
                }
            });
        this.player2.carpenterPlusButton.setOrigin(1, 0.5);
        this.player2.carpenterMinusButton = this.add.sprite( this.cameras.main.width - 170, 80, 'minus' );
        this.player2.carpenterMinusButton.setInteractive();
        this.player2.carpenterMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.carpenters > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew += 1;
                    this.scene.player2.carpenters -= 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.carpenterDisplay.setText("Carpenters: " + this.scene.player2.carpenters);
                }
            });        
        this.player2.carpenterMinusButton.setOrigin(1, 0.5);

        this.player2.bilgerDisplay = this.add.text( this.cameras.main.width - 50, 100, "Bilgers: " + this.player2.bilgers, style );
        this.player2.bilgerDisplay.setOrigin(1, 0.5);
        this.player2.bilgerPlusButton = this.add.sprite( this.cameras.main.width - 20, 100, 'plus' );
        this.player2.bilgerPlusButton.setInteractive();
        this.player2.bilgerPlusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.crew > 0  && this.scene.player2.lockIn == false){
                    this.scene.player2.crew -= 1;
                    this.scene.player2.bilgers += 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.bilgerDisplay.setText("Bilgers: " + this.scene.player2.bilgers);
                }
            });
        this.player2.bilgerPlusButton.setOrigin(1, 0.5);
        this.player2.bilgerMinusButton = this.add.sprite( this.cameras.main.width - 170, 100, 'minus' );
        this.player2.bilgerMinusButton.setInteractive();
        this.player2.bilgerMinusButton.on( 'pointerdown', function( pointer ) {
                if(this.scene.player2.bilgers > 0 && this.scene.player2.lockIn == false){
                    this.scene.player2.crew += 1;
                    this.scene.player2.bilgers -= 1;
                    this.scene.player2.crewDisplay.setText("Crew: " + this.scene.player2.crew);
                    this.scene.player2.bilgerDisplay.setText("Bilgers: " + this.scene.player2.bilgers);
                }
            });        
        this.player2.bilgerMinusButton.setOrigin(1, 0.5);

        this.player2.HPDisplay = this.add.text( this.cameras.main.width - 200, 40, "HP: " + this.player2.HP + "\\" + this.player2.maxHP, style );
        this.player2.HPDisplay.setOrigin(1, 0.5);

        this.player2.BilgeDisplay = this.add.text( this.cameras.main.width - 200, 60, "Bilge: " + this.player2.bilge + "\\" + (this.player2.maxHP * 10), style );
        this.player2.BilgeDisplay.setOrigin(1, 0.5);

        this.player2.lockInButton = this.add.sprite(  this.cameras.main.width - 200, 100, 'lockin' );
        this.player2.lockInButton.setInteractive();
        this.player2.lockInButton.on( 'pointerdown', function( pointer ) {
            if(this.scene.player2.sunk == false) this.scene.player2.lockIn = true;
        
            if(this.scene.player2.lockIn == true){
                this.scene.player2.lockInDisplay = this.scene.add.text( this.scene.cameras.main.width - 200, 80, "Locked in!", style );
                this.scene.player2.lockInDisplay.setOrigin(1, 0.5);
            }
    
        });  
        this.player2.lockInButton.setOrigin(1, 0.5);     


    }
    
    update() {
        if(this.player1.lockIn == true && this.player2.lockIn == true){
            this.player1.HP += this.player1.carpenters;
            if(this.player1.HP > this.player1.maxHP) this.player1.HP = this.player1.maxHP;
            let p1dmg = this.player2.gunners - this.player1.sailors;
            if(p1dmg > 0) this.player1.HP -= p1dmg;

            this.player2.HP += this.player2.carpenters;
            if(this.player2.HP > this.player2.maxHP) this.player2.HP = this.player2.maxHP;
            let p2dmg = this.player1.gunners - this.player2.sailors;
            if(p2dmg > 0) this.player2.HP -= p2dmg;
            
            let style = { font: "16px Verdana", fill: "#000000", align: "center" };
            this.player1.HPDisplay.setText("HP: " + this.player1.HP + "\\" + this.player1.maxHP);
            this.player2.HPDisplay.setText("HP: " + this.player2.HP + "\\" + this.player2.maxHP);

            this.player1.bilge += this.player1.maxHP - this.player1.HP;
            this.player1.bilge -= this.player1.bilgers;
            if(this.player1.bilge < 0) this.player1.bilge = 0;
            this.player1.BilgeDisplay.setText( "Bilge: " + this.player1.bilge + "\\" + (this.player1.maxHP * 10));

            this.player2.bilge += this.player2.maxHP - this.player2.HP;
            this.player2.bilge -= this.player2.bilgers;
            if(this.player2.bilge < 0) this.player2.bilge = 0;
            this.player2.BilgeDisplay.setText( "Bilge: " + this.player2.bilge + "\\" + (this.player2.maxHP * 10));

            if(this.player1.HP <= 0 || this.player1.bilge >= this.player1.maxHP * 10){
                this.player1.sunk = true;

                this.player1.sunkDisplay = this.add.text( 50, this.cameras.main.height - 160, "SUNK!", style );
                this.player1.sunkDisplay.setOrigin(1, 0.5);
                        
            }

            if(this.player2.HP <= 0 || this.player2.bilge >= this.player2.maxHP * 10){
                this.player2.sunk = true;

                this.player2.sunkDisplay = this.add.text( this.cameras.main.width - 50, 160, "SUNK!", style );
                this.player2.sunkDisplay.setOrigin(1, 0.5);
                        
            }

            this.player1.lockIn = false;
            this.player2.lockIn = false;
            this.player1.lockInDisplay.setText();
            this.player2.lockInDisplay.setText()
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
