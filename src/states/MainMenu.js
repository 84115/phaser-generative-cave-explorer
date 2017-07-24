import GameState from 'states/Game';
import TilemapState from 'states/Tilemap';

export default class MainMenuState extends Phaser.State
{

    preload() {

    }

    create()
    {
        this.createButton('Play Game', this.game.world.centerX, 100, 300, 100, function() {
            this.state.add('Game', GameState);
            this.state.start('Game');
            // console.log(1);
        });

        this.createButton('Play Tilemap', this.game.world.centerX, 200, 300, 100, function() {
            this.state.add('Tilemap', TilemapState);
            this.state.start('Tilemap');
            // console.log(1);
        });
    }

    createButton(string="Button", x="0", y="0", w="0", h="0", callback)
    {
        var button = this.game.add.button(x, y, 'star', callback, this, 2, 1, 0);

        button.anchor.setTo(0.5, 0.5);
        button.width = w;
        button.height = h;

        var text = this.game.add.text(button.x, button.y, string, {
            font: '14px Arial',
            align: 'center'
        });

        text.anchor.setTo(0.5, 0.5);
    }

    update()
    {

    }

    render()
    {

    }

}
