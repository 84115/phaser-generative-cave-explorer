/*
 * Dude
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

var facing = 'left';

export default class Dude extends Phaser.Sprite
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);



        this.setHealth(10);
        this.setControls();
        this.setPhysics();
        this.body.setSize(20, 32, 5, 16);
        this.animations.add('left', [0, 1, 2, 3], 9, true);
        this.animations.add('turn', [4], 20, true);
        this.animations.add('right', [5, 6, 7, 8], 9, true);
    }

    create() {

    }

    update()
    {
        if (this.alive)
        {

            if (this.upKey.isDown && (this.body.blocked.down || this.body.touching.down))
            {
                if (this.game.time.now)
                {
                    this.body.velocity.y = -500;
                }
            }

            if (this.leftKey.isDown)
            {
                if (facing != 'left')
                {
                    this.animations.play('left');
                    facing = 'left';
                }

                this.body.velocity.x = -125;
                this.x--;
            }
            else if (this.rightKey.isDown)
            {
                if (facing != 'right')
                {
                    this.animations.play('right');
                    facing = 'right';
                }

                this.body.velocity.x = 125;
                this.x++;
            }
            else
            {
                if (facing != 'idle')
                {
                    this.animations.stop();

                    if (facing == 'left')
                        this.frame = 0;
                    else
                        this.frame = 5;

                    facing = 'idle';
                }

                this.body.velocity.x = 0;
            }
        }
    }

    setHealth(health)
    {
        this.health = health;
        this.maxHealth = this.health;
    }

    setControls()
    {
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    }

    setPhysics()
    {
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.gravity.y = 500;
        this.body.maxVelocity.y = 500;
        this.body.bounce.y = 0.1;
        this.body.collideWorldBounds = true;
    }

    damage(amount)
    {
        super.damage(amount);
    }

}
