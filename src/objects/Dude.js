import Sprite from 'objects/Sprite';

/*
 * Dude
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

export default class Dude extends Sprite
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        this.createPhysics();
    }

    addExisting(scope)
    {
        scope.game.add.existing(this);

        return this;
    }

    createPhysics()
    {
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.gravity.y = 500;
        this.body.maxVelocity.y = 500;
        this.body.bounce.y = 0.1;
        this.body.collideWorldBounds = true;
    }

}
