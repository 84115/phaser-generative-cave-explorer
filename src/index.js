import BootState from 'states/Boot';
import PreloadState from 'states/Preload';
import TileScreen from 'objects/TileScreen';

class Game extends Phaser.Game
{

	constructor()
    {
        var screen = new TileScreen(32, 16);

        super(screen.getDimension(), screen.getDimension(), Phaser.AUTO, 'content', null);

        this.screen = screen;

        this.state.add('Boot', BootState);
        this.state.add('Preload', PreloadState);

		this.state.start('Boot');
	}

    quitGame(pointer)
    {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        // this.state.start('MainMenu');
    }

}

const game = new Game;
