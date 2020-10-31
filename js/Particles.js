_2D = canvas.getContext("2d");
let particles = [];
let repostX = 10,
 repostY = 25;
dcolor = 0;
const mouse = {
 x: null,
 y: null,
 pointerScope: 100,
};

window.addEventListener("mousemove", (event) => {
 mouse.x = event.x;
 mouse.y = event.y;
});

_2D.fillStyle = "white";
//font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

_2D.font = "20px Helvetica";
_2D.fillText("< Com-Sci />", 0, 15);
dots = _2D.getImageData(0, 0, 200, 100);

class Particle {
 constructor(x, y) {
  this.x = x;
  this.y = y;
  this.size = 3;
  this.originX = this.x;
  this.originY = this.y;
  this.mass = Math.random() * 30 + 1;
  this.dcolor = 0;
 }
 draw() {
  _2D.fillStyle = "white";
  _2D.beginPath();
  _2D.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  _2D.closePath();
  _2D.fill();
 }
 animate() {
  let distance = compdist(mouse.x, this.x, mouse.y, this.y);
  this.dcolor = distance;
  let forceDirectionX = (mouse.x - this.x) / distance;
  let forceDirectionY = (mouse.y - this.y) / distance;
  let maxDistance = mouse.pointerScope;
  let force = (maxDistance - distance) / maxDistance;
  let directionX = forceDirectionX * force * this.mass;
  let directionY = forceDirectionY * force * this.mass;

  if (distance < 100) {
   this.x -= directionX;
   this.y -= directionY;
  } else {
   if (this.x !== this.originX) {
    let dx = this.x - this.originX;
    this.x -= dx / 10;
   }
   if (this.y !== this.originY) {
    let dy = this.y - this.originY;
    this.y -= dy / 10;
   }
  }
 }
}

function show() {
 particles = [];

 for (let y = 0; y < dots.height; y++) {
  for (let x = 0; x < dots.width; x++) {
   if (dots.data[y * 4 * dots.width + x * 4 + 3] > 128) {
    let positionX = x + repostX;
    let positionY = y + repostY;
    particles.push(new Particle(positionX * 10, positionY * 10));
   }
  }
 }

 //  for (let cnt = 0; cnt < 500; cnt++) {
 //   let x = Math.random() * canvas.width;
 //   let y = Math.random() * canvas.height;
 //   particles.push(new Particle(x, y));
 //  }
}
show();

function timer() {
 _2D.clearRect(0, 0, canvas.width, canvas.height);
 for (let cnt = 0; cnt < particles.length; cnt++) {
  particles[cnt].draw();
  particles[cnt].animate();
 }
 matrixconnect();
 requestAnimationFrame(timer);
}

timer();
function matrixconnect() {
 let transparency = 1;
 let cRed = 255;
 let cGreen = 255;
 let cBlue = 255;

 for (let a = 0; a < particles.length; a++) {
  for (let b = a; b < particles.length; b++) {
   let distance = compdist(
    particles[a].x,
    particles[b].x,
    particles[a].y,
    particles[b].y
   ); // mouse.x - this.x;
   //  if (particles[b].dcolor - particles[a].dcolor >= 20) {
   //   cRed = 0;
   //   cGreen = 0;
   //   cBlue = 200;
   //  } else if (particles[b].dcolor - particles[a].dcolor <= 20) {
   //   cRed = 255;
   //   cGreen = 255;
   //   cBlue = 255;
   //  }

   if (distance <= 20) {
    // _2D.strokeStyle = "white";

    transparency = 1 - distance / 20;

    _2D.strokeStyle =
     "rgba(" + cRed + "," + cGreen + "," + cBlue + "," + transparency + ")";
    _2D.lineWidth = 2;
    _2D.beginPath();
    _2D.moveTo(particles[a].x, particles[a].y);
    _2D.lineTo(particles[b].x, particles[b].y);
    _2D.closePath();
    _2D.stroke();
   }
  }
 }
}
// window.addEventListener("resize", () => {
//  winWidth = visualViewport.offsetWidth;
//  winHeight = visualViewport.offsetHeight;
// });
