import Dude from 'objects/Dude';

export default class GameState extends Phaser.State
{

    create()
    {
        this.game.stage.backgroundColor = '#000daw';

        this.game.world.resize(800, 3000);

        for (var i = 0; i < 300; i++)
        {
            this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'star');
        }

        this.platforms = this.add.physicsGroup();
        for (var i = 0; i < 100; i++)
        {
            this.platforms.create(this.game.world.randomX, this.game.world.randomY, 'dude');
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);

        this.dude = new Dude(this.game, 0, 3000, 'dude_sheet');
        this.dude.tint = Math.random() * 0xffffff;
        this.game.add.existing(this.dude);

        this.game.camera.follow(this.dude, Phaser.Camera.FOLLOW_LOCKON);

        this.enemy = new Dude(this.game, 0, 500, 'dude_sheet');
        this.game.add.existing(this.enemy);
    }

    update()
    {
        this.game.physics.arcade.collide(this.dude, this.platforms);

        // this.game.physics.arcade.moveToObject(this.enemy, this.dude, 100, 200);
        this.game.physics.arcade.moveToXY(this.enemy, this.dude.body.x-100, this.dude.body.y-100, 100, 200);

        this.game.physics.arcade.overlap(this.dude.weapon.bullets, this.platforms, function(bullet, platform) {
            bullet.kill();
            platform.kill();
        }, null, this);
    }

    render()
    {

    }

}
