import Ship from 'objects/Ship';

/*
 * Ship
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

export default class EnemyShip extends Ship
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        this.anchor.set(0.5);

        this.game.physics.arcade.enable(this);

        this.game.physics.arcade.gravity.y = 0;

        this.body.acceleration.x = 0;
        this.body.drag.set(20-5);
        this.body.maxVelocity.set(25-5);
        this.body.maxVelocity.x = 100-15;
        this.body.maxVelocity.y = 100-15;

        this.angle = -90;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        game.add.existing(this);
    }

}
