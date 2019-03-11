// a list of all images
let images = document.querySelectorAll(".carousel > .slider > img");
let container = document.querySelector(".carousel");
let slider = document.querySelector(".carousel > .slider");
let next = document.querySelector(".carousel > .next");
let prev = document.querySelector(".carousel > .prev");
//i is the current image
let i = 0;
let max = images.length;
//the width of the carousel container
let width = container.offsetWidth;
let running = false;
let duration = 1000;

let disableRunning = element => {
  setTimeout(() => {
    running = false;
    element.classList.remove("disabled");
  }, duration);
};

let enableRunning = element => {
  running = true;
  element.classList.add("disabled");
  disableRunning(element);
};
//simplify transform process
let transform = (image, pos) => {
  image.style.transform = `translateX(${pos}px)`;
};
let changeOpacity = () => {
  let a = 0;
  for (let image of images) {
    //sets the display:none to all images
    image.style.display = "none";
    //if the image is the current, the next or the previous one sets the display:block to them;
    if (
      a == i ||
      a == i + 1 ||
      a == i - 1 ||
      (i == 0 && a == max - 1) ||
      (i == max - 1 && a == 0)
    )
      image.style.display = "block";
    a++;
  }
};
let changePosition = () => {
  let a = 0;
  //loop through all images
  for (let image of images) {
    //if the image is the current image move it in the view
    if (a == i) transform(image, 0);
    //if the image is the next one; or in case the current image is the last and the image is the first - move them to the right outside of the view
    if (a == i + 1 || (i == max - 1 && a == 0)) transform(image, width);
    //if the image is the previous one; or in case the current image is the first and the image is the last - move them to the left outside of the view
    if (a == i - 1 || (i == 0 && a == max - 1)) transform(image, -1 * width);
    a++;
  }
};
next.addEventListener("click", e => {
  if (!running) {
    if (i < max - 1) i++;
    else i = 0;
    //e.srcElement id the doom element the event is attached to.
    enableRunning(e.srcElement);
    changeOpacity();
    changePosition();
  }
});
prev.addEventListener("click", e => {
  if (!running) {
    if (i > 0) i--;
    else i = max - 1;
    enableRunning(e.srcElement);
    changeOpacity();
    changePosition();
  }
});
//change opacity and position at page load
changeOpacity();
changePosition();
