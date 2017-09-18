import Player from 'objects/Player';
import TileBreakable from 'objects/TileBreakable';
import CAVE from 'enums/cave';

export default class TilemapMergedState extends Phaser.State
{

    preload() {
        // this.game.load.tilemap('map', 'tile/omega-3.csv', null, Phaser.Tilemap.CSV);
        this.game.load.tilemap('map', 'tile/omega-compiled.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tiles', 'tile/omega.png');

        this.game.stage.backgroundColor = '#000';
    }

    create()
    {
        // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.input.onDown.add(this.goFull, this);

        var tint;
        // tint = Math.random() * 0xffffff;

        //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
        this.map = this.game.add.tilemap('map', 32, 32);
        window.map = this.map;
        //  Now add in the tileset
        this.map.addTilesetImage('tiles');

        //  Create our layer
        this.layer = this.map.createLayer(0);
        if (tint) this.layer.tint = tint;

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





        this.breakable = this.game.add.group();

        this.map.forEach(function(tile) {
            if (tile.index == CAVE.STONE.BREAKABLE) {
                tile.alpha = 0.5;

                // var x = new TileBreakable(this.game, tile.x * 32, tile.y * 32, 'stone-breakable');
                this.breakable.add(new TileBreakable(this.game, tile.x * 32, tile.y * 32, 'stone-breakable'));
            }
        }, this);





        this.player = new Player(this.game, this.getCentre(), this.getCentre(), 'dude_sheet');

        if (tint) this.player.tint = tint;

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // this.map.setTileIndexCallback(26, hitCoin, this);

        // this.game.input.onDown.addOnce(function() {
        //     console.log(this.map);
        //     this.map.replace(419, 351);
        //     // this.map.removeTile(9, 5, this.layer).destroy();
        // }, this);

        this.prev = 0;
    }

    getCentre()
    {
        let tile_pixels = 32;
        let tile_count = 16;
        let section = (tile_count * tile_pixels);
        let center = (section * (tile_count / 2)) + section / 2;

        return center;
    }

    goFull()
    {    
        if (this.game.scale.isFullScreen)
        {
            this.game.scale.stopFullScreen();
        }
        else
        {
            this.game.scale.startFullScreen(false);
        }
    }

    update()
    {

        this.game.physics.arcade.collide(this.player, this.layer);

        this.game.physics.arcade.overlap(this.player, this.layer, function(player, layer) {
            if (layer.index == CAVE.LADDER) {
                player.control_mode = 'climb';
            }
            else if (layer.index == CAVE.WATER.DEFAULT || layer.index == CAVE.WATER.CEILING) {
                player.control_mode = 'swim';
            }
            else {
                player.control_mode = 'default';
            }
        });

        this.game.physics.arcade.collide(this.player, this.breakable);

        if (this.player.fireButton.isDown) {
            this.game.physics.arcade.overlap(this.player.weapon.bullets, this.breakable, function(a,b){
                // a.kill();
                b.destroy();

                this.game.camera.shake(0.025, 125);
            }, null, this);
        }

        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);
    }

}
