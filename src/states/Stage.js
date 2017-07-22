import Player from 'objects/Player';

export default class StageState extends Phaser.State
{

    create()
    {
        // this.game.stage.setBounds(0, 0, 800, 600);

        for (var i = 0; i < 250; i++)
        {
            this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'star');
        }

        this.stage.player = new Player(this.game, 0, 0, 'dude_sheet');
    }

    update()
    {

    }

    render()
    {

    }

}
