const root = document.querySelector("#root");
const container = root.querySelector(".container");

const buttonMoveAll = container.querySelector(".btn-all");
const buttonMoveOneByOne = container.querySelector(".btn-one");

const redCircle = container.querySelector(".red");
const greenCircle = container.querySelector(".green");
const blueCircle = container.querySelector(".blue");

let positionRed;
let positionGreen;
let positionBlue;

buttonMoveAll.addEventListener("click", handleMoveAllCircles);
buttonMoveOneByOne.addEventListener("click", handleMoveCirclesOneByOne);

// Move circles all at once

function handleMoveAllCircles() {
  moveAllCircles()
    .then((res) => {
      circleArrived(redCircle);
      circleArrived(greenCircle);
      circleArrived(blueCircle);
      res = "moved all circles at once";
      alert(res);
    })
    .then(() => {
      btnEnabled(buttonMoveAll, handleMoveAllCircles);
      positionOfCirclesReset();
      renderCirclesReset();
    })
    .catch((err) => console.log(err.message));
}

function moveAllCircles() {
  positionOfCirclesReset();
  circleArrivedReset(redCircle);
  circleArrivedReset(greenCircle);
  circleArrivedReset(blueCircle);
  return new Promise((resolve) => {
    let animId = setInterval(animate, 10);
    function animate() {
      if (
        positionRed === 299 &&
        positionGreen === 299 &&
        positionBlue === 299
      ) {
        clearInterval(animId);
        resolve();
      } else {
        moveRedCircle();
        moveGreenCircle();
        moveBlueCircle();
      }
    }
    btnDisabled(buttonMoveAll, handleMoveAllCircles);
  });
}

function positionOfCirclesReset() {
  positionRed = null;
  positionGreen = null;
  positionBlue = null;
}

function renderCirclesReset() {
  redCircle.classList.left = 0;
  greenCircle.classList.top = 0;
  greenCircle.classList.left = 0;
  blueCircle.classList.top = 0;
}

function circleArrived(el) {
  el.classList.add("circle-moved");
}

function circleArrivedReset(el) {
  el.classList.remove("circle-moved");
}

function btnDisabled(el, listener) {
  el.setAttribute("disabled", "true");
  el.removeEventListener("click", listener);
}

function btnEnabled(el, listener) {
  el.removeAttribute("disabled", "true");
  el.addEventListener("click", listener);
}

function moveRedCircle() {
  positionRed++;
  redCircle.style.left = positionRed + "px";
}

function moveGreenCircle() {
  positionGreen++;
  greenCircle.style.top = positionGreen + "px";
  greenCircle.style.left = positionGreen + "px";
}

function moveBlueCircle() {
  positionBlue++;
  blueCircle.style.top = positionBlue + "px";
}

// Move circles one by one

function handleMoveCirclesOneByOne() {
  console.log("moved circles one by one");
  positionOfCirclesReset();
  circleArrivedReset(redCircle);
  circleArrivedReset(greenCircle);
  circleArrivedReset(blueCircle);
  btnDisabled(buttonMoveOneByOne, handleMoveCirclesOneByOne);
  moveFirstCircle()
    .then((res) => {
      circleArrived(redCircle);
      res = "moved first circle";
      console.log(res);
    })
    .then(() => {
      moveSecondCircle()
        .then((res) => {
          circleArrived(greenCircle);
          res = "moved second circle";
          console.log(res);
        })
        .then(() => {
          moveThirdCircle()
            .then((res) => {
              circleArrived(blueCircle);
              res = "moved third circle";
              console.log(res);
            })
            .then(() => {
              res = "moved all circles one by one";
              alert(res);
              btnEnabled(buttonMoveOneByOne, handleMoveCirclesOneByOne);
              positionOfCirclesReset();
              renderCirclesReset();
            });
        });
    })
    .catch((err) => console.log(err.message));
}

function moveFirstCircle() {
  return new Promise((resolve) => {
    let animId = setInterval(animate, 10);
    function animate() {
      if (positionRed === 299) {
        clearInterval(animId);
        resolve();
      } else {
        moveRedCircle();
      }
    }
  });
}

function moveSecondCircle() {
  return new Promise((resolve) => {
    let animId = setInterval(animate, 10);
    function animate() {
      if (positionGreen === 299) {
        clearInterval(animId);
        resolve();
      } else {
        moveGreenCircle();
      }
    }
  });
}

function moveThirdCircle() {
  return new Promise((resolve) => {
    let animId = setInterval(animate, 10);
    function animate() {
      if (positionBlue === 299) {
        clearInterval(animId);
        resolve();
      } else {
        moveBlueCircle();
      }
    }
  });
}
