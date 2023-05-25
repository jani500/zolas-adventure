class Game {
  constructor() {
    this.zola = null;
    this.mouseArr = [];
    this.ratArr = [];
    this.hairballArr = [];
    this.score = 0;
    this.mouseEventListeners();
    // this.updateScore(this.score);
  }

  mouseEventListeners() {
    // Start Button scenario
    const startButton = document.getElementById("start-button");
    const playAgainButton = document.getElementById("play-again-button");

    startButton.addEventListener("click", () => {
      console.log("start button clicked");
      this.startScreen();
    });

    playAgainButton.addEventListener("click", () => {
      this.replayGame();
    });
  }

  // Do this tomorrow with button click

  startScreen() {
    const startDiv = document.getElementById("start-screen");
    const instructions = document.getElementById("instructions");
    const topContainer = document.getElementById("top-container");
    const garden = document.getElementById("garden");

    startDiv.style.display = "none";
    instructions.style.display = "flex";
    topContainer.style.display = "flex";
    garden.style.display = "flex";
    this.start();
  }

  gameOverScreen() {
    const instructions = document.getElementById("instructions");
    const topContainer = document.getElementById("top-container");
    const garden = document.getElementById("garden");
    const gameOverScreen = document.getElementById("gameover-screen");

    console.log("Game Over!");
    instructions.style.display = "none";
    topContainer.style.display = "none";
    garden.style.display = "none";
    gameOverScreen.style.display = "block";
  }

  replayGame() {
    /*     const instructions = document.getElementById("instructions");
    const topContainer = document.getElementById("top-container");
    const garden = document.getElementById("garden");
    const gameOverScreen = document.getElementById("gameover-screen"); */

    /*     gameOverScreen.style.display = "none";
    instructions.style.display = "flex";
    topContainer.style.display = "flex";
    garden.style.display = "flex"; */

    location.href = "./index.html";

    //this.cleanup();
    // document.getElementById("garden").innerHTML = "";
    // this.zola.domElement.remove();
    /*     clearInterval(this.idIntervalMouseSpawn);
    clearInterval(this.idIntervalRatSpawn);
    clearInterval(this.idIntervalHairballDetection);
    clearInterval(this.idIntervalMouseDetection);
    clearInterval(this.idIntervalRatDetection);
    clearInterval(this.idIntervalMoveHairball); */

    /* const lives = document.getElementById("lives");

    const heart1 = document.createElement("img");
    const heart2 = document.createElement("img");
    const heart3 = document.createElement("img");

    heart1.src = "./images/heart.png";
    heart1.id = "heart1";

    lives.appendChild(heart1);

    if (heart1) {
      heart2.src = "./images/heart.png";
      heart2.id = "heart1";
      lives.appendChild(heart2);
    }

    if (heart2) {
      heart3.src = "./images/heart.png";
      heart3.id = "heart1";
      lives.appendChild(heart3);
    } */

    //lives.appendChild(heart1);
    // lives.appendChild(heart2);
    // lives.appendChild(heart3);

    /*     this.zola = null;
    this.mouseArr = [];
    this.ratArr = [];
    this.hairballArr = [];
    this.score = 0; */

    /*    const game = new Game();

    this.start(); */
  }

  removeLife() {
    const parentElm = document.getElementById("lives");

    const heart1 = document.getElementById("heart1");
    const heart2 = document.getElementById("heart2");
    const heart3 = document.getElementById("heart3");

    if (!heart2) {
      parentElm.removeChild(heart1);
      this.gameOverScreen();
    }
    if (!heart3) {
      parentElm.removeChild(heart2);
    }

    if (heart3) {
      parentElm.removeChild(heart3);
    }
  }

  start() {
    this.zola = new Zola();
    this.addEventListeners();

    // Spawn mouse every second and add to mouse array
    this.idIntervalMouseSpawn = setInterval(() => {
      const mouse = new Mouse();
      this.mouseArr.push(mouse);
    }, 1000);

    // Mouse Collision Detection

    this.idIntervalMouseDetection = setInterval(() => {
      this.mouseArr.forEach((mouse, index) => {
        this.detectMouseCollision(mouse, index);
        // Detect collision and remove mouse;
      });
    }, 60);

    // Spawn Rat every 3 seconds and add to Rat Array
    this.idIntervalRatSpawn = setInterval(() => {
      const rat = new Rat();
      this.ratArr.push(rat);
      //console.log(rat);
    }, 3000);

    // Rat Collision Detection

    this.idIntervalRatDetection = setInterval(() => {
      this.ratArr.forEach((rat, index) => {
        this.detectRatCollision(rat, index);
      });
    }, 60);

    // Hairball to Rat Collision Detection

    this.idIntervalHairballDetection = setInterval(() => {
      this.hairballArr.forEach((hairball) => {
        this.detectHairballCollision(hairball);

        // console.log(this.hairballArr);
      });
    }, 10);

    // Move Hairballs every 10 milliseconds
    this.idIntervalMoveHairball = setInterval(() => {
      this.hairballArr.forEach((hairball, index) => {
        if (hairball.direction === "Right") {
          hairball.positionX++;
        } else if (hairball.direction === "Left") {
          hairball.positionX--;
        } else if (hairball.direction === "Up") {
          hairball.positionY++;
        } else if (hairball.direction === "Down") {
          hairball.positionY--;
        }

        hairball.element.style.left = hairball.positionX + "vw";
        hairball.element.style.bottom = hairball.positionY + "vh";
        //console.log(hairball);

        // Cleanup hairballs outside of the playing window
        if (
          hairball.positionX < 0 ||
          hairball.positionX > 100 ||
          hairball.positionY > 100 ||
          hairball.positionY < 0
        ) {
          hairball.element.remove();

          // remove hairball from the array
          this.hairballArr.splice(index, 1); //remove from the array
        }
      });
    }, 10);
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp") {
        this.zola.moveUp();
      } else if (event.code === "ArrowDown") {
        this.zola.moveDown();
      } else if (event.code === "ArrowLeft") {
        this.zola.moveLeft();
      } else if (event.code === "ArrowRight") {
        this.zola.moveRight();
      } else if (event.code === "Space") {
        this.shootHairball();
      }
    });
  }

  detectMouseCollision(mouse, index) {
    if (
      mouse.positionX < this.zola.positionX + this.zola.width &&
      mouse.positionX + mouse.width > this.zola.positionX &&
      mouse.positionY < this.zola.positionY + this.zola.height &&
      mouse.height + mouse.positionY > this.zola.positionY
    ) {
      console.log("HEY A MOUSE!");
      // remove mouse from DOM
      mouse.domElement.remove();

      // remove mouse from the array
      this.mouseArr.splice(index, 1); //remove from the array

      this.updateScore(5);
    }
  }

  detectRatCollision(rat, index) {
    if (
      rat.positionX < this.zola.positionX + this.zola.width &&
      rat.positionX + rat.width > this.zola.positionX &&
      rat.positionY < this.zola.positionY + this.zola.height &&
      rat.height + rat.positionY > this.zola.positionY
    ) {
      console.log("RATSSSS!");
      // remove rat from DOM
      rat.domElement.remove();

      // remove mouse from the array
      this.ratArr.splice(index, 1); //remove from the array

      this.removeLife();
    }
  }

  detectHairballCollision(hairball) {
    //console.log("hairballObj", hairball, this.ratArr);
    this.ratArr.forEach((rat, index) => {
      if (
        hairball.positionX < rat.positionX + rat.width &&
        hairball.positionX + hairball.width > rat.positionX &&
        hairball.positionY < rat.positionY + rat.height &&
        hairball.height + hairball.positionY > rat.positionY
      ) {
        console.log("RAT DOWN!");
        // remove rat from DOM
        rat.domElement.remove();

        // remove mouse from the array
        this.ratArr.splice(index, 1); //remove from the array

        this.updateScore(20);
      }
    });
  }

  updateScore(score) {
    const parentElm = document.getElementById("score");
    const scoreValue = document.getElementById("score-value");

    scoreValue.textContent = this.score += score;

    parentElm.appendChild(scoreValue);

    // return console.log(this.score);
  }

  shootHairball() {
    let hairball = this.createHairballDomElement();

    this.hairballArr.push(hairball);

    console.log(hairball);
  }

  createHairballDomElement() {
    const hairballDomElem = document.createElement("div");

    //this.domElement.className = "mouse";

    hairballDomElem.className = "hairball";
    hairballDomElem.style.width = "10vw";
    hairballDomElem.style.height = "10vh";

    let getZolaDirection = this.zola.getZolaDirection();
    console.log(getZolaDirection);
    let zolaX = this.zola.positionX;
    let zolaY = this.zola.positionY;

    if (getZolaDirection === "Right") {
      zolaX += this.zola.width / 2 + 5;
      //hairballDomElem.style.bottom = Zola.positionY + "vh";
    } else if (getZolaDirection === "Left") {
      zolaX -= this.zola.width / 2 + 5;
      //hairballDomElem.style.bottom = Zola.positionY + "vh";
    } else if (getZolaDirection === "Down") {
      //hairballDomElem.style.left = Zola.positionX + "vw";
      zolaY -= this.zola.height / 2 + 5;
    } else if (getZolaDirection === "Up") {
      zolaY += this.zola.height / 2 + 5;
    }

    hairballDomElem.style.left = zolaX + "vw";
    hairballDomElem.style.bottom = zolaY + "vh";
    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("garden");
    parentElm.appendChild(hairballDomElem);

    let hairballObj = {
      direction: getZolaDirection,
      positionX: zolaX,
      positionY: zolaY,
      element: hairballDomElem,
      width: 10,
      height: 10,
    };

    return hairballObj;
  }

  gameOver() {}
}

class Zola {
  constructor() {
    this.width = 6;
    this.height = 12;
    this.positionX = 50;
    this.positionY = 40;

    this.domElement = null; // we will store a ref. to the dom element of the player

    this.createDomElement();

    // set default value to Up
    this.lastZolaMove = "Up";
  }

  getZolaDirection() {
    return this.lastZolaMove;
  }

  getZolaPositionX() {
    return this.zola.positionX;
  }

  getZolaPositionY() {
    return this.zola.positionY;
  }

  createDomElement() {
    // step1: create the element
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "zolaUp";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("garden");
    parentElm.appendChild(this.domElement);
  }

  moveUp() {
    if (this.lastZolaMove === "Up" && this.domElement.id === "zolaUp") {
      this.domElement.id = "zolaUp2";
    } else if (this.lastZolaMove === null) {
      this.domElement.id = "zolaUp2";
    } else if (this.lastZolaMove === "Up" && this.domElement.id === "zolaUp2") {
      this.domElement.id = "zolaUp";
    } else if (this.lastZolaMove !== "Up") {
      this.domElement.id = "zolaUp";
    }

    this.positionY += 1; //modify the position
    this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    this.lastZolaMove = "Up";
  }

  moveDown() {
    if (this.lastZolaMove === "Down" && this.domElement.id === "zolaDown") {
      this.domElement.id = "zolaDown2";
    } else if (
      this.lastZolaMove === "Down" &&
      this.domElement.id === "zolaDown2"
    ) {
      this.domElement.id = "zolaDown";
    } else if (this.lastZolaMove === null) {
      this.domElement.id === "zolaDown";
    } else if (this.lastZolaMove !== "Down") {
      this.domElement.id = "zolaDown";
    }

    this.positionY -= 1; //modify the position
    this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    this.lastZolaMove = "Down";
  }

  moveLeft() {
    if (this.lastZolaMove === "Left" && this.domElement.id === "zolaLeft") {
      this.domElement.id = "zolaLeft2";
    } else if (this.lastZolaMove === null) {
      this.domElement.id = "zolaLeft";
    } else if (
      this.lastZolaMove === "Left" &&
      this.domElement.id === "zolaLeft2"
    ) {
      this.domElement.id = "zolaLeft";
    } else if (this.lastZolaMove !== "Left") {
      this.domElement.id = "zolaLeft";
    }
    this.positionX--; //modify the position
    this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    this.lastZolaMove = "Left";
  }
  moveRight() {
    if (this.lastZolaMove === "Right" && this.domElement.id === "zolaRight") {
      this.domElement.id = "zolaRight2";
    } else if (
      this.lastZolaMove === "Right" &&
      this.domElement.id === "zolaRight2"
    ) {
      this.domElement.id = "zolaRight";
    } else if (this.lastZolaMove !== "Right") {
      this.domElement.id = "zolaRight";
    }

    this.positionX++; //modify the position
    this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    this.lastZolaMove = "Right";
  }
}

class Mouse {
  constructor() {
    this.width = 8;
    this.height = 8;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = Math.floor(Math.random() * 100);
    this.domElement = null;

    this.createMouseDomElement(this.positionX);
  }

  createMouseDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "mouse";

    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";

    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("garden");
    parentElm.appendChild(this.domElement);
  }
}

class Rat {
  constructor() {
    this.width = 9;
    this.height = 16;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = Math.floor(Math.random() * 100);
    this.domElement = null;

    this.createRatDomElement();
  }

  createRatDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "rat";

    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";

    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("garden");
    parentElm.appendChild(this.domElement);
  }
}

const game = new Game();
