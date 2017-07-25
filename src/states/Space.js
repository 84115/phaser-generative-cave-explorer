import Ship from 'objects/Ship';

var sprite;
var weapon;
var cursors;
var fireButton;

export default class SpaceState extends Phaser.State
{

    preload()
    {
    }

    create()
    {
        this.game.stage.backgroundColor = '#000';

        // this.ship = new Ship(this.game, 0, 0, 'dude');

        // sprite = this.ship;
        sprite = this.add.sprite(400, 300, 'dude');

        sprite.anchor.set(0.5);

        this.game.physics.arcade.enable(sprite);

        this.game.physics.arcade.gravity.y = 125;

        sprite.body.drag.set(70);
        sprite.body.maxVelocity.set(200);

        cursors = this.input.keyboard.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    update()
    {
        if (cursors.up.isDown)
        {
            this.game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
        }
        else
        {
            sprite.body.acceleration.set(0);
        }

        if (cursors.left.isDown)
        {
            sprite.body.angularVelocity = -300;
        }
        else if (cursors.right.isDown)
        {
            sprite.body.angularVelocity = 300;
        }
        else
        {
            sprite.body.angularVelocity = 0;
        }

        // this.game.world.wrap(sprite, 16);
    }

    render()
    {
    }

}
