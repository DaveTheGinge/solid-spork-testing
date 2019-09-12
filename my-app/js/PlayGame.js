class PlayGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }
    create(){
        // Loading Game
        // Creating Titled Sprites  // Refactor
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky");
        // Setting Pivot Point (Left Corner)
        this.sky.setOrigin(0, 0);
        // Fix Sky (So It Doesn't Move When Camera Moves)
        this.sky.setScrollFactor(0);
        
        // Adding Second Background (Sides) // Refactor
        this.sides = this.add.tileSprite(0, 0, 0, 0, "sides");
        // Setting Pivot Point (Left Corner)
        this.sides.setOrigin(0, 0);
        // Setting Scale
        this.sides.setScale(0.2, 0.2);
        // Fix Sky (So It Doesn't Move When Camera Moves)
        this.sides.setScrollFactor(0);

        // Starting Platform
        this.startPlatform = this.physics.add.staticGroup();
        this.startPlatform.create(this.game.config.width / 2, game.config.height / 1.2, 'log').setScale(0.2).refreshBody();

        // Creating Random Platforms Group
        this.platformGroup = this.physics.add.staticGroup();

        // Creating 20 Platform in platformGroup
        for (var i = 0; i < 20; i++) {
            this.platformGroup.create(randX(), randY(), 'grass').setScale(0.2).refreshBody();
            this.platformGroup.create(randX(), randY(), 'log').setScale(0.2).refreshBody();
        }

        // Console.log (for debugging)
        console.log('Platform Group::', this.platformGroup);

        // Add pinkMonster
        this.pinkMonster = this.physics.add.sprite(game.config.width / 2, game.config.height / 1.2, 'pinkMonster');
        // Create pinkMonster Animation (Idle)
        this.anims.create ({
            key: 'idle',
            frames:
            this.anims.generateFrameNumbers('pinkMonster'), frameRate: 20,
            repeat: -1
        });
        this.pinkMonster.play('idle');
        
        // Adding Collision With Starting Platform
        this.physics.add.collider(this.pinkMonster, this.startPlatform);
        // Adding Collision With Endless Platforms
        this.physics.add.collider(this.pinkMonster, this.platformGroup);

        // Key Inputs To Control The pinkMonster
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        // spawnRandomPlatform(this.log, this.platform);
        // checkX(this.endlessPlatforms)
        // checkY(this.endlessPlatforms)

        // Keyboard Inputs
        if (this.cursors.left.isDown) {
            this.pinkMonster.setVelocityX(-160);
            this.pinkMonster.anims.play('idle', true);
            this.pinkMonster.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.pinkMonster.setVelocityX(160);
            this.pinkMonster.anims.play('idle', true);
            this.pinkMonster.flipX = false;
        }

        // Check For Collision With Platform
        if (this.physics.add.collider(this.pinkMonster)){
            // If Collision - Y ( Bounce )
            this.pinkMonster.y -= 8;
        }

         // Destroy pinkMonster If pinkMoster Falls Off Screen
         if(this.pinkMonster.y > game.config.height) {
             this.pinkMonster.disableBody(true, true)
             console.log('Sprite DESTROYED::', this.pinkMonster, 'Disabled body::', this.pinkMonster.disableBody);
         }
    }
}