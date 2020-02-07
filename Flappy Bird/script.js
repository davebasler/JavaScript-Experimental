var bird;
var gravity = 0.3;
var gameOver = false;
var pillars;
var distance = 0;


function setup() {
  createCanvas(800, 600);
  background(135,206,235);
  fill(205,133,63);
  stroke(205,133,63);
  rect(0, 550, 800, 50);
  bird = new Bird();
  pillarList = [];
  for(var i=0; i<100; i++){
  	distance += 250;
  	pillars = new PillarPair(500+distance);
  	pillarList.push(pillars);
  }
}

function draw() {
		background(135,206,235);
		fill(205,133,63);
		stroke(205,133,63);
  		rect(0, 550, 800, 50);

		bird.move();
	  	bird.draw();
	  	gameOver = bird.isGameOver();

	  	for(var j=0; j<pillarList.length; j++){
	  		pillarList[j].draw();
	  		pillarList[j].move();
	  		pillarList[j].checkCollision();
	  	}
	  
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
	constructor(init_location){
		this.length = Math.random()*150 + 100;
		this.length2 = Math.random()*150 + 350;
		this.x = init_location;
	}

	draw(){
		fill(0,128,0);
		noStroke();
		rect(this.x,0,60,this.length);
		rect(this.x,this.length2,60,600-this.length2);
	}

	move(){
		this.x -= 5;
	}

	checkCollision(){
		if(bird.y-20 <= this.length && this.x <= 125 && this.x >= 50){
			gameOver = true;
		} else if(bird.y >= this.length2-20 && this.x <= 125 && this.x >= 50){
			gameOver = true;
		}
	}
}