let xPos = 0;
let xNeg = 0;
let start = 1;
let dx1 = 0, dy1 = 0;
let array = [];
let scr = 0;
let x10 = 0, x11 = 0, y10 = 0, y11 = 0;

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.height = window.innerHeight*0.98;
c.width = window.innerWidth*0.37;

window.addEventListener("keyup", function(event){
  if (event.keyCode == "39"){
    xPos = 20;
    circle1.x += xPos;
  }
  else if (event.keyCode == "37"){
    xNeg = -20;
    circle1.x += xNeg;
  }
  else if (event.keyCode == "38"){
    circle1.dy = -3;
    start = 0;
    for (let m = 0; m < array.length; m++){
      array[m].dy = 2;
      array[m].yact = array[m].y + 130;
    }
  }

});

function Rect(x, y, w, h, dy, yact){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dy = dy;
    this.yact = yact;

    this.draw = function(){
      ctx.beginPath();
      ctx.fillStyle = "#FFA07A";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    this.update = function(){
      this.draw();
      this.y += this.dy;
      if(this.y >= this.yact){
        this.dy = 0;
      }
    }
}

let x1 = 80, y1 = c.height-10;

function Circle(x, y, yact, dy, ymax){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.yact = yact;
    this.ymax = ymax;

    this.draw = function() {
      ctx.beginPath();
      ctx.fillStyle = "#F1C40F  ";
      ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
      ctx.fill();
      ctx.stroke();
    }
    this.update = function(){
      this.draw();
      this.y += this.dy;
      if (this.y <= this.yact - 150)
        this.dy = -this.dy;
      if (this.y >= c.height  -5)
        this.dy = 0;
      if (start == 0 && this.y >= c.height - 5)
        gameOver();
    }

}

let y2 = c.height - 50;

for (let k = 0; k < 100; k++){
  let x2 = Math.random()*(c.width-84)+2;
  y2 -= 50;
  array.push(new Rect(x2, y2, 80, 15, 0, y2+160));
}

let circle1 = new Circle(x1, y1, y1, 0, y1);

function getDistance(x10, x11, y10, y11){
  xD = x11-x10;
  yD=y11-y10;
  return Math.sqrt(Math.pow(xD,2) + Math.pow(yD,2)) ;
}

animate();

function animate(){
   requestAnimationFrame(animate);
   ctx.clearRect(0, 0, innerWidth, innerHeight);
   ctx.font = "20px Arial";
   ctx.fillStyle = "black";
   ctx.fillText("SCORE:", 10, 20);
   ctx.font = "20px Arial";
   ctx.fillStyle = "black";
   ctx.fillText(scr, 90, 20);
   for (let t = 0; t < array.length; t++){
     array[t].update();
     if (getDistance(0, 0,circle1.y+5, array[t].yact) <= 2 && array[t].yact <= c.height-15 &&
         circle1.x+5 >= array[t].x && circle1.x-5 <= array[t].x+80)
        circle1.dy=0;
    }
   circle1.update();
}

let t1 = setInterval(score, 200);

function score(){
  scr++;
}

function gameOver(){
  document.getElementById('endBox').style.display = 'block';
  document.getElementById('gamePage').style.opacity = '0.2';
}