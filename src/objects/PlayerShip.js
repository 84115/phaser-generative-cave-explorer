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

        this.body.acceleration.x = 10;
        this.body.acceleration.y = 10;
        this.body.drag.set(20);
        this.body.maxVelocity.set(25);
        this.body.maxVelocity.x = 100;
        this.body.maxVelocity.y = 100;

        this.angle = -90;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        this.leftEemitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);

        this.leftEemitter.makeParticles('star');

        this.leftEemitter.gravity = 0;
        this.leftEemitter.setAlpha(1, 0, 3000);
        this.leftEemitter.setScale(0.8, 0, 0.8, 0, 3000);

        this.leftEemitter.start(false, 3000, 1);

        this.rightEemitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);

        this.rightEemitter.makeParticles('star');

        this.rightEemitter.gravity = 0;
        this.rightEemitter.setAlpha(1, 0, 3000);
        this.rightEemitter.setScale(0.8, 0, 0.8, 0, 3000);

        this.rightEemitter.start(false, 3000, 1);

        game.add.existing(this);
    }

    update()
    {
        if (this.cursors.up.isDown)
        {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 150, this.body.acceleration);
        }
        else
        {
            this.body.acceleration.set(0);
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

        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.leftEemitter.minParticleSpeed.set(px, py);
        this.leftEemitter.maxParticleSpeed.set(px, py);

        this.leftEemitter.emitX = this.x-6;
        this.leftEemitter.emitY = this.y+16;

        this.rightEemitter.minParticleSpeed.set(px, py);
        this.rightEemitter.maxParticleSpeed.set(px, py);

        this.rightEemitter.emitX = this.x+6;
        this.rightEemitter.emitY = this.y+16;
    }

}
