import Ship from 'objects/Ship';

import GameState from 'states/Game';

var sprite;
var weapon;
var cursors;
var fireButton;
var planet;
var space = 32 * 500;

export default class SpaceState extends Phaser.State
{

    preload()
    {
    }
 
    create()
    {
        this.game.stage.backgroundColor = '#000';


        this.game.world.resize(space, space);



        this.landButton = this.game.input.keyboard.addKey(Phaser.KeyCode.E);


        var star_count = (((space + space) / 2) / 4);

        this.platforms = this.add.group();

        for (var i = 0; i < star_count; i++)
        {
            this.platforms.create(this.game.world.randomX, this.game.world.randomY, 'star');
        }

        // for (var i = 0; i < this.platforms.children.length; i++) {
        //     // this.platforms.children[i].tint = Math.random() * 0xffffff;
        //     this.platforms.children[i].scale.setTo(0.32, 0.32);
        //     this.platforms.children[i].rotation = Math.random();
        // }




        planet = this.add.sprite(400, 300, 'planet');
        this.game.physics.arcade.enable(planet);


        // this.ship = new Ship(this.game, 0, 0, 'dude');

        // sprite = this.ship;
        sprite = this.add.sprite(400, 300, 'ship');

        sprite.anchor.set(0.5);

        this.game.physics.arcade.enable(sprite);

        this.game.physics.arcade.gravity.y = 0;

        sprite.body.drag.set(20);
        sprite.body.maxVelocity.set(25);

        sprite.angle = -90;

        cursors = this.input.keyboard.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        sprite.body.acceleration.x = 4;
        sprite.body.maxVelocity.x = 100;
        sprite.body.maxVelocity.y = 100;

        // Camera
        this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_TOPDOWN);
    }

    update()
    {
        if (cursors.up.isDown)
        {
            this.game.physics.arcade.accelerationFromRotation(sprite.rotation, 150, sprite.body.acceleration);
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

        this.game.physics.arcade.overlap(sprite, planet, function(bullet, platform) {
            if (this.landButton.isDown)
            {
                this.state.add('Game', GameState);
                this.state.start('Game');
            }
        }, null, this);

        this.game.world.wrap(sprite, 16);
    }

    render()
    {
    }

}
