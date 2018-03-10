// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;
var canvasWidth;
var canvasHeight;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables 
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;

function setup() {

	canvasWidth = 500;
	canvasHeight = 500;
	canvas = createCanvas(canvasWidth,canvasHeight);
	gameScreen = select('#game-screen');
	canvas.parent(gameScreen);

	shipX = 250;
	shipY = 450;
	shipDiameter = 75;
	shipSpeed = 3;

	bulletDiameter = 30;
	shipShooting = false;
	
	alienDiameter = 75;
	alienVelocity = 10;
	alienX = 40;
	alienY = 40;

	alienBulletDiameter = 25;
	alienShooting = false;
}

function draw() {

	background(0);
	drawShip();
	drawAlien();

	if(shipShooting==true) {

		drawBullet();

	}

	if(alienShooting==true) {

		drawAlienBullet();
	}
}

function drawShip() {

	fill(192,192,192);
	ellipse(shipX,shipY,shipDiameter,shipDiameter);

	if (keyIsDown(LEFT_ARROW) && shipX > shipDiameter/2) {

		shipX -= shipSpeed;

	}

	else if (keyIsDown(RIGHT_ARROW) && shipX < canvasWidth-shipDiameter/2) {

		shipX += shipSpeed;
	}

}

function keyPressed() {

	if(keyCode===32 && shipShooting == false) {

		bulletX = shipX;
		bulletY = shipY;
		shipShooting = true;

	}

	}

function drawBullet() {

	fill(99,99,59);
	ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);

	//bullet stuff
	bulletY -= 10;

	if (bulletY < 0) {

		drawBullet();

	}

	else if (bulletY == 0) {

		shipShooting = false; 
	}


}

function drawAlien () {

	alienX += alienVelocity;

	if(alienX >= canvasWidth && alienX > alienDiameter/2) {
 
		alienX -= alienVelocity;
		alienVelocity = -10;

	}

	else if (alienX <= alienDiameter/2) {

		alienVelocity = 10;
	}

	fill(46.7,86.7,46.7);
	ellipse(alienX,alienY,alienDiameter,alienDiameter);

	if(random(4) < 1 && !alienShooting) {

		alienBulletX = alienX;
		alienBulletY = alienY;
		alienShooting = true;

	}
}

function drawAlienBullet() {

	fill(255);
	ellipse(alienBulletX,alienBulletY,alienBulletDiameter,alienBulletDiameter);

	if(alienBulletY < canvasHeight) {

		alienBulletY += 10;
	}

	else {

		alienShooting = false;

	}
}
/*
 * This function is called once. Sets up the canvas, accesses HTML elements with
 * select(), and adds event listeners to those elements. Sets initial values of
 * variables by calling resetGame().
 */


/*
 * gameOver()
 * This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */


/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */


/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */


/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
