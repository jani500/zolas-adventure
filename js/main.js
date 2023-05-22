class Game {
  constructor() {
    this.zola = null;
    this.mouseArr = [];
    this.ratArr = [];
    this.score = 0;
    this.updateScore();
  }

  start() {
    this.zola = new Zola();
    this.addEventListeners();

    // Spawn mouse every second and add to mouse array
    setInterval(() => {
      const mouse = new Mouse();
      this.mouseArr.push(mouse);
    }, 1000);

    // Mouse Collision Detection

    setInterval(() => {
      this.mouseArr.forEach((mouse, index) => {
        this.detectMouseCollision(mouse, index);
        // Detect collision and remove mouse;
      });
    }, 60);

    // Spawn Rat every 3 seconds and add to Rat Array
    setInterval(() => {
      const rat = new Rat();
      this.ratArr.push(rat);
    }, 3000);

    // Rat Collision Detection

    setInterval(() => {
      this.ratArr.forEach((rat, index) => {
        this.detectRatCollision(rat, index);
      });
    }, 60);
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
      } else if (event.code === "KeyA") {
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

      this.updateScore();
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

      this.zola.removeLife();
    }
  }

  updateScore() {
    this.score += 1;
    return console.log(this.score);
  }

  shootHairball() {
    let hairball = this.createHairballDomElement();
    //moveHairball(hairball);
  }

  createHairballDomElement() {
    const hairballDomElem = document.createElement("div");

    //this.domElement.className = "mouse";

    hairballDomElem.className = "hairball";
    hairballDomElem.style.width = "20vw";
    hairballDomElem.style.height = "20vh";
    const getZolaDirection = lastZolaMove;
    console.log(getZolaDirection);

    if (getZolaDirection === "Right") {
      hairballDomElem.style.left = Zola.positionX + 3 + "vw";
      hairballDomElem.style.bottom = Zola.positionY + "vh";
    } else if (getZolaDirection === "Left") {
      hairballDomElem.style.left = Zola.positionX - 3 + "vw";
      hairballDomElem.style.bottom = Zola.positionY + "vh";
    } else if (getZolaDirection === "Down") {
      hairballDomElem.style.left = Zola.positionX + "vw";
      hairballDomElem.style.bottom = Zola.positionY - 3 + "vh";
    } else if (getZolaDirection === "Up") {
      hairballDomElem.style.left = Zola.positionX + "vw";
      hairballDomElem.style.bottom = Zola.positionY + 3 + "vh";

      //step3: append to the dom: `parentElm.appendChild()`
      const parentElm = document.getElementById("garden");
      parentElm.appendChild(hairballDomElem);

      return hairballDomElem;
    }
  }

  moveHairball() {}
}

class Zola {
  constructor() {
    this.width = 7;
    this.height = 20;
    this.positionX = 50;
    this.positionY = 40;

    this.domElement = null; // we will store a ref. to the dom element of the player

    this.createDomElement();

    // set default value to Up
    this.lastZolaMove = "Up";

    this.lives = 9;
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

  removeLife() {
    this.lives -= 1;
    return console.log(this.lives);
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
    this.width = 10;
    this.height = 20;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = Math.floor(Math.random() * 100);
    this.domElement = null;

    this.createMouseDomElement();
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
    this.width = 10;
    this.height = 20;
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
game.start();
