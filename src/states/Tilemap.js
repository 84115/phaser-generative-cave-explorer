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

        // this.map.setCollisionBetween(123, 123);
        // this.map.setCollisionBetween(49);
        this.map.setCollisionByExclusion([49, 123]);

        // var water = this.map.searchTileIndex(89);
        // water.collideDown = false;
        // water.collideUp = false;
        // water.collideLeft = false;
        // water.collideRight = false;

        this.player = new Player(this.game, 0, 3000, 'dude_sheet');

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    }

    update()
    {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);
    }

    render()
    {

    }

}
