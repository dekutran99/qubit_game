# TASK COMPLETED

Chosen task: Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse.
I realized that this program was using Processing for Javascript so I added mouseClicked() function and specify the program's behavior when mouse is clicked in certain areas.
I commented on every step for code readability. 

Custom added features: 

   1. I added a PointParticle class which describes a motionless paticle that appears randomly. Each time the player's qubit collides with a PointParticle object, the player

      will receive the amount of points that comes with the PointParticle object.

   2. The player now can use points as energy to tunnel the qubit. Each time the player tunnels the qubit, the score will be deducted by 3 points. If the player doesn't

      have sufficient points, the qubit will not be able to tunnel.

   3. Changed the text size of "Q" so that it fits in the qubit particle's circle.

