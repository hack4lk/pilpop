import { AnimateObject } from "./animate";
import { Board } from "./board";
import { PillStack } from "./pillstack";
import { level1, level2, level3, level4, level5 } from "./levels";
import { History } from "./history";

(function () {
  function App() {
    let that = this;

    that.currentLevel = 0;
    that.levels = [level1, level2, level3, level4, level5];
    that.board = new Board();
    that.history = new History();
    that.points = 0;

    that.init = function () {
      console.log("Game initialized");
      that.board.init();
      that.board.showStartScreen();

      document.querySelector("#start-button").addEventListener("click", () => {
        that.startGame();
      });
    };

    that.startGame = (isNextlevel = false) => {
      if (isNextlevel) {
        that.currentLevel++;
        this.history.history = [];
      }
      that.pillMatrix = that.levels[that.currentLevel];
      that.targetHeight = 0;
      that.indexPointer = [];
      that.isAnimating = false;
      that.pillMatrix.forEach((row, index) => {
        that.indexPointer[index] = row.length - 1;
      });
      that.pillStack = new PillStack();
      that.populateBoard();
      that.board.levelDisplay(that.currentLevel + 1, that.levels.length);
      that.board.pointsDisplay(that.points);
      that.board.displayUndo();

      that.assignHandlers();

      if (!isNextlevel) {
        that.board.removeStartScreen();
      }
    };

    that.checkRemaingMoves = () => {
      let remainingMoves = 0;
      that.indexPointer.forEach((row) => {
        if (row >= 0) remainingMoves++;
      });
      return remainingMoves;
    };

    that.checkClickable = (target) => {
      if (
        parseInt(target.dataset.index) !== that.indexPointer[target.dataset.row]
      )
        return false;

      that.indexPointer[target.dataset.row]--;
      return true;
    };

    that.populateBoard = () => {
      that.pillMatrix.forEach((row, index) => {
        that.pillMatrix[index].forEach((col, innerIndex) => {
          const color = row[innerIndex];
          that.board.addPill(index, innerIndex, color);
        });
      });
    };

    that.animatePill = (target, undo = false) => {
      console.log("animate pill", target);
      that.isAnimating = true;
      let points = [];

      if (!undo) {
        that.history.add("add", target.dataset.id, target.dataset.color);
        points = [
          {
            x: target.dataset.row * 150 + 20,
            y: parseInt(target.dataset.index) * this.board.pillYOffset + 20,
          },
          { x: 200, y: 400 },
          { x: 600, y: 400 },
          { x: 800, y: that.targetHeight + 20 },
        ];
        that.targetHeight += this.board.pillYOffset; // need to update to check if stack can be depleated
        that.pillStack.push(target.dataset.color, target.dataset.id);
      } else {
        points = [
          { x: 800, y: that.targetHeight + 20 },
          { x: 600, y: 400 },
          { x: 200, y: 400 },
          {
            x: target.dataset.row * 150 + 20,
            y: parseInt(target.dataset.index) * this.board.pillYOffset + 20,
          },
        ];
        that.targetHeight -= this.board.pillYOffset; // need to update to check if stack can be depleated
        that.indexPointer[target.dataset.row]++;
        that.pillStack.pop(target.dataset.color, target.dataset.id);

        setTimeout(() => {
          that.isAnimating = false;
        }, 500);
      }
      const temp = AnimateObject(target, points);

      console.log(that.indexPointer);

      if (undo) return;

      setTimeout(() => {
        that.isAnimating = false;
        const removed = that.pillStack.removethreeconsecutive();
        if (removed) {
          that.targetHeight -= that.board.pillYOffset * 3;
          that.points += 10;
          that.board.pointsDisplay(that.points);
          that.history.add(
            "multi-match",
            target.dataset.id,
            target.dataset.color
          );
        }
      }, 500);
    };

    that.checkIfGameOver = () => {
      if (that.pillStack.stack.length === 0) {
        if (that.currentLevel + 1 < that.levels.length) {
          that.startGame(true);
          return;
        } else {
          that.board.showEndGameScreen("You Won!");
        }
      } else {
        this.board.showEndGameScreen("You Lost :(");
      }

      document.querySelector("#replay-button").addEventListener("click", () => {
        location.reload();
      });
    };

    that.undoHistory = () => {
      if (that.history.history.length === 0) {
        this.board.displayToast("No history to undo");
        return;
      };

      if (
        that.history.history[that.history.history.length - 1].action ===
        "multi-match"
      ) {
        this.board.displayToast("Cannot undo after successful match");
        return;
      }

      if (
        that.history.history[that.history.history.length - 1].action === "add"
      ) {
        const target = that.history.history[that.history.history.length - 1];
        that.animatePill(
          document.querySelector(`[data-id=${target.pill}]`),
          true
        );
        that.points -= 10;
        that.board.pointsDisplay(that.points);
      } else {
        console.log("cannot undo after successful match");
      }

      that.history.history.pop();
    };

    that.assignHandlers = () => {
      document.querySelectorAll(".pill").forEach((pill) => {
        pill.addEventListener("click", (evt) => {
          let target = evt.target;
          if (evt.target.classList.contains("highlight")) {
            target = evt.target.parentElement;
          }
          if (!that.checkClickable(target)) {
            console.log("not clickable");
            return;
          }
          that.animatePill(target);

          if (that.checkRemaingMoves() === 0) {
            console.log("Game Over");

            setTimeout(() => {
              that.checkIfGameOver();
            }, 1000);
          }
        });
      });

      // add history handler
      document
        .querySelector(".undo-container")
        .addEventListener("click", () => {
          that.undoHistory();
        });
    };

    return that;
  }

  new App().init();
})();
