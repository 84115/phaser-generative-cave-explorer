export default class TileBreakable extends Phaser.Sprite
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        this.tint = Math.random() * 0xffffff;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = true;
        // this.body.immovable = false;
        this.body.moves = true;
        this.body.collideWorldBounds = true;
        console.log('drop', this.body);

        game.add.existing(this);
    }

}
