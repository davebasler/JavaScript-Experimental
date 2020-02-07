var bird;
var gravity = 0.3;
var gameOver = false;
var pillar;

function setup() {
  createCanvas(800, 600);
  background(135,206,235);
  fill(205,133,63);
  stroke(205,133,63);
  rect(0, 550, 800, 50);
  bird = new Bird();
  pillar = new PillarPair();
}

function draw() {
		background(135,206,235);
		fill(205,133,63);
		stroke(205,133,63);
  		rect(0, 550, 800, 50);

		bird.move();
	  	bird.draw();
	  	gameOver = bird.isGameOver();

	  	pillar.draw();

	  	if(gameOver){
	  		console.log("Game Over!")
	  		noLoop();
	  	}
}

function keyPressed(){
	if(keyCode === 32){
		bird.fly();
	}
}

class Bird{
	constructor(){
		this.y = window.height/2;
		this.dy = 0;
		
	}
	draw(){
		fill(255);
		noStroke();
		ellipse(100,this.y,50,50);
	}

	move(){
		if(!gameOver){
			this.dy += gravity;
			this.y += this.dy;
		}
	}

	fly(){
		if(!gameOver){
			this.dy = -5;
		}
	}   

	isGameOver(){
		if(this.y >= 600 || this.y <= 0){
			gameOver = true;
		}

		return gameOver;
	}
}

class PillarPair{
	constructor(){
		this.length = Math.random()*150 + 100;
		this.length2 = Math.random()*200 + 350;
	}
	draw(){
		fill(0,128,0);
		noStroke();
		rect(500,0,50,this.length);
		rect(500,this.length2,50,600-this.length2);

	}
}