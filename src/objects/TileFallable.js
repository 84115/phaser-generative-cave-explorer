export default class TileBreakable extends Phaser.Sprite
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        this.tint = Math.random() * 0xffffff;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = true;
        this.body.moves = true;
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 500;
        console.log(this);

        game.add.existing(this);
    }

}
