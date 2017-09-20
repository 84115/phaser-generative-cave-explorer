import Player from 'objects/Player';
import Enemy from 'objects/Enemy';
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
            CAVE.BRICK,
            CAVE.POWERUP.DEFAULT
        ], true);



        // Replace Breakable Tile With Sprite
        this.breakable = this.game.add.group();
        this.fallable = this.game.add.group();

        // this.map.forEach(this.replaceTilesWithSprite, this);



        // Player
        this.player = new Player(this.game, this.getCentre(), this.getCentre(), 'dude_sheet');



        this.enemy = new Enemy(this.game, this.player.body.x+(32*4), this.player.body.y+(32*4), 'dude_sheet');
        this.enemy.tint = Math.random() * 0xffffff;

        //  Create our Timer
        // this.timer = new Phaser.Timer(this.game, false);
        this.timer = this.game.time.create(false);

        //  Set a TimerEvent to occur after 5 seconds
        this.timer.loop(5000, function() {
            if (!this.enemy.alive) {
                this.enemy.reset();
                this.enemy.tint = Math.random() * 0xffffff;
            }
        }, this);



        // Fullscreen
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.input.onDown.add(this.goFullscreen, this);



        // Camera
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);



        // Rect
        // this.proximity = new Phaser.Rectangle(this.player.body.x, this.player.body.y, 32*4, 32*4);
        this.proximity = this.game.add.sprite(32, 32, null);
        this.game.physics.enable(this.proximity, Phaser.Physics.ARCADE);
        this.proximity.body.setSize(32*6, 32*6, 0, 0);
        this.proximity.body.allowGravity = false;
        this.proximity.body.immovable = true;
        this.proximity.body.moves = false;

        console.log(this.layer);

        // Debug
        // this.layer.debug = true;
    }

    render()
    {
        // this.game.debug.rectangle(this.proximity, '#33ff00', false);
        this.game.debug.body(this.proximity);
    }

    update()
    {
        let collide = this.game.physics.arcade.collide;
        let overlap = this.game.physics.arcade.overlap;

        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.breakable);
        this.game.physics.arcade.collide(this.fallable, this.layer);
        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);

        this.game.physics.arcade.overlap(this.player, this.layer, this.overlapPlayerLayer);
        this.game.physics.arcade.overlap(this.player.weapon.bullets, this.breakable, this.overlapBulletBreakable, null, this);
        this.game.physics.arcade.overlap(this.proximity, this.layer, this.replaceTilesWithSprite, null, this);

        // this.proximity.x = this.player.x;
        // this.proximity.y = this.player.y;
        this.proximity.x = this.player.x - (32 * 2) - 16;
        this.proximity.y = this.player.y - (32 * 2) - 8/* + 16 + 8*/;


        this.game.physics.arcade.collide(this.enemy, this.player);

        this.game.physics.arcade.overlap(this.player.weapon.bullets, this.enemy, function(bullet, enemy) {
            bullet.kill();
            enemy.kill();
        }, null, this);

        this.game.physics.arcade.moveToXY(this.enemy, this.player.body.x, this.player.body.y - 128, 100, 600);
    }

    overlapPlayerLayer(player, layer)
    {
        let index = layer.index;

        switch (index) {
            default: 
                player.control_mode = 'default';
                break;
            case CAVE.LADDER:
                player.control_mode = 'climb';
                break;
            case CAVE.WATER.DEFAULT:
            case CAVE.WATER.CEILING:
                player.control_mode = 'swim';
                break;
            case CAVE.POWERUP.DEFAULT:
                layer.alpha = 0;
                player.weapon.fireRate = 100;
                break;
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

    replaceTilesWithSprite(proximity, layer)
    {
        if (layer.index == CAVE.STONE.BREAKABLE)
        {
            if (layer.alpha != 0.5) {
                layer.alpha = 0.5;

                this.breakable.add(new TileBreakable(this.game, this.toTileCoordinate(layer.x), this.toTileCoordinate(layer.y), 'stone-breakable'));
            }
        }
        else if (layer.index == CAVE.STONE.FALLABLE)
        {
            if (layer.alpha != 0.5) {
                layer.alpha = 0.5;

                this.fallable.add(new TileFallable(this.game, this.toTileCoordinate(layer.x), this.toTileCoordinate(layer.y), 'stone-breakable'));
            }
        }
    }

}
