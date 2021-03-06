class Qubit {

    constructor() {

        this.x = width / 5;
        this.y = height / 3;
        this.ySpeed = 0;
        this.scl = 20;

    }

    // Rendering the Qubit
    update() {

        this.ySpeed += gravity;
        this.y += this.ySpeed;

        this.x = constrain(this.x, 0, width - this.scl);
        this.y = constrain(this.y, 0, height - this.scl);

        fill(255, 200, 50);
        ellipse(this.x, this.y, this.scl, this.scl);

        fill(128, 0, 0);
        // change the text size so that Q fits in the qubti circle
        textSize(14);
        text("Q", this.x, this.y)

    }

    absorption(energy) {

        this.ySpeed -= energy;

    }

    emission(energy) {

        this.ySpeed += energy;

    }

    tunnel(path) {

        this.x += path;

    }


}