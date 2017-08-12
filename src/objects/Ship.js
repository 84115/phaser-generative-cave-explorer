/*
 * Ship
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

export default class Ship extends Phaser.Sprite
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

        game.add.existing(this);
    }

}
