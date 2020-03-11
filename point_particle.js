/***
 * A point particle will appear on the screen randomly.
 * If the player's qubit collides with this particle, the player will receive the amount of points that
 * comes with the poin particle.
 */
class PointParticle {

    constructor(barrier) {

        this.x = barrier.xPos + 20 + int(random(80, 140)); // so that a point particle doesn't overlap the barrier
        this.y = random(height / 6, height - height / 6);
        this.point = int(random(1, 6));
        this.collided = false;
    }

    render() {
        this.x -= gameSpeed;

        fill(255, 255, 255);
        ellipse(this.x, this.y, 30, 30);

        fill(0, 0, 0);
        textSize(16);
        text(this.point, this.x, this.y)

        if (Math.pow(qubit.x - this.x, 2) + Math.pow(qubit.y - this.y, 2) <= 30 * 30)
            if (!this.collided) {
                score += this.point;
                this.collided = true;
            }
    }
}