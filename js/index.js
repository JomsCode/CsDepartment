let opacity = 0.0;
canvas = document.querySelector(".canvas");

backTop = document.querySelector(".backTotop");
canvasPosition = document.getElementById("canvasPosition");
backTop.style.setProperty("position", "fixed");

function postSet() {
 backTop.style.setProperty("right", "0px");
 backTop.style.setProperty("bottom", "0px");
 canvas.style.setProperty("position", "absolute");
 canvas.style.setProperty("z-index", "-1");
 canvas.width = canvasPosition.offsetWidth;
 canvas.height = canvasPosition.offsetHeight;
 canvas.top = canvasPosition.offsetTop;
}
postSet();

function onlFly() {
 if (visualViewport.pageTop >= 300) {
  opacity += 0.1;
  opacity >= 1.0 ? (opacity = 1.0) : (opacity += 0.1);
 }
 if (visualViewport.pageTop < 300) {
  opacity -= 0.1;
  opacity <= 0.0 ? (opacity = 0.0) : (opacity -= 0.1);
 }
 backTop.style.setProperty("opacity", opacity);
 requestAnimationFrame(onlFly);
}
onlFly();

window.addEventListener("resize", postSet);
