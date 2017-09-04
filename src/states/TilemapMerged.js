import Player from 'objects/Player';

export default class TilemapMergedState extends Phaser.State
{

    preload() {
        // this.game.load.tilemap('map', 'tile/omega-3.csv', null, Phaser.Tilemap.CSV);
        this.game.load.tilemap('map', null, '416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416,416,418,416,416,416,418,416,416,480,480,480,418,355,418,416,416\n', Phaser.Tilemap.CSV);
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

        this.map.setCollisionByExclusion([351, 355, 356, 419, 420], true);

        this.player = new Player(this.game, 0, 99999999999999999, 'dude_sheet');
        this.player.body.maxVelocity.y = 390;

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        // this.map.setTileIndexCallback(26, hitCoin, this);

        // this.game.input.onDown.addOnce(function() {
        //     console.log(this.map);
        //     this.map.replace(419, 351);
        //     // this.map.removeTile(9, 5, this.layer).destroy();
        // }, this);
    }

    update()
    {
        this.game.physics.arcade.collide(this.player, this.layer);

        this.game.physics.arcade.overlap(this.player, this.layer, function(a,b) {
            // if (b.index == 355) {
            //     a.body.gravity.y = 500;
            //     a.body.maxVelocity.y = 390;
            // }
            // else {
            //     a.body.gravity.y = 200;
            //     a.body.maxVelocity.y = 5000;
            // }

            // console.log(b.index, a.body.maxVelocity.y);
        });

        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);
    }

}
