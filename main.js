/* MIT License
 * Copyright © 2020 Geering Up, Diversifying Talent in Quantum Computing, Haris Amiri
 * 
 * 
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.

*/
//======================================================================================================================================================================================================================================================================================================================================================

/*
	This is a game designed to introduce key quantum mechanics concepts to younger age groups.
	By adopting the style of Flappy Bird, we introduce important vocabulary in the field of quantum computing.
	Players begin as 'Qubits' and are asked to navigate through the barriers. 
	They can move up by 'absorbing' energy, move down by 'emitting' energy, or 'tunnel' through the barrier.
	They can do each of these functions by using the arrow keys - note that when players 'tunnel', there is a 25% chance it will work.
	There is also an element of gravity in the system. While this is not technically accurate in terms of quantum computing (there are no concerns of gravity),
		it adds to the challenge of the game and thus was left in.

	Your task is to add/modify the code so that you accomplish ONE of these three things:

		1. Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse.
		2. Interacting Qubits. While playing, other Qubits will pop in and out of the canvas. While these Qubits interact with one another, they do not interact with the player's Qubit. 
		   Add this functionality and explain why you made them behave the way they do (i.e. if all qubits attract each other, repel each other, collide etc.)
		3. Changing the shape of the barriers. Currently, the barriers are rectangles. Alter the code so that they are semi-circles or ellipses instead, while maintaining a clean UI.

	
	In addition to one of the above tasks, please add one other element of your choice to the game. This can be as simple as changing the shape of the Qubit to as complicated as adding a new class of objects. 
	Please explain what you changed/added.

*/

//=====================================================================================================================================================================================================================================================================================================================================================

//======================================================================================================================================================================================================================================================================================================================================================

/*
    TASK COMPLETED

    Chosen task: Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse.
    I realized that this program was using Processing for Javascript so I added mouseClicked() function and specify the program's behavior when mouse is clicked in certain areas.
    I commented on every step for code readability. 

    Custom added features: 
        1. I added a PointParticle class which describes a motionless paticle that appears randomly. Each time the player's qubit collides with a PointParticle object, the player
           will receive the amount of points that comes with the PointParticle object.
        2. The player now can use points as energy to tunnel the qubit. Each time the player tunnels the qubit, the score will be deducted by 3 points. If the player doesn't
           have sufficient points, the qubit will not be able to tunnel.
        2. Changed the text size of "Q" so that it fits in the qubit particle's circle. 
*/

//=====================================================================================================================================================================================================================================================================================================================================================

let barrier = []
let qubit;
let particle;

// declare a PointParticle array
let point_particles = [];

const gravity = 0.01;
const gameSpeed = 2;
const timeSync = 1000,
    timeDelay = 1000;
let gameRunning = true;
var score = 0;
const E = 2;
const path = 80;
let bool = true;

// Declaring the setup() function. 
// When the program starts, the initial environment is defined - i.e. screen size, 
// loading any media (background image), and objects.

function setup() {

    createCanvas(700, 500);
    qubit = new Qubit();
    particle = new Particle();

    // add the first barrier
    barrier_temp = new Barrier()
    barrier.push(barrier_temp);

    textAlign(CENTER, CENTER);

}

function draw() {

    background(125, 125, 255);

    // Setting the Game Over Screen
    if (!gameRunning) {
        textSize(50);
        fill(255);
        text("Game Over\n Final Score: " + score, width / 2, height / 2);
        return;
    }

    // Display score in background

    fill(255, 20);
    textSize(50);
    text(score, width / 2, height / 10);

    qubit.update();
    particle.update();

    // Creating new barriers

    if (barrier[barrier.length - 1].xPos < height) {
        // barrier_temp now point to a new barrier
        barrier_temp = new Barrier()
        barrier.push(barrier_temp);

        // add a new point particle
        var num = int(random(0, 4)); // 25% chance of making a point particle
        if (num == 0) {
            point_particles.push(new PointParticle(barrier_temp));
        }

    }

    for (let i = 0; i < barrier.length; i++) {
        thisBarrier = barrier[i];
        thisBarrier.render();
    }

    // rendering the point particles
    for (var i = 0; i < point_particles.length; i++) {
        point_particles[i].render();
    }

    // Rendering 'buttons'. Currently, clicking on the buttons does nothing. 

    // Absorption - going up

    fill(220, 20, 60);
    ellipse(100, 450, 150, 75);
    textSize(15);
    fill(0, 102, 153)
    text("Absorption - UP Key", 100, 450);

    // Emission - going down

    fill(220, 20, 60);
    ellipse(300, 450, 150, 75);
    textSize(15);
    fill(0, 102, 153)
    text("Emission - DOWN Key", 300, 450);

    // Tunneling - Left/Right Arrow Keys

    fill(220, 20, 60);
    ellipse(500, 450, 150, 75);
    textSize(15);
    fill(0, 102, 153)
    text("Tunneling <--   -->", 500, 450);

    newWait()

}

//================================ FUNCTIONS OUTSIDE OF DRAW LOOP ============================


function keyPressed() {

    if (keyCode == UP_ARROW) {

        qubit.absorption(E);

    } else if (keyCode == DOWN_ARROW) {

        qubit.emission(E);

    } else if (keyCode == RIGHT_ARROW) {
        // var num = int(random(0, 4)); // 25% chance of successful tunneling

        // Each time the player wants to tunnel the qubit, points will be used as energy and deducted.
        // Energy requires to tunnel = 3.
        if (score >= 3) {
            qubit.tunnel(path);
            score -= 3;
        }
    } else if (keyCode == LEFT_ARROW) {
        // var num = int(random(0, 4)); // 25% chance of successful tunneling
        if (score >= 3) {
            qubit.tunnel(-1 * path);
            score -= 3;
        }
    }
}

/***  
 * This program is using p5.js (Processing) to render the visualizations and make the functional and interactive features.
 * Chosen task: Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse.
 * Each button is an ellipse that has width: 150px and height: 75px
 * The function of an ellipse is ( x^2 / a^2 ) + ( y^2 / b^2 ) = 1
 * a = 75; b = 37.5
 * The general function for the elliptical shape of the buttons is ( x^2 / 75^2 ) + ( y^2 / 37.5^2 ) = 1
 * Absorption button: ( (x - 100)^2 / 75^2 ) + ( (y + 450)^2 / 37.5^2 ) = 1
 * Emission button: ( (x - 300)^2 / 75^2 ) + ( (y + 450)^2 / 37.5^2 ) = 1
 * Tunneling button: ( (x - 500)^2 / 75^2 ) + ( (y+450)^2 / 37.5^2 ) = 1
 * We will check if the mouse coordinate is within the region of the elliptical buttons when mouse is clicked.
 * If true, execute the corresponding fnctionality (absorption, emission, tunnel). Else, ignore.
 ***/
function mouseClicked() {

    // get mouse coordinate
    var x = mouseX;
    var y = mouseY;

    // check if mouse coordinate is within the region of any of buttons
    if (inAbsorption(x, y)) {

        qubit.absorption(E);

    } else if (inEmission(x, y)) {

        qubit.emission(E);

    } else if (inTunneling(x, y)) {

        /*** 
         * We divide the tunneling button into two halves.
         * The right half is tunneling to the right
         * The left half is tunneling to the left 
         ***/
        // Each time the player wants to tunnel the qubit, points will be used as energy and deducted.
        // Energy requires to tunnel = 3.
        if (x <= 500) { // left half
            // var num = int(random(0, 4)); // 25% chance of successful tunneling
            if (score >= 3) {
                qubit.tunnel(-1 * path);
                score -= 3;
            }
        } else if (x > 500) { // right half
            // var num = int(random(0, 4)); // 25% chance of successful tunneling
            if (score >= 3) {
                qubit.tunnel(path);
                score -= 3;
            }
        }

    }
}

// check if coordinate (x, y) is within the elliptical region of absorption button
function inAbsorption(x, y) {

    // set up the variables for an elliptical equation
    var x_sqr = Math.pow(x - 100, 2);
    var y_sqr = Math.pow(y - 450, 2);
    var a_sqr = Math.pow(150 / 2, 2);
    var b_sqr = Math.pow(75 / 2, 2);

    // check condition
    if ((x_sqr / a_sqr) + (y_sqr / b_sqr) <= 1) {
        return true;
    } else {
        return false;
    }

}

// check if coordinate (x, y) is within the elliptical region of emission button
function inEmission(x, y) {

    // set up the variables for an elliptical equation
    var x_sqr = Math.pow(x - 300, 2);
    var y_sqr = Math.pow(y - 450, 2);
    var a_sqr = Math.pow(150 / 2, 2);
    var b_sqr = Math.pow(75 / 2, 2);

    // check condition
    if ((x_sqr / a_sqr) + (y_sqr / b_sqr) <= 1) {
        return true;
    } else {
        return false;
    }
}

// check if coordinate (x, y) is within the elliptical region of tunneling button
function inTunneling(x, y) {

    // set up the variables for an elliptical equation
    var x_sqr = Math.pow(x - 500, 2);
    var y_sqr = Math.pow(y - 450, 2);
    var a_sqr = Math.pow(150 / 2, 2);
    var b_sqr = Math.pow(75 / 2, 2);

    // condition
    if ((x_sqr / a_sqr) + (y_sqr / b_sqr) <= 1) {
        return true;
    } else {
        return false;
    }
}

//================================ PARTICLE CLASS ADDITIONS ============================

function newWait() {
    if (frameCount % 100 == 0) {
        addNewParticle();
    }
}

//---------------------------------------------------

function addNewParticle() {
    particle.mass.push(random(0.003, 0.03));
    particle.positionX.push(random(-700, 700));
    particle.positionY.push(random(-500, 500));
    particle.velocityX.push(0);
    particle.velocityY.push(0);
}
//================================ ========================== ============================