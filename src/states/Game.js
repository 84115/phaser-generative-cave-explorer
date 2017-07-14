import Dude from 'objects/Dude';

var cursors;

export default class GameState extends Phaser.State
{

    create()
    {
        this.game.stage.backgroundColor = '#007236';

        this.game.world.resize(3000, 600);

        this.dude = new Dude(this, 0, 0, 'dude');
        this.game.add.existing(this.dude);
        // this.dude.tint = Math.random() * 0xffffff;

        for (var i = 0; i < 100; i++)
        {
            this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'dude');
        }

        cursors = this.game.input.keyboard.createCursorKeys();

        this.game.camera.follow(this.activePlayer, Phaser.Camera.FOLLOW_LOCKON);
    }

    update()
    {
        if (cursors.up.isDown)
        {
            this.game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            this.game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            this.game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            this.game.camera.x += 4;
        }
    }

    render()
    {

    }

}
