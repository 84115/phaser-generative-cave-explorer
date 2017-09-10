import Player from 'objects/Player';
import CAVE from 'enums/cave';

export default class TilemapMergedState extends Phaser.State
{

    preload() {
        // this.game.load.tilemap('map', 'tile/omega-3.csv', null, Phaser.Tilemap.CSV);
        this.game.load.tilemap('map', 'tile/omega-compiled.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tiles', 'tile/omega.png');
    }

    create()
    {
        //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
        this.map = this.game.add.tilemap('map', 32, 32);
        window.map = this.map;
        //  Now add in the tileset
        this.map.addTilesetImage('tiles');

        //  Create our layer
        this.layer = this.map.createLayer(0);

        //  Resize the world
        this.layer.resizeWorld();

        // this.layer.debug = true;

        this.map.setCollisionByExclusion([
            CAVE.BLANK,
            CAVE.LADDER,
            CAVE.WATER.DEFAULT, CAVE.WATER.CEILING,
            CAVE.STONE.BREAKABLE,
            CAVE.BRICK
        ], true);

        this.player = new Player(this.game, ((16*32)*8), ((16*32)*8), 'dude_sheet');
        window.player = this.player;

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);

        // this.map.setTileIndexCallback(26, hitCoin, this);

        // this.game.input.onDown.addOnce(function() {
        //     console.log(this.map);
        //     this.map.replace(419, 351);
        //     // this.map.removeTile(9, 5, this.layer).destroy();
        // }, this);

        this.prev = 0;
    }

    update()
    {
        var $this = this;

        this.game.physics.arcade.collide(this.player, this.layer);

        this.game.physics.arcade.overlap(this.player, this.layer, function(player, layer) {
            console.log('TilemapMerged', layer.index, player.control_mode, $this.prev);

            if (layer.index == 355) {
                player.control_mode = 'climb';
            }
            else {
                player.control_mode = 'default';
            }

            $this.prev = layer.index;
        });

        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);
    }

}
