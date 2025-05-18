export function PillStack() {
  this.stack = [];

  this.removethreeconsecutive = function () {
    if (this.stack.length < 3) return false;

    const lastThree = this.stack.slice(-3);
    const allSameColor = lastThree.every(
      (item) => item.color === lastThree[0].color
    );

    if (allSameColor) {
      lastThree.forEach((item) => {
        console.log("Removing pill: ", item);
        const pill = document.querySelector(`[data-id="${item.id}"]`);
        if (pill) {
          // pill.classList.add("remove");
          pill.style.transform = "scale(0)"; // Change to scale down
          setTimeout(() => pill.remove(), 500);
        }
      });
      this.stack.splice(this.stack.length - 3, 3);
      return true;
    }
    return false;
  };
}

PillStack.prototype.push = function (color, id) {
  this.stack.push({ color: color, id: id });
};

PillStack.prototype.pop = function () {
  return this.stack.pop();
};

PillStack.prototype.peek = function () {
  return this.stack[this.stack.length - 1];
};

PillStack.prototype.isEmpty = function () {
  return this.stack.length === 0;
};
