import Enemy from 'objects/Enemy';
import Player from 'objects/Player';

var total = 0;

export default class GameState extends Phaser.State
{

    create()
    {
        this.game.stage.backgroundColor = '#000';

        this.game.world.resize(800, 3000);

        for (var i = 0; i < 250; i++)
        {
            this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'star');
        }

        this.platforms = this.add.physicsGroup();
        for (var i = 0; i < 140; i++)
        {
            this.platforms.create(this.game.world.randomX, this.game.world.randomY, 'dude');
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);

        this.player = new Player(this.game, 0, 3000, 'dude_sheet');
        this.player.tint = Math.random() * 0xffffff;

        this.enemy = new Enemy(this.game, 0, 2500, 'dude_sheet');
        this.enemy.tint = Math.random() * 0xffffff;

        //  Create our Timer
        // this.timer = new Phaser.Timer(this.game, false);
        this.timer = this.game.time.create(false);

        //  Set a TimerEvent to occur after 5 seconds
        this.timer.loop(5000, function() {
            if (!this.enemy.alive) {
                this.enemy.reset();
                this.enemy.tint = Math.random() * 0xffffff;
            }
        }, this);

        //  Start the this.timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();

        // Camera
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    }

    update()
    {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemy, this.platforms);

        // this.game.physics.arcade.moveToObject(this.enemy, this.player, 100, 200);
        this.game.physics.arcade.moveToXY(this.enemy, this.player.body.x, this.player.body.y - 300, 100, 200);

        this.game.physics.arcade.overlap(this.player.weapon.bullets, this.platforms, function(bullet, platform) {
            bullet.kill();
            platform.kill();
        }, null, this);

        if (false) {
            this.game.physics.arcade.overlap(this.player.weapon.bullets, this.enemy, function(bullet, platform) {
                bullet.kill();
                platform.kill();
                this.game.camera.shake(0.05, 250);
            }, null, this);
        }

        this.game.physics.arcade.overlap(this.enemy.weapon.bullets, this.player, function(bullet, player) {
            bullet.kill();
            player.kill();
            this.game.camera.shake(0.05, 250);
        }, null, this);
    }

}
