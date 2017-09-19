import Player from 'objects/Player';
import TileBreakable from 'objects/TileBreakable';
import TileFallable from 'objects/TileFallable';
import CAVE from 'enums/cave';

export default class TilemapMergedState extends Phaser.State
{

    preload()
    {
        this.game.load.tilemap('map', 'tile/omega-compiled.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tiles', 'tile/omega.png');

        this.game.stage.backgroundColor = '#000';
    }

    create()
    {
        // Because we're loading CSV map
        // data we have to specify the tile
        // size here or we can't render it
        this.map = this.game.add.tilemap('map', 32, 32);

        // Now add in the tileset
        this.map.addTilesetImage('tiles');

        // Create our layer
        this.layer = this.map.createLayer(0);

        // Resize the world
        this.layer.resizeWorld();



        // Collisions
        this.map.setCollisionByExclusion([
            CAVE.BLANK,
            CAVE.LADDER,
            CAVE.WATER.DEFAULT,
            CAVE.WATER.CEILING,
            CAVE.STONE.BREAKABLE,
            CAVE.BRICK
        ], true);



        // Replace Breakable Tile With Sprite
        this.breakable = this.game.add.group();
        this.fallable = this.game.add.group();

        this.map.forEach(this.replaceTilesWithSprite, this);



        // Player
        this.player = new Player(this.game, this.getCentre(), this.getCentre(), 'dude_sheet');



        // Fullscreen
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.input.onDown.add(this.goFullscreen, this);



        // Camera
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);



        // Rect
        this.player.proximity = new Phaser.Rectangle(this.player.body.x, this.player.body.y, 32*4, 32*4);



        // Debug
        // this.layer.debug = true;
    }

    render()
    {
        this.game.debug.rectangle(this.player.proximity, '#33ff00', false);
    }

    update()
    {

        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.overlap(this.player, this.layer, this.overlapPlayerLayer);

        this.game.physics.arcade.collide(this.player, this.breakable);

        // Find a way to replace this?
        // Maybe something like a isFiring
        if (this.player.fireButton.isDown)
        {
            this.game.physics.arcade.overlap(this.player.weapon.bullets, this.breakable, this.overlapBulletBreakable, null, this);
        }

        this.player.proximity.x = this.player.body.x - (32*2) + 8;
        this.player.proximity.y = this.player.body.y - (32*2) + 8;

        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);
    }

    overlapPlayerLayer(player, layer)
    {
        if (layer.index == CAVE.LADDER)
        {
            player.control_mode = 'climb';
        }
        else if (layer.index == CAVE.WATER.DEFAULT || layer.index == CAVE.WATER.CEILING)
        {
            player.control_mode = 'swim';
        }
        else
        {
            player.control_mode = 'default';
        }
    }

    overlapBulletBreakable(bullet, breakable)
    {
        breakable.destroy();

        this.game.camera.shake(0.0125, 625);
    }

    getCentre()
    {
        let tile_pixels = 32;
        let tile_count = 16;
        let section = (tile_count * tile_pixels);
        let center = (section * (tile_count / 2)) + section / 2;

        return center;
    }

    toTileCoordinate(coordinate)
    {
        let tile_pixels = 32;

        return coordinate * tile_pixels;
    }

    goFullscreen()
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

    replaceTilesWithSprite(tile)
    {
        if (tile.index == CAVE.STONE.BREAKABLE)
        {
            tile.alpha = 0.5;

            this.breakable.add(new TileBreakable(this.game, this.toTileCoordinate(tile.x), this.toTileCoordinate(tile.y), 'stone-breakable'));
        }
        // else if (tile.index == CAVE.STONE.FALLABLE)
        // {
        //     this.fallable.add(new TileFallable(this.game, this.toTileCoordinate(tile.x), this.toTileCoordinate(tile.y), 'stone-breakable'));
        // }
    }

}
