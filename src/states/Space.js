import PlayerShip from 'objects/PlayerShip';
import EnemyShip from 'objects/EnemyShip';

import GameState from 'states/Game';

export default class SpaceState extends Phaser.State
{
 
    create()
    {
        this.game.stage.backgroundColor = '#000';

        this.game.world.size = 32 * 500;
        this.game.world.resize(this.game.world.size, this.game.world.size);

        this.landButton = this.game.input.keyboard.addKey(Phaser.KeyCode.E);

        this.platforms = this.add.group();

        for (var i = 0; i < this.star_count(); i++)
        {
            this.platforms.create(this.game.world.randomX, this.game.world.randomY, 'star');
        }

        this.planet = this.add.sprite(400, 300, 'planet');
        // this.planet.tint = Math.random() * 0xffffff;
        
        this.game.physics.arcade.enable(this.planet);

        this.ship = new PlayerShip(this.game, 400, 300, 'ship');

        this.enemy = new EnemyShip(this.game, 300, 200, 'ship');
        this.enemy.tint = Math.random() * 0xffffff;

        // Camera
        this.game.camera.follow(this.ship, Phaser.Camera.FOLLOW_TOPDOWN);
    }

    update()
    {
        this.game.physics.arcade.moveToXY(this.enemy, this.ship.body.x - 50, this.ship.body.y - 50, 100, 200);

        this.game.physics.arcade.overlap(this.enemy, this.ship, function(enemy, ship) {
            enemy.kill();
            ship.kill();
            this.game.camera.shake(0.05, 250);
        }, null, this);

        this.game.physics.arcade.overlap(this.ship, this.planet, function(bullet, platform) {
            if (this.landButton.isDown)
            {
                this.state.add('Game', GameState);
                this.state.start('Game');
            }
        }, null, this);

        this.game.world.wrap(this.ship, 16);
    }

    star_count()
    {
        var grid = 32;
        var space = 500;
        var ratio = (grid * space) * 2;

        var formula = (((ratio) / 2) / 4);

        return formula;
    }

}
