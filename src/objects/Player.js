import Dude from 'objects/Dude';
import RainbowText from 'objects/RainbowText';

/*
 * Player
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

export default class Player extends Dude
{

    constructor(game, x, y, key, frame)
    {
        super(game, x, y, key, frame);

        this.setHealth(75);
        this.setControls();
        this.body.setSize(20, 32, 5, 16);
        this.animations.add('left', [0, 1, 2, 3], 9, true);
        this.animations.add('turn', [4], 20, true);
        this.animations.add('right', [5, 6, 7, 8], 9, true);
        this.animations.add('idle', [4], 20);
        this.animations.add('climb', [9], 9, true);
        this.control_mode = 'default';

        this.cursors = this.game.input.keyboard.createCursorKeys();

        // Creates 30 bullets, using the 'star' graphic
        this.weapon = this.game.add.weapon(5, 'star');

        // The bullet will be automatically killed when it leaves the world bounds
        // this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletLifespan = 500;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        // this.weapon.bullets.allowGravity = false;
        this.weapon.bullets.setAll('body.allowGravity', false);

        // The speed at which the bullet is fired
        this.weapon.bulletSpeed = 500;

        // Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon.fireRate = 100;

        // Tell the Weapon to track the 'player' Sprite
        // With no offsets from the position
        // But the 'true' argument tells the weapon to track sprite rotation
        this.weapon.trackSprite(this, 16, 32, false);

        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        this.tintButton = this.game.input.keyboard.addKey(Phaser.KeyCode.T);

        this.ladderButton = this.game.input.keyboard.addKey(Phaser.KeyCode.P);

        this.text = new RainbowText(this.game, 12, 12, this.health);

        this.resetButton = this.game.input.keyboard.addKey(Phaser.KeyCode.R);

        game.add.existing(this);
    }

    update()
    {
        if (this.alive)
        {
            // console.log('Player.......', this.control_mode);

            // if (this.ladderButton.isDown)
            // {
            //     this.control_mode = 'climb';
            // }
            // else {
            //     this.control_mode = 'default';
            // }

            if (this.control_mode == 'climb')
            {
                this.controlsClimb();
            }
            else if (this.control_mode == 'swim')
            {
                this.controlsSwim();
            }
            else
            {
                this.controlsDefault();
            }

            if (this.cursors.up.isDown) {
                if (this.cursors.left.isDown) {
                    this.weapon.fireAngle = Phaser.ANGLE_NORTH_WEST;
                }
                else if (this.cursors.right.isDown) {
                    this.weapon.fireAngle = Phaser.ANGLE_NORTH_EAST;
                }
                else {
                    this.weapon.fireAngle = Phaser.ANGLE_UP;
                }
            }
            else if (this.cursors.down.isDown) {
                if (this.cursors.left.isDown) {
                    this.weapon.fireAngle = Phaser.ANGLE_SOUTHdw_WEST;
                }
                else if (this.cursors.right.isDown) {
                    this.weapon.fireAngle = Phaser.ANGLE_SOUTH_EAST;
                }
                else {
                    this.weapon.fireAngle = Phaser.ANGLE_DOWN;
                }
            }
            else {
                if (this.cursors.left.isDown)
                {
                    this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                }
                else if (this.cursors.right.isDown)
                {
                    this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                }
            }

            if (this.fireButton.isDown)
            {
                this.weapon.fire();
            }

            if (this.tintButton.isDown) {
                this.tint = Math.random() * 0xffffff;
            }
        }
        else {
            if (this.resetButton.isDown) {
                this.reset(0, 3000);
                this.setHealth(75);
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
        this.eKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    }

    setAnimation(animation='idle')
    {
        if (this.facing != animation) {
            this.animations.play(animation);
            this.facing = animation;
        }
    }

    controlsDefault()
    {
        this.body.allowGravity = true;
        this.body.gravity.y = 800;

        if (this.body.blocked.down || this.body.touching.down)
        {
            if (this.upKey.isDown)
            {
                if (this.game.time.now)
                {
                    this.body.velocity.y = -800;
                    this.health--;
                    this.text.setText(this.health);
                }
            }
            else if (this.eKey.isDown) {
                if (this.game.time.now)
                {
                    this.body.velocity.y = -275;
                    this.health--;
                    this.text.setText(this.health);
                }
            }
        }

        if (this.leftKey.isDown)
        {
            this.setAnimation('left');
            this.body.velocity.x = -125;
            this.x--;
        }
        else if (this.rightKey.isDown)
        {
            this.setAnimation('right');
            this.body.velocity.x = 125;
            this.x++;
        }
        else
        {
            this.setAnimation('idle');
            this.body.velocity.x = 0;
        }
    }

    controlsClimb()
    {
        this.body.allowGravity = false;
        this.body.velocity.y = 0;
        this.body.checkCollision.up = true;
        this.body.checkCollision.down = true;
        this.body.bounce.y = 0;

        this.setAnimation('climb');

        if (this.upKey.isDown)
        {
            this.y = this.y - (125 / 42);
        }
        else if (this.downKey.isDown)
        {
            this.y = this.y + (125 / 42) * 2;
        }
        else if (this.leftKey.isDown)
        {
            this.body.velocity.x = -125;
            this.x--;
        }
        else if (this.rightKey.isDown)
        {
            this.body.velocity.x = 125;
            this.x++;
        }
        else
        {
            this.body.velocity.x = 0;
        }
    }

    controlsSwim()
    {
        this.body.allowGravity = true;
        this.body.gravity.y = 100;
        this.body.bounce.y = 0.2;
        this.body.bounce.x = 0.2;

        if (this.upKey.isDown)
        {
            if (this.game.time.now)
            {
                this.body.velocity.y = -50;
            }
        }

        if (this.leftKey.isDown)
        {
            this.setAnimation('left');
            this.body.velocity.x = -50;
            this.x--;
        }
        else if (this.rightKey.isDown)
        {
            this.setAnimation('right');
            this.body.velocity.x = 50;
            this.x++;
        }
        else
        {
            this.setAnimation('idle');
            this.body.velocity.x = 0;
        }
    }

}
