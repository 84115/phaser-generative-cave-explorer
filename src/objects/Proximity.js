export default class Proximity extends Phaser.Sprite
{

    constructor(game, watch=null)
    {
        super(game, 0, 0, null);

        if (watch instanceof Phaser.Sprite)
        {
            this.watch = watch;
        }

        this.setPhysics();

        game.add.existing(this);
    }

    update()
    {
        if (this.enabled())
        {
            this.x = this.watch.x - this.game.screen.getNByTileSize(2) - this.watch.width / 2;
            this.y = this.watch.y - this.game.screen.getNByTileSize(2) - this.watch.width / 4;
        }
        else {
            this.x = 0;
            this.y = 0;
        }

        if (this.debug) this.render();
    }

    render()
    {
        if (this.enabled())
        {
            this.game.debug.body(this);
        }
    }

    enabled()
    {
        return (this.watch instanceof Phaser.Sprite ? true : false);
    }

    setPhysics()
    {
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.setSize(this.game.screen.getNByTileSize(6), this.game.screen.getNByTileSize(6), 0, 0);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.moves = false;
    }

}
