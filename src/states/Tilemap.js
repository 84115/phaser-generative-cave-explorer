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
        this.map = this.game.add.tilemap('map', 32, 32);

        //  Now add in the tileset
        this.map.addTilesetImage('tiles');

        //  Create our layer
        this.layer = this.map.createLayer(0);

        //  Resize the world
        this.layer.resizeWorld();

        this.layer.debug = true;

        this.map.setCollisionByExclusion([3, 49]);

        this.player = new Player(this.game, 0, 0, 'dude_sheet');

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    }

    update()
    {
        this.game.physics.arcade.collide(this.player, this.layer);
    }

}
