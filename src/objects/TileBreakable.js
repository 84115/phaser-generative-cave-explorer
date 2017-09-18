export default class TileBreakable extends Phaser.Sprite
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        // this.tint = Math.random() * 0xffffff;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.moves = false;

        game.add.existing(this);
    }

}
