import Player from 'objects/Player';

export default class TilemapMergedState extends Phaser.State
{

    preload() {
        this.game.load.tilemap('map', 'tile/omega-3.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tiles', 'tile/omega.png');
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

        // this.layer.debug = true;

        this.map.setCollisionByExclusion([351, 355, 356, 420], true);

        this.player = new Player(this.game, 0, 0, 'dude_sheet');
        this.player.body.maxVelocity.y = 390;

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
console.log(this.map);
        this.game.input.onDown.addOnce(function () {
            this.map.replace(419, 351);
        }, this);
    }

    update()
    {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player.weapon.bullets, this.layer);
    }

}
