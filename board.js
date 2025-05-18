export function Board() {
  this.board = document.createElement("div");
  this.board.className = "board";
  this.pillYOffset = 40; // Y offset for each pill
  this.pillXOffset = 150; // X offset for each pill

  this.init = () => {
    this.board.style.display = "block"; // Show the board
    document.body.appendChild(this.board);
  };

  this.addPill = (row, index, color) => {
    const pill = document.createElement("div");
    pill.className = `pill ${color}`;
    pill.style.top = `${index * this.pillYOffset + 20}px`;
    pill.style.left = `${row * this.pillXOffset + 20}px`;
    pill.dataset.index = index;
    pill.dataset.row = row;
    pill.dataset.color = color;
    pill.dataset.id = `pill-${row}-${index}`;
    const hilight = document.createElement("div");
    hilight.className = "highlight";
    pill.appendChild(hilight);
    this.board.appendChild(pill);
  };

  this.showStartScreen = () => {
    const splashScreen = document.createElement("div");
    splashScreen.className = "splash-screen";
    splashScreen.innerHTML = `
      <div class="splash-holder">
      <img src="logo.png" alt="Logo" class="logo" />
      <button id="start-button">Start Game</button>
    </div>
    `;
    document.body.appendChild(splashScreen);
  };

  this.showEndGameScreen = (text) => {
    const endGameScreen = document.createElement("div");
    endGameScreen.className = "endgame-screen";
    endGameScreen.innerHTML = `
       <div class="endgame-holder">
      <img src="pill.png" alt="Logo" class="logo" />
      <button id="replay-button">${text}<br />Play Again</button>
    </div>
    `;
    document.body.appendChild(endGameScreen);
  };

  this.removeStartScreen = () => {
    const splashScreen = document.querySelector(".splash-screen");
    if (splashScreen) {
      document.body.removeChild(splashScreen);
    }
    const dropzone = document.createElement("div");
    dropzone.className = "drop-box";
    this.board.appendChild(dropzone);
  };

  this.levelDisplay = (level, numberOfLevels) => {
    try {
      const levelDisplay = document.querySelector(".level-container");
      if (levelDisplay) {
        this.board.removeChild(levelDisplay);
      }
    } catch (error) {
      // level display not found, do nothing
    }
    const levelDisplay = document.createElement("div");
    levelDisplay.className = "level-container";
    levelDisplay.innerHTML = `<p>Level ${level} of ${numberOfLevels}</p>`;
    this.board.appendChild(levelDisplay);
  };

  this.pointsDisplay = (points) => {
    try {
      const pointsDisplay = document.querySelector(".points-container");
      if (pointsDisplay) {
        this.board.removeChild(pointsDisplay);
      }
    } catch (error) {
      // points display not found, do nothing
    }
    const pointsDisplay = document.createElement("div");
    pointsDisplay.className = "points-container";
    pointsDisplay.style.animationName = points >= 0 ? "addPoints" : "removePoints";
    pointsDisplay.innerHTML = `<p>Points: ${points}</p>`;
    this.board.appendChild(pointsDisplay);
  };

  this.displayUndo = (points) => {
    try {
      const undoBtn = document.querySelector(".undo-container");
      if (undoBtn) {
        this.board.removeChild(undoBtn);
      }
    } catch (error) {
      // points display not found, do nothing
    }
    const undoBtn = document.createElement("div");
    undoBtn.className = "undo-container";
    undoBtn.ariaLabel = "Undo Btn";
    undoBtn.title = "Undo Btn";
    undoBtn.innerHTML = `<img src="undo-arrow-icon.svg" />`;
    this.board.appendChild(undoBtn);
  };

  this.displayToast = (text) => {
    try {
      const toast = document.querySelector(".toast");
      if (toast) {
        this.board.removeChild(toast);
      }
    } catch (error) {
      // points display not found, do nothing
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<p>${text}</p>`;
    this.board.appendChild(toast);
  };

  return this;
}
