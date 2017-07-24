var distance = 300;
var speed = 4;
var stars;

var max = 200;
var xx = [];
var yy = [];
var zz = [];

export default class TitleState extends Phaser.State
{

    preload() {

    }

    create()
    {
        this.game.stage.backgroundColor = '#000';

        if (this.game.renderType === Phaser.WEBGL) max = 500;

        var sprites = this.game.add.spriteBatch();

        stars = [];

        for (var i = 0; i < max; i++)
        {
            xx[i] = Math.floor(Math.random() * 800) - 400;
            yy[i] = Math.floor(Math.random() * 600) - 300;
            zz[i] = Math.floor(Math.random() * 1700) - 100;

            var star = this.game.make.sprite(0, 0, 'star');
            star.anchor.set(0.5);

            sprites.addChild(star);

            stars.push(star);
        }

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'GAME TITLE!', {
            font: '32px Arial',
            align: 'center',
            fill: '#fff'
        });

        text.anchor.setTo(0.5, 0.5);
    }

    update()
    {
        for (var i = 0; i < max; i++)
        {
            stars[i].perspective = distance / (distance - zz[i]);
            stars[i].x = this.game.world.centerX + xx[i] * stars[i].perspective;
            stars[i].y = this.game.world.centerY + yy[i] * stars[i].perspective;

            zz[i] += speed;

            if (zz[i] > 290)
            {
                zz[i] -= 600;
            }

            stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
            stars[i].scale.set(stars[i].perspective / 2);
            stars[i].rotation += 0.05;

        }
    }

    render()
    {

    }

}
