let mouse_track = document.querySelector(".mous");    

window.addEventListener("mousemove", cursor);

function cursor(e){
	mouse_track.style.top = e.pageY + "px";
	mouse_track.style.left = e.pageX + "px";
}


var maxRadius = 10;

function buttonClick() {
  var a = document.getElementById("size").value;
  //console.log(a);
  maxRadius = a;
}

var num_of_elem = 0;

function buttonClick2() {
  var a = document.getElementById("nr").value;
  num_of_elem = a;
  document.getElementById("num").innerHTML = num_of_elem;
  init();
}

var colorList = [
	"#B04AFF","#7343E8","#5A57FF","#436CE8","#4AA6FF"
];

function buttonClick3() {
  var x = document.getElementById("col").value;
  var y = document.getElementById("col2").value;
  var z = document.getElementById("col3").value;
  var w = document.getElementById("col4").value;
  var v = document.getElementById("col5").value;
  colorList = [x,y,z,w,v];
  init();
}

var speed_var = 1;

function buttonClick4() {
  var a = document.getElementById("speed").value;
  speed_var = a;
  init();
}

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth*0.95;
canvas.height = window.innerHeight*0.6;

var can = canvas.getContext("2d");

var mouse = {
	x: undefined, y: undefined
}

window.addEventListener("mousemove", 
	function(event){
		mouse.x = event.x-20;
		mouse.y = event.y-200;
	})

canvas.addEventListener("click", function(event){
	bList.push(new Ball(mouse.x, mouse.y, 
		((Math.random() - 0.5)*speed_var), 
		((Math.random() - 0.5)*speed_var), 
		Math.random()*3+1));

	num_of_elem=num_of_elem+1;
	document.getElementById("num").innerHTML = num_of_elem;
})

var param = 0;

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 32) {
      param = 1;
  }
})

window.addEventListener("keyup", function(event) {
  if (event.keyCode == 32) {
      param = 0;
  }
})

window.addEventListener("resize",
	function(){
		canvas.width = window.innerWidth*0.95;
		canvas.height = window.innerHeight*0.6;
		init();
	})

function Ball(x,y,dx,dy,rad){
	this.x = x;
	this.y = y;
	this.speedx = dx;
	this.speedy = dy;
 	this.radius = rad;
 	this.minRadius=rad;
 	this.color = colorList[Math.floor(Math.random()*colorList.length)];

	this.move = function(){
		if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
			this.speedy = -this.speedy;
		}

		if ( this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
			this.speedx = -this.speedx;
		} 
		
		this.y += this.speedy;
		this.x += this.speedx;

		if(param===0){

			mouse_track.style.width = "2rem";
			mouse_track.style.height = "2rem";

			if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
				mouse.y - this.y < 50 && mouse.y - this.y > -50) {
				if (this.radius < maxRadius) {
					this.radius += 1;
				}
			} else if(this.radius>this.minRadius) {
				this.radius -= 1;
			}
		}

		else{

			mouse_track.style.width = "7rem";
			mouse_track.style.height = "7rem";
	
			if (this.radius < maxRadius) {
					this.radius += 1;
				}
			else if(this.radius>this.minRadius) {
				this.radius -= 1;
			}
		}

		this.draw();
	}

	this.draw = function(){
		can.beginPath();
		can.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		can.fillStyle = this.color;
		can.fill();
	}
}

var bList = [];

function init(){
	bList = [];
	for (var i = 0; i < num_of_elem; i++) {
		var x = (innerWidth-rad*2) * Math.random();
		var y = (innerHeight-rad*2) * Math.random();
		var dx = ((Math.random() - 0.5)*speed_var);
		var dy = ((Math.random() - 0.5)*speed_var);
		var rad = Math.random()*3+1;

		bList.push(new Ball(x,y,dx,dy,rad));
	}
}

function repeat(){
	requestAnimationFrame(repeat);
	can.clearRect(0,0,innerWidth,innerHeight);

	for (var i = 0; i < bList.length; i++) {
		bList[i].move();
	}

}

init();
repeat();