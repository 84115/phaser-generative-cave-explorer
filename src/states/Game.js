import Dude from 'objects/Dude';

export default class GameState extends Phaser.State
{

    create()
    {
        this.game.stage.backgroundColor = '#000';

        this.game.world.setBounds(0, 0, 1600, 600);

        this.dude = new Dude(this, 0, 0, 'dude');
        this.game.add.existing(this.dude);
        this.dude.tint = Math.random() * 0xffffff;

        this.game.camera.follow(this.activePlayer, Phaser.Camera.FOLLOW_LOCKON);
    }

    update()
    {

    }

    render()
    {

    }

}
