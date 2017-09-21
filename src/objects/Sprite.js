export default class Sprite extends Phaser.Sprite
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);
    }

    destroyA(a, b)
    {
        a.destroy();

        // this.game.camera.shake(0.0125, 625);
    }

    destroyAB(a, b)
    {
        a.destroy();
        b.destroy();

        // this.game.camera.shake(0.0125, 625);
    }

    destroyB(a, b)
    {
        b.destroy();

        // this.game.camera.shake(0.0125, 625);
    }

}
