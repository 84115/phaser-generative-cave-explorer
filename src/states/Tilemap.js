var map;
var layer;

import Player from 'objects/Player';

export default class TilemapState extends Phaser.State
{

    preload() {
        this.game.load.tilemap('map', 'tile/grid.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tiles', 'tile/grid.png');
    }

    create()
    {
        //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
        map = this.game.add.tilemap('map', 32, 32);

        //  Now add in the tileset
        map.addTilesetImage('tiles');
        
        //  Create our layer
        layer = map.createLayer(0);

        //  Resize the world
        layer.resizeWorld();

        this.player = new Player(this.game, 0, 3000, 'dude_sheet');
        this.player.tint = Math.random() * 0xffffff;
    }

    update()
    {

    }

    render()
    {

    }

}
