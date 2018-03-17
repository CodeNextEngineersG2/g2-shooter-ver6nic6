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
var bulletSpeed;

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
	scoreDisplay = select("#score-display");

	resetGame();

}

function draw() {

	if (gameRunning == true) {
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
	var hitAlien = checkCollision(alienX,alienY,alienDiameter,bulletX,bulletY,bulletDiameter);

	if(bulletY > 0 && !hitAlien) {

	ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);
	bulletY -= bulletSpeed;

		

	} else if (hitAlien) {

		resetAlien();
		alienVelocity++;
		shipShooting = false;
		score++;
		scoreDisplay.html(score);

	} else {

		shipShooting = false;

	}

	/* bulletY -= 10;

	if (bulletY < 0) {

		drawBullet();

	} else if (bulletY == 0) {

		shipShooting = false; */

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

	var hitShip = checkCollision(alienBulletX,alienBulletY,alienBulletDiameter,shipX,shipY,shipDiameter);

	if(alienBulletY < canvasHeight && hitShip == false) {

		alienBulletY += 10;

	}

	else if (hitShip == true) {

		gameOver();

	} else {

		alienShooting = false;
		
	}


}

function checkCollision(aX, aY, aD, bX, bY, bD) {

	var distance = dist(aX,aY,bX,bY);
	if(distance <= aD / 2 + bD / 2) {

		return true;

	} else {

		return false;

	}
	
}

function resetAlien() {

	alienX = alienDiameter/2;
	alienY = alienDiameter/2;
	alienVelocity = abs(alienVelocity);
}

function gameOver() {

	gameRunning = false;
	alert("Game Over");

}

function resetGame () {

	shipX = 250;
	shipY = 450;
	shipDiameter = 75;
	shipSpeed = 6.9;

	bulletSpeed = 15;
	bulletDiameter = 30;
	shipShooting = false;
	
	alienDiameter = 75;
	alienVelocity = 10;
	alienX = 40;
	alienY = 40;

	alienBulletDiameter = 25;
	alienShooting = false;

	score = 0;
	scoreDisplay.html(score);

	gameRunning = true;
}

/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */
