import Dude from 'objects/Dude';

var sprite;
var weapon;
var cursors;
var fireButton;

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

        this.game.add.existing(this.dude);

        cursors = this.game.input.keyboard.createCursorKeys();

        this.game.camera.follow(this.dude, Phaser.Camera.FOLLOW_LOCKON);







        //  Creates 30 bullets, using the 'star' graphic
        weapon = this.game.add.weapon(30, 'star');

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 600;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        weapon.fireRate = 100;

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        //  Tell the Weapon to track the 'player' Sprite
        //  With no offsets from the position
        //  But the 'true' argument tells the weapon to track sprite rotation
        weapon.trackSprite(this.dude, 32, 32, false);



    }

    update()
    {
        this.game.physics.arcade.collide(this.dude, this.platforms);

        if (cursors.up.isDown)
        {
            weapon.fireAngle = Phaser.ANGLE_UP;
            this.game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            weapon.fireAngle = Phaser.ANGLE_DOWN;
            this.game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            weapon.fireAngle = Phaser.ANGLE_LEFT;
            this.game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.game.camera.x += 4;
        }

        if (fireButton.isDown)
        {
            weapon.fire();
        }
    }

    render()
    {
        weapon.debug();
    }

}
