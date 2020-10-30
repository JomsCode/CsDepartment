var opacity;

function setup() {
  backTop = select(".backTotop");
  board = document.querySelector(".announce");
  canvasPosition = document.getElementById("canvasPosition");
  opacity = 0.0;
  canvas = createCanvas(
    canvasPosition.offsetWidth,
    canvasPosition.offsetHeight
  );
  canvas.style("z-index", "-1");

  canvas.position(0, canvasPosition.offsetTop);
  xpos = 0;
  ypos = 0;
}
function draw() {
  noStroke();
  if (mouseIsPressed) {
    fill(random()* 255, random()* 255, random()* 255);
    ellipse(pmouseX, pmouseY, 50, 50);
  }

  onlFly();
}
function onlFly() {
  if (visualViewport.pageTop >= 300) {
    opacity += 0.1;
    opacity >= 1.0 ? (opacity = 1.0) : (opacity += 0.1);
  }
  if (visualViewport.pageTop < 300) {
    opacity -= 0.1;
    opacity <= 0.0 ? (opacity = 0.0) : (opacity -= 0.1);
  }
  backTop.style("opacity", opacity);
}

function windowResized() {
  canvasPosition = document.getElementById("canvasPosition");

  canvas.position(0, canvasPosition.offsetTop);
  resizeCanvas(canvasPosition.offsetWidth, canvasPosition.offsetHeight);
}
