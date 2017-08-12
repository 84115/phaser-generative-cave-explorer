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

        this.body.acceleration.x = 4;
        this.body.drag.set(20);
        this.body.maxVelocity.set(25);
        this.body.maxVelocity.x = 100;
        this.body.maxVelocity.y = 100;

        this.angle = -90;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

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
    }

}
