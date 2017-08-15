import Ship from 'objects/Ship';

/*
 * Ship
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

export default class PlayerShip extends Ship
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        this.anchor.set(0.5);

        this.game.physics.arcade.enable(this);

        this.game.physics.arcade.gravity.y = 0;

        this.body.acceleration.x = 35;
        this.body.acceleration.y = 35;
        this.body.drag.set(35);
        this.body.angularDrag = 50;
        this.body.maxVelocity.x = 250;
        this.body.maxVelocity.y = 250;

        this.angle = -90;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        this.emitter = this.game.add.emitter(this.x, this.y, 250);

        this.emitter.makeParticles('star');

        this.emitter.gravity = 0;
        this.emitter.setAlpha(1, 0, 3000);
        this.emitter.setScale(0.8, 0, 0.8, 0, 3000);

        this.emitter.start(false, 3000, 1);

        // Creates 30 bullets, using the 'star' graphic
        this.weapon = this.game.add.weapon(100, 'star');

        // The bullet will be automatically killed when it leaves the world bounds
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        // The speed at which the bullet is fired
        this.weapon.bulletSpeed = 750;

        // Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon.fireRate = 100;

        // Tell the Weapon to track the 'player' Sprite
        // With no offsets from the position
        // But the 'true' argument tells the weapon to track sprite rotation
        this.weapon.trackSprite(this, 24, 0, true);

        game.add.existing(this);
    }

    update()
    {
        if (this.alive)
        {
            if (this.cursors.up.isDown)
            {
                this.game.physics.arcade.accelerationFromRotation(this.rotation, 150, this.body.acceleration);
            }
            else
            {
                this.body.acceleration.set(0);
            }

            if (this.cursors.down.isDown)
            {
                this.game.physics.arcade.accelerationFromRotation(this.rotation, -25, this.body.acceleration);
            }

            if (this.cursors.left.isDown)
            {
                this.body.angularVelocity = -300;
            }
            else if (this.cursors.right.isDown)
            {
                this.body.angularVelocity = 300;
            }
            else
            {
                this.body.angularVelocity = 0;
            }

            if (this.fireButton.isDown)
            {
                this.weapon.fire();
            }
        }
        else {
            this.emitter.kill();
        }

        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);

        this.emitter.emitX = this.body.x+15/*+16*/;
        this.emitter.emitY = this.body.y+17/*+32*/;
        // this.emitter.x = this.body.x+15;
        // this.emitter.y = this.body.y+17;

        // this.emitter.forEach(function(item) {
        //     item.rotation = this.rotation;
        // }, this);
    }

}
